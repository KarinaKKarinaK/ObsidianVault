/* Renders a single question and reads back the user's answer. */
(function () {
  function el(tag, attrs, children) {
    const e = document.createElement(tag);
    if (attrs) for (const k in attrs) {
      if (k === 'class') e.className = attrs[k];
      else if (k === 'html') e.innerHTML = attrs[k];
      else if (k.startsWith('on') && typeof attrs[k] === 'function') e.addEventListener(k.slice(2), attrs[k]);
      else if (attrs[k] != null) e.setAttribute(k, attrs[k]);
    }
    if (children) for (const c of children) if (c != null) e.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    return e;
  }
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, ch => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[ch]));
  }

  function renderTables(tables) {
    if (!tables || !tables.length) return null;
    const wrap = el('div', { class: 'tables-row' });
    let hasFk = false;
    for (const t of tables) {
      const block = el('div', { class: 'table-schema' });
      block.appendChild(el('div', { class: 't-name' }, [t.name]));
      const cols = el('div', { class: 't-cols' });
      cols.style.gridTemplateColumns = 'repeat(' + (t.columns || []).length + ', auto)';
      for (const c of (t.columns || [])) {
        const classes = ['t-col'];
        if (c.isKey) classes.push('key');
        if (c.isFK) { classes.push('fk'); hasFk = true; }
        cols.appendChild(el('div', { class: classes.join(' ') }, [c.name]));
      }
      block.appendChild(cols);
      wrap.appendChild(block);
    }
    return wrap;
  }

  function renderFkNotes(tables) {
    const notes = [];
    for (const t of tables || []) {
      for (const fk of t.foreignKeys || []) {
        notes.push(t.name + '.' + fk.column + ' → ' + fk.refTable + '.' + fk.refColumn);
      }
    }
    if (!notes.length) return null;
    return el('div', { class: 'fk-note' }, [notes.join('   ·   ')]);
  }

  function renderHint(hint) {
    if (!hint) return null;
    const box = el('div', { class: 'hint-box' });
    box.appendChild(el('div', { class: 'hint-icon' }, ['💡']));
    box.appendChild(el('p', { html: escapeHtml(hint) }));
    return box;
  }

  function lineNumberGutter(textarea) {
    const gutter = el('div', { class: 'line-gutter' });
    function refresh() {
      const lines = textarea.value.split('\n').length || 1;
      const nums = [];
      for (let i = 1; i <= Math.max(lines, 6); i++) nums.push(i);
      gutter.textContent = nums.join('\n');
    }
    textarea.addEventListener('input', refresh);
    textarea.addEventListener('change', refresh);
    refresh();
    return gutter;
  }

  function renderInput(q) {
    if (q.type === 'sql') {
      const block = el('div', { class: 'sql-block' });
      block.appendChild(el('div', { class: 'sql-header' }, ['SQL Query']));
      const wrap = el('div', { class: 'sql-editor-wrap' });
      const ta = el('textarea', { class: 'sql-editor', spellcheck: 'false', autocapitalize: 'off', autocomplete: 'off', placeholder: 'SELECT ...' });
      ta.dataset.input = '1';
      wrap.appendChild(lineNumberGutter(ta));
      wrap.appendChild(ta);
      block.appendChild(wrap);
      return block;
    }
    if (q.type === 'text_lines' || q.type === 'multi_line') {
      const ta = el('textarea', { class: 'plain-input', spellcheck: 'false', placeholder: q.type === 'text_lines' ? 'One answer per line, e.g.\n{A,B}\n{C,D}' : 'One step per line, in order' });
      ta.dataset.input = '1';
      return ta;
    }
    if (q.type === 'short_text') {
      const i = el('input', { class: 'text-input', type: 'text', spellcheck: 'false', placeholder: 'Your answer' });
      i.dataset.input = '1';
      return i;
    }
    if (q.type === 'radio' || q.type === 'checkbox') {
      const list = el('div', { class: 'options-list' });
      (q.options || []).forEach((opt, i) => {
        const id = 'opt-' + q.id + '-' + i;
        const label = el('label', { for: id });
        const input = el('input', { id: id, type: q.type === 'radio' ? 'radio' : 'checkbox', name: 'opt-' + q.id, value: String(i) });
        input.dataset.input = '1';
        label.appendChild(input);
        label.appendChild(el('span', null, [opt]));
        list.appendChild(label);
      });
      return list;
    }
    return el('div', null, ['Unknown question type: ' + q.type]);
  }

  function readAnswer(q, root) {
    if (q.type === 'radio') {
      const sel = root.querySelector('input[type=radio]:checked');
      return sel ? Number(sel.value) : null;
    }
    if (q.type === 'checkbox') {
      return [...root.querySelectorAll('input[type=checkbox]:checked')].map(i => Number(i.value));
    }
    const inp = root.querySelector('[data-input]');
    return inp ? inp.value : '';
  }

  function renderQuestion(q, opts) {
    opts = opts || {};
    const root = el('div', { class: 'q-container' });
    const meta = el('div', { class: 'q-meta' });
    if (opts.topicName) meta.appendChild(el('span', { class: 'chip' }, [opts.topicName]));
    if (q.subtopic) meta.appendChild(el('span', { class: 'chip' }, [q.subtopic]));
    meta.appendChild(el('span', { class: 'chip type' }, [labelFor(q.type)]));
    root.appendChild(meta);
    root.appendChild(el('h2', { class: 'q-title' }, [opts.title || 'Question']));
    root.appendChild(el('div', { class: 'q-prompt' }, [q.prompt || '']));
    const tables = renderTables(q.tables);
    if (tables) root.appendChild(tables);
    const fkNotes = renderFkNotes(q.tables);
    if (fkNotes) root.appendChild(fkNotes);
    const hint = renderHint(q.hint);
    if (hint) root.appendChild(hint);
    const input = renderInput(q);
    root.appendChild(input);
    return root;
  }

  function labelFor(t) {
    return ({
      sql: 'SQL query',
      text_lines: 'Set of answers',
      multi_line: 'Multi-line answer',
      short_text: 'Short text',
      radio: 'Single choice',
      checkbox: 'Multiple choice'
    })[t] || t;
  }

  function renderFeedback(result) {
    const box = el('div', { class: 'feedback ' + (result.correct ? 'correct' : 'wrong') });
    box.appendChild(el('h4', null, [result.correct ? '✓ Correct' : '✗ Not correct']));
    box.appendChild(el('div', null, [result.summary]));
    if (result.model) {
      box.appendChild(el('div', { class: 'model' }, [result.model]));
    }
    if (result.explanation) {
      box.appendChild(el('div', { class: 'explanation' }, [result.explanation]));
    }
    return box;
  }

  window.QuestionUI = { renderQuestion, readAnswer, renderFeedback };
})();
