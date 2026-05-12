/* Exam mode controller — 2h45m timer, 20 questions (2 per topic), locked results. */
(function () {
  const EXAM_DURATION_MS = 2 * 60 * 60 * 1000 + 45 * 60 * 1000; // 2h 45m
  const PER_TOPIC = 2;

  const state = {
    started: false,
    questions: [],   // selected questions
    answers: {},     // questionId -> user answer
    index: 0,
    endsAt: 0,
    submitted: false,
    timerHandle: null
  };

  function init() {
    DataStore.load().then(() => {
      const start = document.getElementById('start-exam');
      if (start) start.addEventListener('click', startExam);
    }).catch(err => {
      document.getElementById('content').innerHTML =
        '<div class="empty-state"><h1>Could not load question bank</h1><p>' + err.message + '</p></div>';
    });
  }

  function startExam() {
    state.questions = pickExamQuestions();
    if (state.questions.length < 4) {
      alert('Not enough questions in the bank yet.');
      return;
    }
    state.started = true;
    state.endsAt = Date.now() + EXAM_DURATION_MS;
    state.answers = {};
    state.index = 0;
    document.getElementById('start-pane').remove();
    document.getElementById('exam-sidebar').hidden = false;
    document.getElementById('exam-timer').hidden = false;
    document.getElementById('submit-exam').addEventListener('click', confirmSubmit);
    renderPager();
    renderCurrent();
    state.timerHandle = setInterval(tickTimer, 1000);
    tickTimer();
  }

  function pickExamQuestions() {
    const selected = [];
    for (const t of DataStore.bank.topics) {
      const pool = DataStore.questionsByTopic(t.id).slice();
      shuffleInPlace(pool);
      for (let i = 0; i < Math.min(PER_TOPIC, pool.length); i++) selected.push(pool[i]);
    }
    return selected;
  }

  function renderPager() {
    const pager = document.getElementById('question-pager');
    pager.innerHTML = '';
    state.questions.forEach((q, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'page-btn';
      b.textContent = String(i + 1);
      b.dataset.idx = String(i);
      if (i === state.index) b.classList.add('active');
      if (state.answers[q.id] !== undefined) b.classList.add('answered');
      b.addEventListener('click', () => { saveCurrentAnswer(); state.index = i; renderCurrent(); renderPager(); });
      pager.appendChild(b);
    });
  }

  function renderCurrent() {
    const q = state.questions[state.index];
    const topic = DataStore.topic(q.topicId);
    const content = document.getElementById('content');
    content.innerHTML = '';
    const root = QuestionUI.renderQuestion(q, {
      topicName: topic.name,
      title: 'Question ' + (state.index + 1) + ' of ' + state.questions.length
    });
    // Restore prior answer if any
    const prior = state.answers[q.id];
    if (prior !== undefined) restoreAnswer(q, root, prior);
    const nav = document.createElement('div');
    nav.className = 'exam-nav';
    nav.appendChild(navBtn('← Previous', () => { saveCurrentAnswer(); state.index = Math.max(0, state.index - 1); renderCurrent(); renderPager(); }, state.index === 0));
    nav.appendChild(navBtn('Save & continue →', () => { saveCurrentAnswer(); if (state.index < state.questions.length - 1) state.index++; renderCurrent(); renderPager(); }, false, true));
    root.appendChild(nav);
    content.appendChild(root);
    content.scrollTop = 0;
  }

  function navBtn(label, on, disabled, primary) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'btn' + (primary ? ' primary' : '');
    b.textContent = label;
    b.disabled = !!disabled;
    b.addEventListener('click', on);
    return b;
  }

  function saveCurrentAnswer() {
    const q = state.questions[state.index];
    const root = document.querySelector('.q-container');
    if (!root) return;
    const val = QuestionUI.readAnswer(q, root);
    const isEmpty =
      val === null || val === undefined ||
      (typeof val === 'string' && !val.trim()) ||
      (Array.isArray(val) && val.length === 0);
    if (!isEmpty) state.answers[q.id] = val;
    else delete state.answers[q.id];
  }

  function restoreAnswer(q, root, val) {
    if (q.type === 'radio') {
      const inp = root.querySelector('input[type=radio][value="' + Number(val) + '"]');
      if (inp) inp.checked = true;
    } else if (q.type === 'checkbox') {
      for (const v of (val || [])) {
        const inp = root.querySelector('input[type=checkbox][value="' + Number(v) + '"]');
        if (inp) inp.checked = true;
      }
    } else {
      const inp = root.querySelector('[data-input]');
      if (inp) inp.value = String(val);
    }
  }

  function tickTimer() {
    if (!state.started || state.submitted) return;
    const remaining = state.endsAt - Date.now();
    const el = document.getElementById('exam-timer');
    if (remaining <= 0) {
      document.getElementById('timer-value').textContent = '00:00:00';
      el.classList.add('urgent');
      submitExam(true);
      return;
    }
    const h = Math.floor(remaining / 3600000);
    const m = Math.floor((remaining % 3600000) / 60000);
    const s = Math.floor((remaining % 60000) / 1000);
    document.getElementById('timer-value').textContent =
      String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
    el.classList.toggle('urgent', remaining < 10 * 60 * 1000);
  }

  function confirmSubmit() {
    if (!confirm('Submit exam now? You cannot change answers after this.')) return;
    submitExam(false);
  }

  function submitExam(timeUp) {
    if (state.submitted) return;
    saveCurrentAnswer();
    state.submitted = true;
    clearInterval(state.timerHandle);
    document.getElementById('exam-sidebar').hidden = true;
    document.getElementById('exam-timer').hidden = true;
    renderResults(timeUp);
  }

  function renderResults(timeUp) {
    const results = state.questions.map(q => {
      const u = state.answers[q.id];
      const r = (u === undefined) ? { correct: false, summary: 'No answer submitted.', model: '' } : Grader.grade(q, u);
      return { q, user: u, result: r };
    });
    const correctCount = results.filter(r => r.result.correct).length;
    const total = results.length;
    const pct = total ? Math.round((correctCount / total) * 100) : 0;

    const byTopic = {};
    for (const r of results) {
      const t = r.q.topicId;
      if (!byTopic[t]) byTopic[t] = { ok: 0, total: 0 };
      byTopic[t].total++;
      if (r.result.correct) byTopic[t].ok++;
    }

    const content = document.getElementById('content');
    content.innerHTML = '';
    const panel = document.createElement('div');
    panel.className = 'results-panel';
    panel.innerHTML =
      '<h1>Exam results</h1>' +
      (timeUp ? '<p><em>Time expired — submitted automatically.</em></p>' : '') +
      '<p class="score-line">Score: <b>' + correctCount + ' / ' + total + '</b> &nbsp; (' + pct + '%)</p>';

    const perTopicEl = document.createElement('ul');
    perTopicEl.className = 'per-topic';
    for (const t of DataStore.bank.topics) {
      const s = byTopic[t.id];
      if (!s) continue;
      const cls = s.ok === s.total ? 'good' : (s.ok === 0 ? 'bad' : '');
      const li = document.createElement('li');
      li.className = cls;
      li.innerHTML = '<span>' + t.name + '</span><b>' + s.ok + ' / ' + s.total + '</b>';
      perTopicEl.appendChild(li);
    }
    panel.appendChild(perTopicEl);

    panel.appendChild(headerEl('Review'));
    results.forEach((r, i) => panel.appendChild(reviewBlock(i + 1, r)));

    const again = document.createElement('button');
    again.type = 'button';
    again.className = 'primary-btn';
    again.textContent = 'New exam';
    again.style.marginTop = '20px';
    again.addEventListener('click', () => location.reload());
    panel.appendChild(again);

    content.appendChild(panel);
  }

  function headerEl(text) {
    const h = document.createElement('h2');
    h.style.color = '#1f5fa0';
    h.style.marginTop = '24px';
    h.textContent = text;
    return h;
  }

  function reviewBlock(num, r) {
    const div = document.createElement('div');
    div.className = 'review-q ' + (r.result.correct ? 'correct' : 'wrong');
    const topic = DataStore.topic(r.q.topicId);
    const title = document.createElement('div');
    title.className = 'review-q-title';
    title.textContent = (r.result.correct ? '✓' : '✗') + ' Q' + num + ' · ' + (topic ? topic.name : r.q.topicId) +
      (r.q.subtopic ? ' · ' + r.q.subtopic : '');
    div.appendChild(title);

    const prompt = document.createElement('div');
    prompt.style.whiteSpace = 'pre-wrap';
    prompt.style.fontSize = '13px';
    prompt.style.margin = '4px 0 6px';
    prompt.textContent = r.q.prompt;
    div.appendChild(prompt);

    if (r.user !== undefined) {
      const u = document.createElement('div');
      u.className = 'your-answer';
      u.textContent = 'Your answer: ' + formatUserAnswer(r.q, r.user);
      div.appendChild(u);
    } else {
      const u = document.createElement('div');
      u.className = 'your-answer';
      u.textContent = '(no answer submitted)';
      div.appendChild(u);
    }
    if (r.result.model) {
      const m = document.createElement('div');
      m.className = 'model-answer';
      m.textContent = 'Model: ' + r.result.model;
      div.appendChild(m);
    }
    if (r.q.explanation) {
      const e = document.createElement('div');
      e.style.fontSize = '12.5px';
      e.style.color = '#5b6470';
      e.style.marginTop = '6px';
      e.textContent = r.q.explanation;
      div.appendChild(e);
    }
    return div;
  }

  function formatUserAnswer(q, val) {
    if (q.type === 'radio') return q.options[Number(val)] || '(invalid)';
    if (q.type === 'checkbox') return (val || []).map(v => q.options[Number(v)]).join(' / ');
    return String(val);
  }

  function shuffleInPlace(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  document.addEventListener('DOMContentLoaded', init);
})();
