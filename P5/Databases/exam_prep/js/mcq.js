/* MCQ Practice — 6 quizzes × 10 single-choice questions. Self-contained controller. */
(function () {
  const STORAGE_KEY = 'mcq.bestScores.v1';

  const state = {
    bank: null,
    quiz: null,
    index: 0,
    answers: {},   // questionId -> selected option index
    locked: {},    // questionId -> true once submitted
  };

  function el(tag, attrs, children) {
    const e = document.createElement(tag);
    if (attrs) for (const k in attrs) {
      if (k === 'class') e.className = attrs[k];
      else if (k === 'html') e.innerHTML = attrs[k];
      else if (k === 'style') e.style.cssText = attrs[k];
      else if (k.startsWith('on') && typeof attrs[k] === 'function') e.addEventListener(k.slice(2), attrs[k]);
      else if (attrs[k] != null) e.setAttribute(k, attrs[k]);
    }
    if (children) for (const c of children) if (c != null) e.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    return e;
  }

  function loadBest() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); }
    catch (_) { return {}; }
  }
  function saveBest(quizId, score, total) {
    const all = loadBest();
    const prev = all[quizId];
    if (!prev || score > prev.score) all[quizId] = { score, total, when: Date.now() };
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(all)); } catch (_) {}
  }

  function init() {
    if (!window.__MCQ_BANK || !Array.isArray(window.__MCQ_BANK.quizzes)) {
      document.getElementById('content').innerHTML =
        '<div class="empty-state"><h1>MCQ bank failed to load</h1><p>Could not find window.__MCQ_BANK.</p></div>';
      return;
    }
    state.bank = window.__MCQ_BANK;
    renderHome();
  }

  function renderHome() {
    const grid = document.getElementById('quiz-grid');
    grid.innerHTML = '';
    const best = loadBest();
    state.bank.quizzes.forEach((q, i) => {
      const card = el('button', {
        class: 'variant-card mcq-card',
        type: 'button',
        onclick: () => startQuiz(i)
      });
      const head = el('div', { class: 'mcq-card-head' });
      head.appendChild(el('span', { class: 'mcq-card-icon' }, [q.icon || '🧠']));
      head.appendChild(el('span', { class: 'variant-card-title' }, ['Quiz ' + (i + 1) + ' · ' + q.name]));
      card.appendChild(head);
      card.appendChild(el('div', { class: 'variant-card-tagline' }, [q.tagline || '']));
      const meta = el('div', { class: 'variant-card-meta' });
      meta.appendChild(el('span', null, [q.questions.length + ' questions']));
      meta.appendChild(el('span', null, ['4 options · 1 correct']));
      const b = best[q.id];
      if (b) {
        const score = el('span', null, ['Best: ' + b.score + ' / ' + b.total]);
        score.style.background = b.score === b.total ? 'var(--success-bg)' : 'var(--accent-soft)';
        score.style.color      = b.score === b.total ? 'var(--success)'    : 'var(--accent)';
        meta.appendChild(score);
      }
      card.appendChild(meta);
      card.appendChild(el('span', { class: 'variant-card-cta' }, ['Start quiz →']));
      grid.appendChild(card);
    });
  }

  function startQuiz(idx) {
    state.quiz = state.bank.quizzes[idx];
    state.index = 0;
    state.answers = {};
    state.locked = {};
    renderQuiz();
  }

  function renderQuiz() {
    const content = document.getElementById('content');
    content.innerHTML = '';

    const quiz = state.quiz;
    const total = quiz.questions.length;
    const i = state.index;
    const q = quiz.questions[i];

    // Top bar inside content: back + title + progress
    const bar = el('div', { class: 'mcq-bar' });
    const back = el('button', { class: 'btn', type: 'button', onclick: backToHome }, ['← All quizzes']);
    bar.appendChild(back);
    bar.appendChild(el('div', { class: 'mcq-title' }, [quiz.icon + '  ' + quiz.name]));
    const answeredCount = Object.keys(state.answers).length;
    bar.appendChild(el('div', { class: 'mcq-progress' }, ['Question ' + (i + 1) + ' of ' + total + ' · answered ' + answeredCount + ' / ' + total]));
    content.appendChild(bar);

    // Progress dots
    const pager = el('div', { class: 'mcq-pager' });
    quiz.questions.forEach((qq, idx) => {
      const dot = el('button', {
        class: 'mcq-dot' +
               (idx === i ? ' active' : '') +
               (state.locked[qq.id] ? (state.answers[qq.id] === qq.answer.value ? ' correct' : ' wrong') : (state.answers[qq.id] !== undefined ? ' answered' : '')),
        type: 'button',
        onclick: () => { state.index = idx; renderQuiz(); }
      }, [String(idx + 1)]);
      pager.appendChild(dot);
    });
    content.appendChild(pager);

    // Question card
    const card = el('div', { class: 'mcq-question' });
    const meta = el('div', { class: 'q-meta' });
    meta.appendChild(el('span', { class: 'chip' }, [quiz.name]));
    if (q.subtopic) meta.appendChild(el('span', { class: 'chip' }, [q.subtopic]));
    meta.appendChild(el('span', { class: 'chip type' }, ['Single choice']));
    card.appendChild(meta);

    card.appendChild(el('h2', { class: 'q-title' }, ['Question ' + (i + 1) + ' of ' + total]));
    card.appendChild(el('div', { class: 'q-prompt' }, [q.prompt]));

    const list = el('div', { class: 'options-list' });
    const locked = !!state.locked[q.id];
    const correctIdx = q.answer.value;
    const userIdx = state.answers[q.id];

    q.options.forEach((opt, optIdx) => {
      const id = 'mcq-' + q.id + '-' + optIdx;
      const label = el('label', { for: id });
      if (locked) {
        if (optIdx === correctIdx) label.classList.add('opt-correct');
        if (optIdx === userIdx && userIdx !== correctIdx) label.classList.add('opt-wrong');
      }
      const input = el('input', {
        id: id,
        type: 'radio',
        name: 'mcq-q-' + q.id,
        value: String(optIdx),
        onchange: () => { state.answers[q.id] = optIdx; },
      });
      if (userIdx === optIdx) input.checked = true;
      if (locked) input.disabled = true;
      label.appendChild(input);
      label.appendChild(el('span', null, [opt]));
      list.appendChild(label);
    });
    card.appendChild(list);

    // Feedback if locked
    if (locked) {
      const correct = userIdx === correctIdx;
      const fb = el('div', { class: 'feedback ' + (correct ? 'correct' : 'wrong') });
      fb.appendChild(el('h4', null, [correct ? '✓ Correct' : '✗ Not correct']));
      fb.appendChild(el('div', null, [correct
        ? 'Nice — that is the right option.'
        : 'The right option was: "' + q.options[correctIdx] + '".']));
      if (q.explanation) fb.appendChild(el('div', { class: 'explanation' }, [q.explanation]));
      card.appendChild(fb);
    }

    // Actions
    const actions = el('div', { class: 'actions mcq-actions' });

    const prevBtn = el('button', {
      class: 'btn', type: 'button',
      onclick: () => { state.index = Math.max(0, state.index - 1); renderQuiz(); }
    }, ['← Previous']);
    if (i === 0) prevBtn.disabled = true;
    actions.appendChild(prevBtn);

    if (!locked) {
      const submit = el('button', {
        class: 'btn primary', type: 'button',
        onclick: () => {
          if (state.answers[q.id] === undefined) {
            alert('Pick an option first.');
            return;
          }
          state.locked[q.id] = true;
          renderQuiz();
        }
      }, ['Submit answer']);
      actions.appendChild(submit);
    }

    // Next / Finish
    if (i < total - 1) {
      const next = el('button', {
        class: 'btn' + (locked ? ' primary' : ''),
        type: 'button',
        onclick: () => { state.index = Math.min(total - 1, state.index + 1); renderQuiz(); }
      }, ['Next →']);
      actions.appendChild(next);
    } else {
      const finishLabel = allLocked() ? 'See results' : 'Finish & see results';
      const finish = el('button', {
        class: 'btn primary', type: 'button',
        onclick: showResults
      }, [finishLabel]);
      actions.appendChild(finish);
    }

    card.appendChild(actions);
    content.appendChild(card);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  function allLocked() {
    return state.quiz.questions.every(q => state.locked[q.id]);
  }

  function showResults() {
    const quiz = state.quiz;
    // Auto-lock anything that has an answer but wasn't submitted yet
    for (const q of quiz.questions) {
      if (!state.locked[q.id] && state.answers[q.id] !== undefined) state.locked[q.id] = true;
    }
    const total = quiz.questions.length;
    const correct = quiz.questions.filter(q => state.answers[q.id] === q.answer.value).length;
    const pct = Math.round((correct / total) * 100);
    saveBest(quiz.id, correct, total);

    const content = document.getElementById('content');
    content.innerHTML = '';

    const bar = el('div', { class: 'mcq-bar' });
    bar.appendChild(el('button', { class: 'btn', type: 'button', onclick: backToHome }, ['← All quizzes']));
    bar.appendChild(el('div', { class: 'mcq-title' }, [quiz.icon + '  ' + quiz.name + ' · Results']));
    bar.appendChild(el('div', { class: 'mcq-progress' }, ['']));
    content.appendChild(bar);

    const panel = el('div', { class: 'results-panel' });
    panel.appendChild(el('h1', null, ['Quiz results']));
    const scoreLine = el('p', { class: 'score-line' });
    scoreLine.innerHTML = 'Score: <b>' + correct + ' / ' + total + '</b> &nbsp; (' + pct + '%)';
    panel.appendChild(scoreLine);
    panel.appendChild(el('p', { style: 'color:var(--text-soft); margin-top:-4px;' },
      [correct === total
        ? 'Perfect — all 10 correct!'
        : (pct >= 70 ? 'Above the 70% mark. Review the misses below.' : 'Below 70% — worth a second pass.')]));

    const h = el('h2', { style: 'color:var(--accent); margin-top:24px;' }, ['Review']);
    panel.appendChild(h);

    quiz.questions.forEach((q, i) => {
      const user = state.answers[q.id];
      const right = user === q.answer.value;
      const block = el('div', { class: 'review-q ' + (right ? 'correct' : 'wrong') });
      block.appendChild(el('div', { class: 'review-q-title' },
        [(right ? '✓' : '✗') + ' Q' + (i + 1) + (q.subtopic ? ' · ' + q.subtopic : '')]));
      const prompt = el('div', { style: 'white-space:pre-wrap; font-size:13px; margin:4px 0 6px;' }, [q.prompt]);
      block.appendChild(prompt);
      const ua = el('div', { class: 'your-answer' },
        ['Your answer: ' + (user === undefined ? '(none)' : q.options[user])]);
      block.appendChild(ua);
      if (!right) {
        const ma = el('div', { class: 'model-answer' }, ['Correct: ' + q.options[q.answer.value]]);
        block.appendChild(ma);
      }
      if (q.explanation) {
        const ex = el('div', { style: 'font-size:12.5px; color:#5b6470; margin-top:6px;' }, [q.explanation]);
        block.appendChild(ex);
      }
      panel.appendChild(block);
    });

    const again = el('button', {
      class: 'primary-btn', type: 'button',
      style: 'margin-top:20px; margin-right:10px;',
      onclick: () => startQuiz(state.bank.quizzes.indexOf(quiz))
    }, ['Retry this quiz']);
    panel.appendChild(again);

    const home = el('button', {
      class: 'btn', type: 'button',
      style: 'margin-top:20px;',
      onclick: backToHome
    }, ['Back to all quizzes']);
    panel.appendChild(home);

    content.appendChild(panel);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  function backToHome() {
    document.getElementById('content').innerHTML =
      '<div id="mcq-home">' +
        '<h1 style="color:var(--accent); margin-top:0;">MCQ Practice</h1>' +
        '<p style="max-width:780px; color:var(--text-soft);">' +
          'Six topic-focused quizzes of <strong>10 multiple-choice questions</strong> each. ' +
          'Every question has four options and exactly one correct answer — matching the MCQ section announced for the final exam.' +
        '</p>' +
        '<p style="max-width:780px; color:var(--text-soft); margin-top:-4px;">' +
          'Pick an option, hit <em>Submit answer</em> to see if you got it right with an explanation, then move on. Your score is tallied at the end with a per-question review.' +
        '</p>' +
        '<div class="variant-grid" id="quiz-grid"></div>' +
      '</div>';
    state.quiz = null;
    renderHome();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
