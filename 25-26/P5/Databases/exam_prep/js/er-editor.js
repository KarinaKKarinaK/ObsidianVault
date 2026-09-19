/* ER Diagram editor — SVG-based, supports the iSubmit shapes and modifiers.
 *
 * Node types:  entity (blue rect), attribute (yellow ellipse), relationship (red diamond), isA (green triangle)
 * Modifiers:
 *   entity:        weak (double border)
 *   attribute:     key (underlined), multiValue (double), derived (dashed), discriminator (dashed underline)
 *   relationship:  identifying (double), aggregation (boxed)
 *   isA:           disjoint, total (shown as text labels)
 * Edges: solid line between two nodes, optional cardinality label (0..1 / 1 / 0..* / 1..*).
 *
 * Interaction:
 *   - Click empty canvas → "new node" popup with 4 type buttons
 *   - Click node → edit popup (name, modifiers, connect, delete)
 *   - Drag node → moves it
 *   - In edit popup, "Connect…" button enters edge-create mode; next click on another node creates an edge
 *   - Click edge → cardinality dropdown + delete
 *
 * Public API:
 *   const editor = new ErEditor(containerEl, { readOnly, initialState });
 *   editor.getState();  // -> { nodes:[], edges:[] }
 *   editor.setState({nodes, edges});
 */
(function () {
  const NS = 'http://www.w3.org/2000/svg';

  const NODE_DEFAULTS = {
    entity:       { w: 110, h: 44, label: 'Entity' },
    attribute:    { w: 96,  h: 42, label: 'attribute' },
    relationship: { w: 110, h: 70, label: 'rel' },
    isA:          { w: 78,  h: 60, label: 'isA' }
  };

  let _uid = 1;
  function uid(prefix) { return prefix + '-' + (Date.now().toString(36)) + '-' + (_uid++); }

  function svg(tag, attrs) {
    const e = document.createElementNS(NS, tag);
    if (attrs) for (const k in attrs) {
      if (attrs[k] == null) continue;
      e.setAttribute(k, attrs[k]);
    }
    return e;
  }
  function el(tag, attrs, kids) {
    const e = document.createElement(tag);
    if (attrs) for (const k in attrs) {
      if (k === 'class') e.className = attrs[k];
      else if (k === 'html') e.innerHTML = attrs[k];
      else if (k.startsWith('on') && typeof attrs[k] === 'function') e.addEventListener(k.slice(2), attrs[k]);
      else if (attrs[k] != null) e.setAttribute(k, attrs[k]);
    }
    if (kids) for (const k of kids) if (k != null) e.appendChild(typeof k === 'string' ? document.createTextNode(k) : k);
    return e;
  }

  class ErEditor {
    constructor(container, opts = {}) {
      this.container = container;
      this.readOnly = !!opts.readOnly;
      this.state = opts.initialState
        ? JSON.parse(JSON.stringify(opts.initialState))
        : { nodes: [], edges: [] };
      this.selectedNodeId = null;
      this.selectedEdgeId = null;
      this.connectFromId = null;
      this._build();
      this.render();
    }

    getState() { return JSON.parse(JSON.stringify(this.state)); }
    setState(s) { this.state = JSON.parse(JSON.stringify(s || { nodes: [], edges: [] })); this.render(); }
    setReadOnly(b) { this.readOnly = b; this.render(); }

    _build() {
      this.container.classList.add('er-editor');
      this.container.innerHTML = '';

      const wrap = el('div', { class: 'er-wrap' });
      this.svg = svg('svg', { class: 'er-svg', width: '100%', height: '100%' });
      this.svg.setAttribute('viewBox', '0 0 1000 600');
      this.svg.setAttribute('preserveAspectRatio', 'xMinYMin meet');
      wrap.appendChild(this.svg);

      // Layers
      this.edgeLayer = svg('g', { class: 'edges' });
      this.nodeLayer = svg('g', { class: 'nodes' });
      this.svg.appendChild(this.edgeLayer);
      this.svg.appendChild(this.nodeLayer);

      // Right toolbar (zoom +/−/fit/grid)
      this.toolbar = el('div', { class: 'er-toolbar' });
      this.toolbar.appendChild(el('button', { class: 'er-tb', title: 'Add node — click canvas', onclick: () => this._closePopups() }, ['+']));
      this.toolbar.appendChild(el('button', { class: 'er-tb', title: 'Reset view', onclick: () => this._resetView() }, ['◯']));
      this.toolbar.appendChild(el('button', { class: 'er-tb', title: 'Clear all', onclick: () => this._clearAll() }, ['–']));
      this.toolbar.appendChild(el('button', { class: 'er-tb', title: 'Toggle grid', onclick: () => this._toggleGrid() }, ['▦']));
      wrap.appendChild(this.toolbar);

      // Hint banner (legend)
      this.hint = el('div', { class: 'er-hint' }, [
        'Click canvas → new node. Click a node → edit. Drag a node → move. Use "Connect…" in the edit popup to draw an edge.'
      ]);
      wrap.appendChild(this.hint);

      // Popup mount
      this.popupHost = el('div', { class: 'er-popups' });
      wrap.appendChild(this.popupHost);

      this.container.appendChild(wrap);

      // Canvas click — open "new node" popup
      this.svg.addEventListener('click', e => {
        if (this.readOnly) return;
        if (e.target === this.svg || e.target.classList.contains('er-bg')) {
          this._closePopups();
          if (this.connectFromId) { this.connectFromId = null; this._hint('Connect cancelled.'); return; }
          const pt = this._mouseToSvg(e);
          this._openNewNodePopup(pt);
        }
      });

      // Background rect for clicking through any "empty" area
      const bg = svg('rect', { x: 0, y: 0, width: 1000, height: 600, class: 'er-bg', fill: '#ffffff' });
      this.svg.insertBefore(bg, this.edgeLayer);

      // Drag state
      this._drag = null;
      window.addEventListener('mousemove', e => this._onMouseMove(e));
      window.addEventListener('mouseup',   e => this._onMouseUp(e));
    }

    _hint(msg) { this.hint.textContent = msg; }
    _resetHint() { this.hint.textContent = 'Click canvas → new node. Click a node → edit. Drag a node → move. Use "Connect…" in the edit popup to draw an edge.'; }

    _toggleGrid() {
      this.svg.classList.toggle('show-grid');
    }
    _resetView() { /* viewBox fixed for now */ }
    _clearAll() {
      if (this.readOnly) return;
      if (this.state.nodes.length === 0 && this.state.edges.length === 0) return;
      if (!confirm('Clear the entire diagram?')) return;
      this.state = { nodes: [], edges: [] };
      this._closePopups();
      this.render();
    }

    _mouseToSvg(e) {
      const pt = this.svg.createSVGPoint();
      pt.x = e.clientX; pt.y = e.clientY;
      const cursor = pt.matrixTransform(this.svg.getScreenCTM().inverse());
      return { x: cursor.x, y: cursor.y };
    }

    _onMouseMove(e) {
      if (!this._drag) return;
      const pt = this._mouseToSvg(e);
      const d = this._drag;
      if (!d.started && (Math.abs(pt.x - d.startX) > 3 || Math.abs(pt.y - d.startY) > 3)) {
        d.started = true;
        this._closePopups();
      }
      if (d.started) {
        const n = this.state.nodes.find(n => n.id === d.id);
        if (n) {
          n.x = d.origX + (pt.x - d.startX);
          n.y = d.origY + (pt.y - d.startY);
          this._refreshNodePosition(n);
          this._refreshEdgesFor(n.id);
        }
      }
    }

    _onMouseUp(e) {
      if (!this._drag) return;
      const wasDrag = this._drag.started;
      const id = this._drag.id;
      this._drag = null;
      if (!wasDrag) {
        // A click — handle node click
        const node = this.state.nodes.find(n => n.id === id);
        if (node) this._onNodeClick(node);
      }
    }

    _onNodeMouseDown(e, node) {
      if (this.readOnly) return;
      if (e.button !== 0) return;
      // If in connect mode, completing an edge:
      if (this.connectFromId && this.connectFromId !== node.id) {
        this._createEdge(this.connectFromId, node.id);
        this.connectFromId = null;
        this._resetHint();
        e.stopPropagation();
        return;
      }
      e.stopPropagation();
      e.preventDefault();
      const pt = this._mouseToSvg(e);
      this._drag = {
        id: node.id, started: false,
        startX: pt.x, startY: pt.y,
        origX: node.x, origY: node.y
      };
    }

    _onNodeClick(node) {
      if (this.readOnly) return;
      this._closePopups();
      this.selectedNodeId = node.id;
      this._openEditNodePopup(node);
    }

    // ---------- New-node popup ----------
    _openNewNodePopup(pt) {
      this._closePopups();
      const screen = this._svgToScreen(pt);
      const pop = el('div', { class: 'er-popup new-node' });
      pop.style.left = screen.x + 'px';
      pop.style.top = screen.y + 'px';
      const mk = (type, label, cls) => el('button', { class: 'er-typebtn ' + cls, onclick: () => { this._createNode(type, pt); this._closePopups(); } }, [label]);
      pop.appendChild(mk('entity', 'Entity', 'entity-btn'));
      pop.appendChild(mk('attribute', 'Attribute', 'attribute-btn'));
      pop.appendChild(mk('relationship', 'Relation', 'relationship-btn'));
      pop.appendChild(mk('isA', 'isA', 'isa-btn'));
      this.popupHost.appendChild(pop);
    }

    // ---------- Edit-node popup ----------
    _openEditNodePopup(node) {
      const screen = this._svgToScreen({ x: node.x, y: node.y - NODE_DEFAULTS[node.type].h / 2 - 12 });
      const pop = el('div', { class: 'er-popup edit-node' });
      pop.style.left = screen.x + 'px';
      pop.style.top = screen.y + 'px';

      const nameField = el('input', { type: 'text', class: 'er-name', value: node.label || '', placeholder: 'Name' });
      nameField.addEventListener('input', () => {
        node.label = nameField.value;
        this._refreshNode(node);
      });
      pop.appendChild(el('div', { class: 'er-popup-row' }, [
        el('label', { class: 'er-popup-label' }, ['Name']), nameField
      ]));

      // Modifier toggles
      const modRow = el('div', { class: 'er-modifiers' });
      const modDefs = modifiersFor(node.type);
      for (const m of modDefs) {
        const id = uid('chk');
        const chk = el('input', { type: 'checkbox', id });
        if ((node.modifiers || {})[m.key]) chk.checked = true;
        chk.addEventListener('change', () => {
          node.modifiers = node.modifiers || {};
          node.modifiers[m.key] = chk.checked;
          this._refreshNode(node);
        });
        modRow.appendChild(el('label', { for: id, class: 'er-mod' }, [chk, ' ' + m.label]));
      }
      if (modDefs.length) pop.appendChild(modRow);

      const btns = el('div', { class: 'er-popup-btns' });
      btns.appendChild(el('button', { class: 'er-btn primary', onclick: () => { this.connectFromId = node.id; this._closePopups(); this._hint('Connect mode: click another node to create an edge.'); } }, ['Connect…']));
      btns.appendChild(el('button', { class: 'er-btn danger', onclick: () => { this._deleteNode(node.id); this._closePopups(); } }, ['Delete']));
      btns.appendChild(el('button', { class: 'er-btn', onclick: () => this._closePopups() }, ['Close']));
      pop.appendChild(btns);

      this.popupHost.appendChild(pop);
    }

    // ---------- Edit-edge popup ----------
    _openEditEdgePopup(edge, x, y) {
      this._closePopups();
      const screen = this._svgToScreen({ x, y });
      const pop = el('div', { class: 'er-popup edit-edge' });
      pop.style.left = screen.x + 'px';
      pop.style.top = screen.y + 'px';

      const select = el('select', { class: 'er-card' });
      const cards = ['', '1', '0..1', '0..*', '1..*'];
      for (const c of cards) {
        const opt = el('option', { value: c }, [c || '(no cardinality)']);
        if (edge.cardinality === c || (!edge.cardinality && c === '')) opt.selected = true;
        select.appendChild(opt);
      }
      select.addEventListener('change', () => { edge.cardinality = select.value; this._refreshEdge(edge); });

      pop.appendChild(el('div', { class: 'er-popup-row' }, [
        el('label', { class: 'er-popup-label' }, ['Cardinality']), select
      ]));

      // "Identifying" toggle on edge (e.g., weak entity ↔ identifying relationship)
      const chk = el('input', { type: 'checkbox' });
      chk.checked = !!edge.identifying;
      chk.addEventListener('change', () => { edge.identifying = chk.checked; this._refreshEdge(edge); });
      pop.appendChild(el('label', { class: 'er-mod' }, [chk, ' Identifying (double line)']));

      const btns = el('div', { class: 'er-popup-btns' });
      btns.appendChild(el('button', { class: 'er-btn danger', onclick: () => { this._deleteEdge(edge.id); this._closePopups(); } }, ['Delete']));
      btns.appendChild(el('button', { class: 'er-btn', onclick: () => this._closePopups() }, ['Close']));
      pop.appendChild(btns);

      this.popupHost.appendChild(pop);
    }

    _closePopups() {
      while (this.popupHost.firstChild) this.popupHost.removeChild(this.popupHost.firstChild);
      this.selectedNodeId = null;
      this.selectedEdgeId = null;
    }

    _svgToScreen(pt) {
      const ctm = this.svg.getScreenCTM();
      const wrapRect = this.container.getBoundingClientRect();
      const p = this.svg.createSVGPoint();
      p.x = pt.x; p.y = pt.y;
      const screen = p.matrixTransform(ctm);
      return { x: screen.x - wrapRect.left, y: screen.y - wrapRect.top };
    }

    // ---------- State mutators ----------
    _createNode(type, pt) {
      const def = NODE_DEFAULTS[type];
      const node = {
        id: uid('n'),
        type,
        x: Math.round(pt.x),
        y: Math.round(pt.y),
        label: def.label,
        modifiers: {}
      };
      this.state.nodes.push(node);
      this._renderNode(node);
    }

    _deleteNode(id) {
      this.state.nodes = this.state.nodes.filter(n => n.id !== id);
      this.state.edges = this.state.edges.filter(e => e.from !== id && e.to !== id);
      this.render();
    }

    _createEdge(fromId, toId) {
      if (this.state.edges.find(e => (e.from === fromId && e.to === toId) || (e.from === toId && e.to === fromId))) return;
      const edge = { id: uid('e'), from: fromId, to: toId, cardinality: '', identifying: false };
      this.state.edges.push(edge);
      this._renderEdge(edge);
    }

    _deleteEdge(id) {
      this.state.edges = this.state.edges.filter(e => e.id !== id);
      this.render();
    }

    // ---------- Rendering ----------
    render() {
      while (this.nodeLayer.firstChild) this.nodeLayer.removeChild(this.nodeLayer.firstChild);
      while (this.edgeLayer.firstChild) this.edgeLayer.removeChild(this.edgeLayer.firstChild);
      for (const e of this.state.edges) this._renderEdge(e);
      for (const n of this.state.nodes) this._renderNode(n);
    }

    _refreshNode(node) {
      const existing = this.nodeLayer.querySelector('[data-node-id="' + node.id + '"]');
      if (existing) existing.remove();
      this._renderNode(node);
    }

    _refreshNodePosition(node) {
      const g = this.nodeLayer.querySelector('[data-node-id="' + node.id + '"]');
      if (g) g.setAttribute('transform', 'translate(' + node.x + ',' + node.y + ')');
    }

    _refreshEdgesFor(nodeId) {
      for (const e of this.state.edges) {
        if (e.from === nodeId || e.to === nodeId) this._refreshEdge(e);
      }
    }

    _refreshEdge(edge) {
      const existing = this.edgeLayer.querySelector('[data-edge-id="' + edge.id + '"]');
      if (existing) existing.remove();
      this._renderEdge(edge);
    }

    _renderNode(node) {
      const g = svg('g', { class: 'er-node ' + node.type, 'data-node-id': node.id, transform: 'translate(' + node.x + ',' + node.y + ')', tabindex: 0 });
      const mods = node.modifiers || {};

      if (node.type === 'entity') {
        const w = NODE_DEFAULTS.entity.w, h = NODE_DEFAULTS.entity.h;
        if (mods.weak) {
          g.appendChild(svg('rect', { class: 'shape', x: -w/2, y: -h/2, width: w, height: h, rx: 4, ry: 4 }));
          g.appendChild(svg('rect', { class: 'shape inner', x: -(w-8)/2, y: -(h-8)/2, width: w-8, height: h-8, rx: 3, ry: 3 }));
        } else {
          g.appendChild(svg('rect', { class: 'shape', x: -w/2, y: -h/2, width: w, height: h, rx: 4, ry: 4 }));
        }
        g.appendChild(this._svgLabel(node.label, 0, 4));
      }
      else if (node.type === 'attribute') {
        const w = NODE_DEFAULTS.attribute.w, h = NODE_DEFAULTS.attribute.h;
        if (mods.multiValue) {
          g.appendChild(svg('ellipse', { class: 'shape', cx: 0, cy: 0, rx: w/2, ry: h/2 }));
          g.appendChild(svg('ellipse', { class: 'shape inner', cx: 0, cy: 0, rx: w/2 - 5, ry: h/2 - 4 }));
        } else if (mods.derived) {
          g.appendChild(svg('ellipse', { class: 'shape derived', cx: 0, cy: 0, rx: w/2, ry: h/2 }));
        } else {
          g.appendChild(svg('ellipse', { class: 'shape', cx: 0, cy: 0, rx: w/2, ry: h/2 }));
        }
        const labelCls = 'lbl' + (mods.key ? ' key' : '') + (mods.discriminator ? ' discriminator' : '');
        const t = this._svgLabel(node.label, 0, 4);
        t.setAttribute('class', labelCls);
        g.appendChild(t);
      }
      else if (node.type === 'relationship') {
        const w = NODE_DEFAULTS.relationship.w, h = NODE_DEFAULTS.relationship.h;
        const pts = `0,${-h/2} ${w/2},0 0,${h/2} ${-w/2},0`;
        if (mods.identifying) {
          g.appendChild(svg('polygon', { class: 'shape', points: pts }));
          const w2 = w - 14, h2 = h - 10;
          const pts2 = `0,${-h2/2} ${w2/2},0 0,${h2/2} ${-w2/2},0`;
          g.appendChild(svg('polygon', { class: 'shape inner', points: pts2 }));
        } else {
          g.appendChild(svg('polygon', { class: 'shape', points: pts }));
        }
        if (mods.aggregation) {
          g.appendChild(svg('rect', { class: 'agg-box', x: -w/2 - 8, y: -h/2 - 8, width: w + 16, height: h + 16, rx: 4 }));
        }
        g.appendChild(this._svgLabel(node.label, 0, 4));
      }
      else if (node.type === 'isA') {
        const w = NODE_DEFAULTS.isA.w, h = NODE_DEFAULTS.isA.h;
        const pts = `0,${-h/2} ${w/2},${h/2} ${-w/2},${h/2}`;
        g.appendChild(svg('polygon', { class: 'shape', points: pts }));
        g.appendChild(this._svgLabel('isA', 0, h/4));
        const tags = [];
        if (mods.disjoint) tags.push('disjoint');
        if (mods.total) tags.push('total');
        if (tags.length) {
          const t = this._svgLabel(tags.join(' · '), 0, h/2 + 12);
          t.setAttribute('class', 'lbl tag');
          g.appendChild(t);
        }
      }

      // interactions
      g.addEventListener('mousedown', e => this._onNodeMouseDown(e, node));
      g.addEventListener('click', e => { e.stopPropagation(); }); // mouse-up handles click logic
      this.nodeLayer.appendChild(g);
    }

    _svgLabel(text, x, y) {
      const t = svg('text', { class: 'lbl', x, y, 'text-anchor': 'middle' });
      t.textContent = text || '';
      return t;
    }

    _renderEdge(edge) {
      const a = this.state.nodes.find(n => n.id === edge.from);
      const b = this.state.nodes.find(n => n.id === edge.to);
      if (!a || !b) return;

      const g = svg('g', { class: 'er-edge', 'data-edge-id': edge.id });
      const stroke = edge.identifying ? 'identifying' : '';
      const line = svg('line', {
        x1: a.x, y1: a.y, x2: b.x, y2: b.y,
        class: 'edge-line ' + stroke
      });
      g.appendChild(line);
      if (edge.identifying) {
        // Draw a parallel offset line for the double-line look
        const dx = b.x - a.x, dy = b.y - a.y;
        const len = Math.hypot(dx, dy) || 1;
        const ox = -dy / len * 3, oy = dx / len * 3;
        const line2 = svg('line', {
          x1: a.x + ox, y1: a.y + oy, x2: b.x + ox, y2: b.y + oy,
          class: 'edge-line identifying offset'
        });
        g.appendChild(line2);
      }

      if (edge.cardinality) {
        const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
        const pad = 4;
        const text = edge.cardinality;
        const lbl = svg('g', { class: 'card-lbl', transform: `translate(${mx}, ${my})` });
        const bg = svg('rect', { x: -16, y: -9, width: 32, height: 18, rx: 9 });
        const t = svg('text', { x: 0, y: 4, 'text-anchor': 'middle' });
        t.textContent = text;
        lbl.appendChild(bg); lbl.appendChild(t);
        g.appendChild(lbl);
      }

      // Click for edge popup (only on the visible line / label, not whole bounding box)
      const hit = svg('line', { x1: a.x, y1: a.y, x2: b.x, y2: b.y, class: 'edge-hit' });
      hit.addEventListener('click', e => {
        e.stopPropagation();
        if (this.readOnly) return;
        const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
        this._openEditEdgePopup(edge, mx, my);
      });
      g.appendChild(hit);

      this.edgeLayer.appendChild(g);
    }
  }

  function modifiersFor(type) {
    if (type === 'entity') return [{ key: 'weak', label: 'Weak entity (double border)' }];
    if (type === 'attribute') return [
      { key: 'key', label: 'Key (underlined)' },
      { key: 'multiValue', label: 'Multi-value (double oval)' },
      { key: 'derived', label: 'Derived (dashed oval)' },
      { key: 'discriminator', label: 'Discriminator (dashed underline)' }
    ];
    if (type === 'relationship') return [
      { key: 'identifying', label: 'Identifying (double diamond)' },
      { key: 'aggregation', label: 'Aggregation (boxed)' }
    ];
    if (type === 'isA') return [
      { key: 'disjoint', label: 'Disjoint' },
      { key: 'total', label: 'Total (full participation)' }
    ];
    return [];
  }

  // ---------- Rubric matcher ----------
  // Given a state and a rubric match descriptor, return true if the diagram contains a node matching it.
  function nameMatches(target, candidate) {
    if (!target || !candidate) return false;
    const norm = s => String(s || '').toLowerCase().replace(/[\s_\-]+/g, '').replace(/s$/, '');
    const t = norm(target), c = norm(candidate);
    if (!t || !c) return false;
    return t === c || t.includes(c) || c.includes(t);
  }

  function rubricMatches(state, match) {
    if (!match || !match.type) return false;
    if (match.type === 'entity') {
      const ent = state.nodes.find(n => n.type === 'entity' && nameMatches(n.label, match.name));
      if (!ent) return false;
      if (match.weak && !(ent.modifiers && ent.modifiers.weak)) return false;
      if (match.keyAttribute) {
        const linked = neighborAttributes(state, ent.id);
        if (!linked.some(a => nameMatches(a.label, match.keyAttribute) && (a.modifiers || {}).key)) return false;
      }
      return true;
    }
    if (match.type === 'attribute') {
      const attrs = state.nodes.filter(n => n.type === 'attribute' && nameMatches(n.label, match.name));
      for (const a of attrs) {
        if (match.key && !(a.modifiers || {}).key) continue;
        if (match.multiValue && !(a.modifiers || {}).multiValue) continue;
        if (match.derived && !(a.modifiers || {}).derived) continue;
        if (match.entity) {
          const linkedEntities = neighborsOfType(state, a.id, 'entity');
          if (!linkedEntities.some(e => nameMatches(e.label, match.entity))) continue;
        }
        return true;
      }
      return false;
    }
    if (match.type === 'relationship') {
      const rels = state.nodes.filter(n => n.type === 'relationship' && nameMatches(n.label, match.name));
      for (const r of rels) {
        if (match.identifying && !((r.modifiers || {}).identifying || state.edges.some(e => (e.from === r.id || e.to === r.id) && e.identifying))) continue;
        if (Array.isArray(match.connects) && match.connects.length) {
          const linked = neighborsOfType(state, r.id, 'entity');
          const ok = match.connects.every(name => linked.some(e => nameMatches(e.label, name)));
          if (!ok) continue;
        }
        return true;
      }
      return false;
    }
    if (match.type === 'isA') {
      const isaNodes = state.nodes.filter(n => n.type === 'isA');
      for (const i of isaNodes) {
        const linked = neighborsOfType(state, i.id, 'entity');
        if (match.super && !linked.some(e => nameMatches(e.label, match.super))) continue;
        if (Array.isArray(match.subs) && match.subs.length) {
          const ok = match.subs.every(name => linked.some(e => nameMatches(e.label, name)));
          if (!ok) continue;
        }
        return true;
      }
      return false;
    }
    return false;
  }

  function neighborAttributes(state, nodeId) {
    return neighborsOfType(state, nodeId, 'attribute');
  }
  function neighborsOfType(state, nodeId, type) {
    const ids = new Set();
    for (const e of state.edges) {
      if (e.from === nodeId) ids.add(e.to);
      if (e.to === nodeId) ids.add(e.from);
    }
    return state.nodes.filter(n => ids.has(n.id) && n.type === type);
  }

  window.ErEditor = ErEditor;
  window.ErRubric = { match: rubricMatches };
})();
