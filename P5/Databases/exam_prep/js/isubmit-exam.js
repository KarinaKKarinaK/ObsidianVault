/* iSubmit-style mock exam controller — multi-task, point-weighted, timer, grade computation. */
(function () {
  const state = {
    bank: null,
    started: false,
    activeTaskId: null,
    activeSubqId: null,
    answers: {},      // subqId -> answer payload (varies by type)
    rubricMarks: {},  // subqId -> { rubricItemId -> bool }   (self-grade overrides)
    erEditors: {},    // subqId -> editor instance
    endsAt: 0,
    submitted: false,
    timerHandle: null
  };

  function init() {
    loadBank().then(b => {
      state.bank = b;
      const start = document.getElementById('start-exam');
      if (start) start.addEventListener('click', startExam);
    }).catch(err => {
      document.getElementById('content').innerHTML =
        '<div class="empty-state"><h1>Could not load exam</h1><p>' + err.message + '</p></div>';
    });
  }

  function loadBank() {
    // Prefer inline data (works from file:// without a server).
    if (window.__ISUBMIT_EXAM && Array.isArray(window.__ISUBMIT_EXAM.tasks)) {
      return Promise.resolve(window.__ISUBMIT_EXAM);
    }
    return fetch('data/isubmit-exam.json', { cache: 'no-store' })
      .then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); });
  }

  function startExam() {
    state.started = true;
    state.endsAt = Date.now() + (state.bank.durationMinutes || 165) * 60 * 1000;
    document.getElementById('start-pane').remove();
    document.getElementById('exam-sidebar').hidden = false;
    document.getElementById('exam-timer').hidden = false;
    document.getElementById('submit-exam').addEventListener('click', confirmSubmit);
    state.activeTaskId = state.bank.tasks[0].id;
    renderTaskNav();
    renderTask(state.activeTaskId);
    state.timerHandle = setInterval(tickTimer, 1000);
    tickTimer();
  }

  function renderTaskNav() {
    const nav = document.getElementById('task-nav');
    nav.innerHTML = '';
    for (const task of state.bank.tasks) {
      const group = document.createElement('div');
      group.className = 'task-group';
      const head = document.createElement('div');
      head.className = 'task-header';
      head.textContent = task.title;
      group.appendChild(head);
      const list = document.createElement('div');
      list.className = 'subq-list';
      for (const sq of task.subquestions) {
        const row = document.createElement('a');
        row.href = '#';
        row.className = 'subq';
        row.dataset.taskId = task.id;
        row.dataset.subqId = sq.id;
        if (sq.id === state.activeSubqId) row.classList.add('active');
        if (hasAnswer(sq.id)) row.classList.add('answered');
        row.innerHTML = '<span>' + sq.label + '</span><span class="pts">' + sq.points + ' pt</span>';
        row.addEventListener('click', e => {
          e.preventDefault();
          saveCurrent();
          state.activeTaskId = task.id;
          state.activeSubqId = sq.id;
          renderTask(task.id);
          // scroll to subq
          requestAnimationFrame(() => {
            const el = document.querySelector('[data-subq-block="' + sq.id + '"]');
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          });
          renderTaskNav();
        });
        list.appendChild(row);
      }
      group.appendChild(list);
      nav.appendChild(group);
    }
  }

  function hasAnswer(subqId) {
    const a = state.answers[subqId];
    if (a === undefined || a === null) return false;
    if (typeof a === 'string') return !!a.trim();
    if (Array.isArray(a)) return a.length > 0;
    if (typeof a === 'object') {
      if ('nodes' in a) return a.nodes.length > 0 || a.edges.length > 0;
      return true;
    }
    return true;
  }

  function renderTask(taskId) {
    const task = state.bank.tasks.find(t => t.id === taskId);
    if (!task) return;
    const content = document.getElementById('content');
    content.innerHTML = '';
    const h1 = document.createElement('h1');
    h1.style.color = 'var(--accent)';
    h1.style.marginTop = '0';
    h1.textContent = task.title;
    content.appendChild(h1);
    if (task.intro) {
      const intro = document.createElement('div');
      intro.className = 'task-intro';
      intro.textContent = task.intro;
      content.appendChild(intro);
    }
    // Wipe ER editor instances for this task to avoid stale DOM references
    for (const sq of task.subquestions) {
      delete state.erEditors[sq.id];
    }
    for (const sq of task.subquestions) {
      content.appendChild(renderSubq(task, sq));
    }
  }

  function renderSubq(task, sq) {
    const block = document.createElement('div');
    block.className = 'subq-block';
    block.dataset.subqBlock = sq.id;

    const meta = document.createElement('div');
    meta.className = 'subq-meta';
    meta.innerHTML = '<span class="pts-badge">' + sq.points + ' pt</span><span>' + sq.label + '</span>';
    block.appendChild(meta);

    const h = document.createElement('h3');
    h.textContent = sq.label + (sq.shortTitle ? ' · ' + sq.shortTitle : '');
    block.appendChild(h);

    const prompt = document.createElement('div');
    prompt.className = 'subq-prompt';
    prompt.textContent = sq.prompt;
    block.appendChild(prompt);

    if (sq.hint) {
      const hint = document.createElement('div');
      hint.className = 'hint-box';
      hint.innerHTML = '<div class="hint-icon">💡</div><p>' + escapeHtml(sq.hint) + '</p>';
      block.appendChild(hint);
    }

    // Tables (for SQL)
    if (Array.isArray(sq.tables) && sq.tables.length) {
      block.appendChild(renderTables(sq.tables));
    }

    block.appendChild(renderInput(sq));
    return block;
  }

  function renderInput(sq) {
    const wrap = document.createElement('div');
    wrap.className = 'subq-input';
    wrap.dataset.input = '1';

    if (sq.type === 'er_diagram') {
      const host = document.createElement('div');
      host.style.marginTop = '6px';
      wrap.appendChild(host);
      // initialize editor (deferred to next frame to ensure host is in DOM)
      requestAnimationFrame(() => {
        const editor = new ErEditor(host, { initialState: state.answers[sq.id] || (sq.initialState || { nodes: [], edges: [] }) });
        state.erEditors[sq.id] = editor;
      });
      return wrap;
    }
    if (sq.type === 'sql') {
      const block = document.createElement('div');
      block.className = 'sql-block';
      const header = document.createElement('div');
      header.className = 'sql-header';
      header.textContent = 'SQL Query';
      const editorWrap = document.createElement('div');
      editorWrap.className = 'sql-editor-wrap';
      const ta = document.createElement('textarea');
      ta.className = 'sql-editor';
      ta.spellcheck = false;
      ta.placeholder = 'SELECT ...';
      ta.value = state.answers[sq.id] || '';
      const gutter = document.createElement('div');
      gutter.className = 'line-gutter';
      function refreshGutter() {
        const n = (ta.value.split('\n').length) || 1;
        const out = [];
        for (let i = 1; i <= Math.max(n, 6); i++) out.push(i);
        gutter.textContent = out.join('\n');
      }
      ta.addEventListener('input', refreshGutter);
      refreshGutter();
      editorWrap.appendChild(gutter);
      editorWrap.appendChild(ta);
      block.appendChild(header);
      block.appendChild(editorWrap);
      wrap.appendChild(block);
      return wrap;
    }
    if (sq.type === 'long_text') {
      const ta = document.createElement('textarea');
      ta.className = 'long-text';
      ta.spellcheck = false;
      ta.placeholder = 'Your answer…';
      ta.value = state.answers[sq.id] || '';
      wrap.appendChild(ta);
      return wrap;
    }
    if (sq.type === 'short_text') {
      const inp = document.createElement('input');
      inp.type = 'text';
      inp.className = 'text-input';
      inp.value = state.answers[sq.id] || '';
      wrap.appendChild(inp);
      return wrap;
    }
    if (sq.type === 'text_lines' || sq.type === 'multi_line') {
      const ta = document.createElement('textarea');
      ta.className = 'plain-input';
      ta.spellcheck = false;
      ta.placeholder = sq.type === 'text_lines' ? 'One answer per line, e.g.\nA,B\nC,D' : 'One step per line, in order';
      ta.value = state.answers[sq.id] || '';
      wrap.appendChild(ta);
      return wrap;
    }
    if (sq.type === 'radio' || sq.type === 'checkbox') {
      const list = document.createElement('div');
      list.className = 'options-list';
      (sq.options || []).forEach((opt, i) => {
        const id = 'opt-' + sq.id + '-' + i;
        const label = document.createElement('label');
        label.setAttribute('for', id);
        const input = document.createElement('input');
        input.id = id;
        input.type = sq.type === 'radio' ? 'radio' : 'checkbox';
        input.name = 'opt-' + sq.id;
        input.value = String(i);
        const prev = state.answers[sq.id];
        if (sq.type === 'radio' && Number(prev) === i) input.checked = true;
        if (sq.type === 'checkbox' && Array.isArray(prev) && prev.includes(i)) input.checked = true;
        label.appendChild(input);
        const span = document.createElement('span');
        span.textContent = opt;
        label.appendChild(span);
        list.appendChild(label);
      });
      wrap.appendChild(list);
      return wrap;
    }
    wrap.textContent = 'Unknown subquestion type: ' + sq.type;
    return wrap;
  }

  function renderTables(tables) {
    const row = document.createElement('div');
    row.className = 'tables-row';
    for (const t of tables) {
      const block = document.createElement('div');
      block.className = 'table-schema';
      const name = document.createElement('div');
      name.className = 't-name';
      name.textContent = t.name;
      block.appendChild(name);
      const cols = document.createElement('div');
      cols.className = 't-cols';
      cols.style.gridTemplateColumns = 'repeat(' + (t.columns || []).length + ', auto)';
      for (const c of (t.columns || [])) {
        const cls = ['t-col'];
        if (c.isKey) cls.push('key');
        if (c.isFK) cls.push('fk');
        const cell = document.createElement('div');
        cell.className = cls.join(' ');
        cell.textContent = c.name;
        cols.appendChild(cell);
      }
      block.appendChild(cols);
      row.appendChild(block);
    }
    return row;
  }

  function saveCurrent() {
    // Walk all subquestions currently in the DOM and pull their values.
    const blocks = document.querySelectorAll('[data-subq-block]');
    for (const b of blocks) {
      const sqId = b.dataset.subqBlock;
      const sq = findSubq(sqId);
      if (!sq) continue;
      const inputWrap = b.querySelector('[data-input]');
      if (!inputWrap) continue;
      let val;
      if (sq.type === 'er_diagram') {
        const ed = state.erEditors[sqId];
        if (ed) val = ed.getState();
      } else if (sq.type === 'sql') {
        const ta = inputWrap.querySelector('.sql-editor');
        if (ta) val = ta.value;
      } else if (sq.type === 'long_text') {
        const ta = inputWrap.querySelector('.long-text');
        if (ta) val = ta.value;
      } else if (sq.type === 'short_text') {
        const inp = inputWrap.querySelector('.text-input');
        if (inp) val = inp.value;
      } else if (sq.type === 'text_lines' || sq.type === 'multi_line') {
        const ta = inputWrap.querySelector('.plain-input');
        if (ta) val = ta.value;
      } else if (sq.type === 'radio') {
        const sel = inputWrap.querySelector('input[type=radio]:checked');
        val = sel ? Number(sel.value) : null;
      } else if (sq.type === 'checkbox') {
        val = [...inputWrap.querySelectorAll('input[type=checkbox]:checked')].map(i => Number(i.value));
      }
      if (val !== undefined) state.answers[sqId] = val;
    }
  }

  function findSubq(id) {
    for (const t of state.bank.tasks) {
      const s = t.subquestions.find(q => q.id === id);
      if (s) return s;
    }
    return null;
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
    if (!confirm('Submit exam now? You can still adjust rubric items on the results page to fine-tune your score.')) return;
    submitExam(false);
  }

  function submitExam(timeUp) {
    if (state.submitted) return;
    saveCurrent();
    state.submitted = true;
    clearInterval(state.timerHandle);
    document.getElementById('exam-sidebar').hidden = true;
    document.getElementById('exam-timer').hidden = true;
    renderResults(timeUp);
  }

  // ---------- Results & grading ----------
  function autoGradeSubq(sq, answer) {
    // For types with an answer key, run the standard grader and convert to a single auto-rubric mark.
    if (!sq.answer) return null;
    if (sq.type === 'sql' || sq.type === 'short_text' || sq.type === 'text_lines' ||
        sq.type === 'multi_line' || sq.type === 'radio' || sq.type === 'checkbox') {
      try { return Grader.grade(sq, answer); } catch (e) { return null; }
    }
    return null;
  }

  function autoCheckRubric(sq, answer) {
    // Returns { ruleId -> bool|null } where null means "no auto-check available".
    const marks = {};
    if (!Array.isArray(sq.rubric)) return marks;
    if (sq.type === 'er_diagram' && answer && typeof answer === 'object') {
      for (const r of sq.rubric) {
        marks[r.id] = r.match ? ErRubric.match(answer, r.match) : null;
      }
      return marks;
    }
    // For auto-gradable types, if the auto-grader says correct, default ALL rubric items to checked.
    const auto = autoGradeSubq(sq, answer);
    for (const r of sq.rubric) {
      if (auto) marks[r.id] = auto.correct ? true : null;
      else marks[r.id] = null;
    }
    return marks;
  }

  function computeSubqScore(sq, rubricMarks) {
    if (!Array.isArray(sq.rubric) || sq.rubric.length === 0) {
      // No rubric — fallback to binary auto-grade if available, else 0.
      const auto = autoGradeSubq(sq, state.answers[sq.id]);
      return auto && auto.correct ? sq.points : 0;
    }
    const total = sq.rubric.reduce((s, r) => s + (r.weight || 0), 0);
    if (total <= 0) return 0;
    const earned = sq.rubric.reduce((s, r) => s + (rubricMarks[r.id] ? (r.weight || 0) : 0), 0);
    return (earned / total) * sq.points;
  }

  function renderResults(timeUp) {
    const content = document.getElementById('content');
    content.innerHTML = '';

    // Initialize rubric marks from auto-checks (only if not already set by user)
    for (const t of state.bank.tasks) {
      for (const sq of t.subquestions) {
        if (state.rubricMarks[sq.id]) continue;
        const auto = autoCheckRubric(sq, state.answers[sq.id]);
        const initial = {};
        for (const r of (sq.rubric || [])) {
          initial[r.id] = auto[r.id] === true;
        }
        state.rubricMarks[sq.id] = initial;
      }
    }

    const gradeBox = document.createElement('div');
    gradeBox.className = 'exam-grade-box';
    gradeBox.id = 'grade-box';
    content.appendChild(gradeBox);

    if (timeUp) {
      const note = document.createElement('p');
      note.innerHTML = '<em>Time expired — submitted automatically.</em>';
      note.style.color = 'var(--text-soft)';
      content.appendChild(note);
    }

    // For each task / subquestion, show prompt, answer, model, rubric checklist.
    for (const task of state.bank.tasks) {
      const tHead = document.createElement('h2');
      tHead.textContent = task.title;
      tHead.style.color = 'var(--accent)';
      tHead.style.marginTop = '28px';
      content.appendChild(tHead);
      for (const sq of task.subquestions) {
        content.appendChild(renderResultBlock(task, sq));
      }
    }

    updateGradeBox();

    const again = document.createElement('button');
    again.type = 'button';
    again.className = 'primary-btn';
    again.textContent = 'New exam';
    again.style.marginTop = '20px';
    again.addEventListener('click', () => location.reload());
    content.appendChild(again);
  }

  function renderResultBlock(task, sq) {
    const block = document.createElement('div');
    block.className = 'subq-block';
    block.style.borderLeft = '3px solid var(--border)';
    block.style.paddingLeft = '14px';

    const meta = document.createElement('div');
    meta.className = 'subq-meta';
    meta.innerHTML = '<span class="pts-badge">' + sq.points + ' pt</span><span>' + sq.label + '</span>';
    block.appendChild(meta);

    const prompt = document.createElement('div');
    prompt.className = 'subq-prompt';
    prompt.textContent = sq.prompt;
    block.appendChild(prompt);

    // Your answer
    const yours = document.createElement('div');
    yours.style.marginTop = '8px';
    const ansLabel = document.createElement('div');
    ansLabel.style.fontSize = '12px';
    ansLabel.style.color = 'var(--text-muted)';
    ansLabel.style.textTransform = 'uppercase';
    ansLabel.style.letterSpacing = '0.4px';
    ansLabel.textContent = 'Your answer';
    yours.appendChild(ansLabel);
    yours.appendChild(renderAnswerView(sq, state.answers[sq.id]));
    block.appendChild(yours);

    // Model answer
    if (sq.modelAnswer) {
      const model = document.createElement('div');
      model.style.marginTop = '10px';
      const ml = document.createElement('div');
      ml.style.fontSize = '12px';
      ml.style.color = 'var(--text-muted)';
      ml.style.textTransform = 'uppercase';
      ml.style.letterSpacing = '0.4px';
      ml.textContent = 'Model answer';
      model.appendChild(ml);
      const mdiv = document.createElement('div');
      mdiv.className = 'feedback';
      mdiv.style.borderColor = '#b8c0cf';
      mdiv.style.background = '#fafbfc';
      mdiv.style.color = 'var(--text)';
      const m = document.createElement('div');
      m.className = 'model';
      m.style.whiteSpace = 'pre-wrap';
      m.textContent = sq.modelAnswer;
      mdiv.appendChild(m);
      model.appendChild(mdiv);
      block.appendChild(model);
    }

    // Auto-grade summary (for types that have one)
    const auto = autoGradeSubq(sq, state.answers[sq.id]);
    if (auto) {
      const fb = document.createElement('div');
      fb.className = 'feedback ' + (auto.correct ? 'correct' : 'wrong');
      fb.innerHTML = '<h4>' + (auto.correct ? '✓ Auto-grade: correct' : '✗ Auto-grade: not correct') + '</h4>' +
                     '<div>' + escapeHtml(auto.summary || '') + '</div>';
      block.appendChild(fb);
    }

    // Rubric
    if (Array.isArray(sq.rubric) && sq.rubric.length) {
      const head = document.createElement('div');
      head.style.fontSize = '12px';
      head.style.color = 'var(--text-muted)';
      head.style.textTransform = 'uppercase';
      head.style.letterSpacing = '0.4px';
      head.style.marginTop = '12px';
      head.textContent = 'Rubric (click to adjust)';
      block.appendChild(head);
      const ul = document.createElement('ul');
      ul.className = 'rubric-list';
      for (const r of sq.rubric) {
        const li = document.createElement('li');
        const lbl = document.createElement('label');
        const chk = document.createElement('input');
        chk.type = 'checkbox';
        chk.checked = !!(state.rubricMarks[sq.id] && state.rubricMarks[sq.id][r.id]);
        chk.addEventListener('change', () => {
          state.rubricMarks[sq.id][r.id] = chk.checked;
          updateGradeBox();
        });
        lbl.appendChild(chk);
        const txt = document.createElement('span');
        txt.textContent = r.label;
        lbl.appendChild(txt);
        li.appendChild(lbl);
        const w = document.createElement('span');
        w.className = 'rubric-weight';
        w.textContent = (r.weight || 0).toFixed(2) + 'w';
        li.appendChild(w);
        ul.appendChild(li);
      }
      block.appendChild(ul);
    }

    if (sq.explanation) {
      const e = document.createElement('div');
      e.style.fontSize = '12.5px';
      e.style.color = 'var(--text-soft)';
      e.style.marginTop = '8px';
      e.style.fontStyle = 'italic';
      e.textContent = sq.explanation;
      block.appendChild(e);
    }

    return block;
  }

  function renderAnswerView(sq, ans) {
    const box = document.createElement('div');
    if (ans === undefined || ans === null || (typeof ans === 'string' && !ans.trim()) ||
        (Array.isArray(ans) && !ans.length) ||
        (typeof ans === 'object' && 'nodes' in ans && !ans.nodes.length && !ans.edges.length)) {
      box.className = 'your-answer';
      box.style.fontFamily = 'inherit';
      box.style.fontStyle = 'italic';
      box.style.color = 'var(--text-muted)';
      box.textContent = '(no answer submitted)';
      return box;
    }
    if (sq.type === 'er_diagram') {
      const host = document.createElement('div');
      host.style.height = '380px';
      host.style.border = '1px solid var(--border)';
      host.style.borderRadius = '6px';
      host.style.background = '#fff';
      host.style.position = 'relative';
      host.style.overflow = 'hidden';
      requestAnimationFrame(() => {
        new ErEditor(host, { readOnly: true, initialState: ans });
      });
      return host;
    }
    if (sq.type === 'radio') {
      box.className = 'your-answer';
      box.textContent = sq.options[Number(ans)] || '(invalid)';
      return box;
    }
    if (sq.type === 'checkbox') {
      box.className = 'your-answer';
      box.textContent = (ans || []).map(i => sq.options[Number(i)]).join(' / ');
      return box;
    }
    box.className = 'your-answer';
    box.style.whiteSpace = 'pre-wrap';
    box.textContent = String(ans);
    return box;
  }

  function updateGradeBox() {
    const gradeBox = document.getElementById('grade-box');
    let totalScore = 0;
    const perTask = {};
    const breakdown = [];
    for (const task of state.bank.tasks) {
      const taskRow = { id: task.id, title: task.title, points: 0, max: 0 };
      for (const sq of task.subquestions) {
        const got = computeSubqScore(sq, state.rubricMarks[sq.id] || {});
        totalScore += got;
        taskRow.points += got;
        taskRow.max += sq.points;
        breakdown.push({ task, sq, got });
      }
      perTask[task.id] = taskRow;
    }
    const maxPoints = state.bank.maxPoints || state.bank.tasks.reduce((s, t) => s + t.subquestions.reduce((s2, q) => s2 + q.points, 0), 0);
    const pct = maxPoints > 0 ? (totalScore / maxPoints) : 0;
    const grade = pct * 10;

    let html = '';
    html += '<div class="grade-big"><div class="grade-num">' + grade.toFixed(1) + '</div>' +
            '<div class="grade-sub">Grade · ' + (pct * 100).toFixed(1) + '% (' + totalScore.toFixed(2) + ' / ' + maxPoints.toFixed(1) + ' pts)</div></div>';
    html += '<dl class="grade-meta">';
    for (const t of state.bank.tasks) {
      const row = perTask[t.id];
      html += '<dt>' + t.title + '</dt><dd>' + row.points.toFixed(2) + ' / ' + row.max.toFixed(1) + '</dd><dd style="color:var(--text-muted); font-weight:400;">' + (row.max ? Math.round(row.points / row.max * 100) : 0) + '%</dd>';
    }
    html += '</dl>';
    gradeBox.innerHTML = html;
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, ch => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[ch]));
  }

  document.addEventListener('DOMContentLoaded', init);
})();
