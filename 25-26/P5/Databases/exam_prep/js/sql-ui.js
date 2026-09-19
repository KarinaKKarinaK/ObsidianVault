/* SQL UI helpers: Run-Query button, result-table rendering. */
(function () {
  function el(tag, attrs, kids) {
    const e = document.createElement(tag);
    if (attrs) for (const k in attrs) {
      if (k === 'class') e.className = attrs[k];
      else if (k.startsWith('on') && typeof attrs[k] === 'function') e.addEventListener(k.slice(2), attrs[k]);
      else if (attrs[k] != null) e.setAttribute(k, attrs[k]);
    }
    if (kids) for (const c of kids) if (c != null) e.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    return e;
  }

  function renderResultTable(result, opts) {
    opts = opts || {};
    const wrap = el('div', { class: 'sql-result-block' });
    const header = el('div', { class: 'sql-result-header' });
    header.appendChild(el('span', { class: 'sql-result-title' }, [opts.title || 'Query result']));
    header.appendChild(el('span', { class: 'sql-result-meta' }, [
      result.rows ? (result.rows.length + ' row' + (result.rows.length === 1 ? '' : 's')) : ''
    ]));
    wrap.appendChild(header);
    if (result.error) {
      const errBox = el('div', { class: 'sql-result-error' });
      errBox.textContent = result.error;
      wrap.appendChild(errBox);
      return wrap;
    }
    const cols = result.columns || [];
    const rows = result.rows || [];
    if (!cols.length) {
      wrap.appendChild(el('div', { class: 'sql-result-empty' }, ['(no result columns — was this a SELECT?)']));
      return wrap;
    }
    const tableWrap = el('div', { class: 'sql-result-scroll' });
    const table = el('table', { class: 'sql-result-table' });
    const thead = el('thead');
    const trh = el('tr');
    for (const c of cols) trh.appendChild(el('th', null, [String(c)]));
    thead.appendChild(trh);
    table.appendChild(thead);
    const tbody = el('tbody');
    if (rows.length === 0) {
      const tr = el('tr');
      tr.appendChild(el('td', { colspan: cols.length, class: 'sql-result-empty-row' }, ['(no rows returned)']));
      tbody.appendChild(tr);
    } else {
      for (const row of rows) {
        const tr = el('tr');
        for (const cell of row) {
          const td = el('td');
          if (cell === null || cell === undefined) {
            td.className = 'null';
            td.textContent = 'NULL';
          } else {
            td.textContent = String(cell);
          }
          tr.appendChild(td);
        }
        tbody.appendChild(tr);
      }
    }
    table.appendChild(tbody);
    tableWrap.appendChild(table);
    wrap.appendChild(tableWrap);
    return wrap;
  }

  function renderDatasetPreview(datasetId) {
    if (typeof SqlRunner === 'undefined') return null;
    const preview = SqlRunner.datasetSchemaPreview(datasetId);
    if (!preview) return null;
    const wrap = el('div', { class: 'sql-dataset-preview' });
    const header = el('div', { class: 'sql-dataset-header' });
    header.appendChild(el('span', null, ['Sample data: ' + (preview.name || datasetId)]));
    const toggle = el('a', { href: '#', class: 'sql-dataset-toggle' }, ['show / hide ▾']);
    header.appendChild(toggle);
    wrap.appendChild(header);
    const body = el('div', { class: 'sql-dataset-body', hidden: 'hidden' });
    const code = el('pre', { class: 'sql-dataset-code' });
    code.textContent = [].concat(preview.schema || [], preview.data || []).join('\n');
    body.appendChild(code);
    wrap.appendChild(body);
    toggle.addEventListener('click', e => {
      e.preventDefault();
      body.hidden = !body.hidden;
    });
    return wrap;
  }

  function renderLoadingBlock(text) {
    const wrap = el('div', { class: 'sql-result-block' });
    const header = el('div', { class: 'sql-result-header' });
    header.appendChild(el('span', { class: 'sql-result-title' }, [text || 'Running…']));
    const dot = el('span', { class: 'sql-result-meta' }, ['◌ working']);
    header.appendChild(dot);
    wrap.appendChild(header);
    wrap.appendChild(el('div', { class: 'sql-result-empty' }, ['Initializing SQL engine and running your query — first run takes ~1s.']));
    return wrap;
  }

  window.SqlUI = { renderResultTable, renderDatasetPreview, renderLoadingBlock };
})();
