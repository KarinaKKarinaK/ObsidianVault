/* Practice mode controller. Persists per-question progress to localStorage. */
(function () {
  const state = {
    topicId: null,
    index: 0,
    attempts: 0,
    questions: [],   // current visible pool (filtered)
    filter: 'pending', // 'all' | 'pending' | 'done'
    allForTopic: []  // full set for the topic
  };

  function init() {
    DataStore.load().then(() => {
      renderTopicTree();
      const params = new URLSearchParams(location.search);
      const t = params.get('topic');
      if (t) selectTopic(t);
    }).catch(err => {
      document.getElementById('content').innerHTML =
        '<div class="empty-state"><h1>Could not load question bank</h1><p>' + err.message + '</p></div>';
    });
  }

  function renderTopicTree() {
    const tree = document.getElementById('topic-tree');
    const stats = Progress.statsByTopic(DataStore.bank);
    tree.innerHTML = '';
    for (const t of DataStore.bank.topics) {
      const s = stats[t.id] || { total: 0, attempted: 0, correct: 0 };
      const row = document.createElement('a');
      row.className = 'topic';
      row.dataset.id = t.id;
      row.href = '#';
      const allDone = s.total > 0 && s.attempted === s.total;
      const tick = allDone ? '<span style="margin-right:6px;">✓</span>' : '';
      row.innerHTML = tick + '<span>' + t.name + '</span>' +
        '<span class="count" title="' + s.correct + ' correct of ' + s.attempted + ' attempted of ' + s.total + '">' +
        s.attempted + '/' + s.total + '</span>';
      row.addEventListener('click', e => { e.preventDefault(); selectTopic(t.id); });
      tree.appendChild(row);
    }
    // Overall + reset link
    const overall = Progress.overall(DataStore.bank);
    const summary = document.createElement('div');
    summary.style.marginTop = '14px';
    summary.style.padding = '8px 10px';
    summary.style.fontSize = '12px';
    summary.style.color = 'var(--text-soft)';
    summary.style.borderTop = '1px dashed var(--border)';
    summary.innerHTML = '<div><b>' + overall.attempted + ' / ' + overall.total + '</b> attempted · <b>' + overall.correct + '</b> correct</div>';
    const reset = document.createElement('a');
    reset.href = '#';
    reset.style.fontSize = '11.5px';
    reset.textContent = 'Reset all progress';
    reset.addEventListener('click', e => {
      e.preventDefault();
      if (!confirm('Reset progress on ALL questions across ALL topics?')) return;
      Progress.clearAll();
      renderTopicTree();
      if (state.topicId) selectTopic(state.topicId);
    });
    summary.appendChild(reset);
    tree.appendChild(summary);
  }

  function selectTopic(id) {
    state.topicId = id;
    state.attempts = 0;
    state.allForTopic = DataStore.questionsByTopic(id);
    applyFilter();
    [...document.querySelectorAll('.topic-tree .topic')].forEach(el =>
      el.classList.toggle('active', el.dataset.id === id));
    history.replaceState(null, '', '?topic=' + encodeURIComponent(id));
    if (!state.questions.length) {
      // The filter excluded everything (e.g., all done with 'pending' filter)
      renderEmptyFilter();
      return;
    }
    state.index = 0;
    renderCurrent();
  }

  function applyFilter() {
    const pool = state.allForTopic.slice();
    let filtered;
    if (state.filter === 'pending') {
      filtered = pool.filter(q => !Progress.get(q.id));
    } else if (state.filter === 'done') {
      filtered = pool.filter(q => !!Progress.get(q.id));
    } else {
      filtered = pool;
    }
    state.questions = shuffle(filtered);
  }

  function renderEmptyFilter() {
    const allDone = state.allForTopic.every(q => !!Progress.get(q.id));
    const content = document.getElementById('content');
    const total = state.allForTopic.length;
    const done = state.allForTopic.filter(q => !!Progress.get(q.id)).length;
    content.innerHTML = '';
    const wrap = document.createElement('div');
    wrap.className = 'empty-state';
    wrap.innerHTML =
      '<h1>' + (state.filter === 'pending' && allDone ? '🎉 All done for this topic' : 'Nothing matches the filter') + '</h1>' +
      '<p>' + done + ' of ' + total + ' questions in this topic have been attempted.</p>';
    content.appendChild(wrap);
    content.appendChild(renderFilterBar());
  }

  function renderFilterBar() {
    const total = state.allForTopic.length;
    const done = state.allForTopic.filter(q => !!Progress.get(q.id)).length;
    const pending = total - done;

    const bar = document.createElement('div');
    bar.style.display = 'flex';
    bar.style.alignItems = 'center';
    bar.style.gap = '10px';
    bar.style.margin = '14px 0 18px';
    bar.style.padding = '8px 12px';
    bar.style.background = 'var(--bg-soft)';
    bar.style.borderRadius = '6px';
    bar.style.border = '1px solid var(--border-soft)';
    bar.style.fontSize = '12.5px';

    const seg = document.createElement('div');
    seg.style.display = 'flex';
    seg.style.gap = '4px';
    const make = (key, label, n) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.textContent = label + ' (' + n + ')';
      b.style.border = '1px solid var(--border)';
      b.style.background = state.filter === key ? 'var(--accent)' : '#fff';
      b.style.color = state.filter === key ? '#fff' : 'var(--text)';
      b.style.borderColor = state.filter === key ? 'var(--accent)' : 'var(--border)';
      b.style.borderRadius = '4px';
      b.style.padding = '4px 10px';
      b.style.cursor = 'pointer';
      b.style.fontSize = '12px';
      b.style.fontFamily = 'inherit';
      b.addEventListener('click', () => {
        state.filter = key;
        selectTopic(state.topicId);
      });
      return b;
    };
    seg.appendChild(make('pending', 'Pending', pending));
    seg.appendChild(make('done', 'Done', done));
    seg.appendChild(make('all', 'All', total));
    bar.appendChild(seg);

    const right = document.createElement('div');
    right.style.marginLeft = 'auto';
    right.style.color = 'var(--text-muted)';

    const resetBtn = document.createElement('a');
    resetBtn.href = '#';
    resetBtn.textContent = 'Reset this topic';
    resetBtn.style.fontSize = '11.5px';
    resetBtn.addEventListener('click', e => {
      e.preventDefault();
      if (!confirm('Reset progress for every question in this topic?')) return;
      Progress.clearMany(state.allForTopic.map(q => q.id));
      renderTopicTree();
      selectTopic(state.topicId);
    });
    right.appendChild(resetBtn);
    bar.appendChild(right);
    return bar;
  }

  function renderCurrent() {
    const content = document.getElementById('content');
    content.innerHTML = '';
    content.appendChild(renderFilterBar());
    const q = state.questions[state.index];
    if (!q) { renderEmptyFilter(); return; }
    const topic = DataStore.topic(state.topicId);
    const root = QuestionUI.renderQuestion(q, {
      topicName: topic.name,
      title: 'Question ' + (state.index + 1) + ' of ' + state.questions.length
    });

    // Show prior status badge (if attempted before)
    const prior = Progress.get(q.id);
    if (prior) {
      const badge = document.createElement('div');
      badge.style.marginBottom = '10px';
      badge.style.fontSize = '12px';
      badge.style.fontWeight = '500';
      badge.style.padding = '6px 12px';
      badge.style.borderRadius = '6px';
      badge.style.display = 'inline-block';
      if (prior.status === 'correct') {
        badge.style.background = 'var(--success-bg)';
        badge.style.color = 'var(--success)';
        badge.textContent = '✓ Previously solved · ' + prior.count + ' attempt' + (prior.count > 1 ? 's' : '');
      } else {
        badge.style.background = 'var(--warn-bg)';
        badge.style.color = 'var(--warn)';
        badge.textContent = '↻ Previously attempted (not yet correct) · ' + prior.count + ' attempt' + (prior.count > 1 ? 's' : '');
      }
      // insert after the title
      const title = root.querySelector('.q-title');
      if (title && title.parentNode) title.parentNode.insertBefore(badge, title.nextSibling);
      else root.insertBefore(badge, root.firstChild);
    }

    // Dataset preview for runnable SQL
    if (q.type === 'sql' && q.datasetId && q.runnable !== false && typeof SqlUI !== 'undefined') {
      const preview = SqlUI.renderDatasetPreview(q.datasetId);
      if (preview) root.appendChild(preview);
    }

    const actions = document.createElement('div');
    actions.className = 'actions';
    if (q.type === 'sql' && q.datasetId && q.runnable !== false) {
      const runBtn = btn('Run Query', 'btn run', () => onRunSql(root, q));
      actions.appendChild(runBtn);
    }
    const grade = btn('Grade Solution', 'btn primary', () => onGrade(root, q));
    const next  = btn('Next question →', 'btn', nextQuestion);
    const reset = btn('Try again', 'btn', () => renderCurrent());
    const markDone = btn('Mark as done', 'btn', () => markDoneManual(q));
    actions.appendChild(grade);
    actions.appendChild(reset);
    actions.appendChild(next);
    if (!prior || prior.status !== 'correct') actions.appendChild(markDone);
    root.appendChild(actions);

    const attempts = document.createElement('div');
    attempts.className = 'attempts-line';
    attempts.innerHTML = 'You have <b>99 attempts</b> remaining. After grading, the solution (or an explanation) will be shown.';
    root.appendChild(attempts);
    content.appendChild(root);
  }

  function btn(label, cls, on) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = cls;
    b.textContent = label;
    b.addEventListener('click', on);
    return b;
  }

  function onGrade(root, q) {
    const user = QuestionUI.readAnswer(q, root);
    state.attempts++;
    // Remove old feedback / result tables
    [...root.querySelectorAll('.feedback, .sql-result-block')].forEach(n => n.remove());

    const showLoading = q.type === 'sql' && q.datasetId && q.runnable !== false;
    const loading = showLoading ? SqlUI.renderLoadingBlock('Grading your query…') : null;
    if (loading) root.appendChild(loading);

    Grader.gradeAsync(q, user).then(result => {
      if (loading) loading.remove();
      // Persist progress (sticky correct)
      Progress.record(q.id, result.correct);
      renderTopicTree();

      // For SQL: show result table(s)
      if (q.type === 'sql' && q.datasetId && q.runnable !== false) {
        if (result.userResult) root.appendChild(SqlUI.renderResultTable(result.userResult, { title: 'Your result' }));
        if (!result.correct && result.modelResult) {
          root.appendChild(SqlUI.renderResultTable(result.modelResult, { title: 'Expected result' }));
        }
      }

      const fb = QuestionUI.renderFeedback({
        correct: result.correct,
        summary: result.summary,
        model: result.model,
        explanation: q.explanation || ''
      });
      root.appendChild(fb);
    }, err => {
      if (loading) loading.remove();
      root.appendChild(SqlUI.renderResultTable({ error: 'Engine error: ' + (err.message || err) }, { title: 'Error' }));
    });
  }

  function onRunSql(root, q) {
    const user = QuestionUI.readAnswer(q, root);
    if (!user || !user.trim()) { alert('Type a SQL query first.'); return; }
    [...root.querySelectorAll('.sql-result-block')].forEach(n => n.remove());
    const loading = SqlUI.renderLoadingBlock('Running query…');
    root.appendChild(loading);
    SqlRunner.run(user, q.datasetId).then(result => {
      loading.remove();
      root.appendChild(SqlUI.renderResultTable(result, { title: 'Your result' }));
    }, err => {
      loading.remove();
      root.appendChild(SqlUI.renderResultTable({ error: 'Engine error: ' + (err.message || err) }, { title: 'Error' }));
    });
  }

  function markDoneManual(q) {
    Progress.record(q.id, true);
    renderTopicTree();
    renderCurrent();
  }

  function nextQuestion() {
    if (state.questions.length === 0) return;
    state.index = (state.index + 1) % state.questions.length;
    state.attempts = 0;
    renderCurrent();
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  document.addEventListener('DOMContentLoaded', init);
})();
