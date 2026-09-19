#!/usr/bin/env node
/* Quick validator for data/questions.json — checks schema, topic coverage, per-topic counts. */
const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'data', 'questions.json');
const raw = fs.readFileSync(file, 'utf8');
let json;
try { json = JSON.parse(raw); }
catch (e) { console.error('Invalid JSON:', e.message); process.exit(2); }

const errors = [];
const warnings = [];

if (!Array.isArray(json.topics) || !Array.isArray(json.questions)) {
  errors.push('Top-level must have arrays "topics" and "questions"');
}

const topicIds = new Set((json.topics || []).map(t => t.id));
const VALID_TYPES = new Set(['sql', 'text_lines', 'multi_line', 'radio', 'checkbox', 'short_text']);
const counts = {};
const ids = new Set();

(json.questions || []).forEach((q, i) => {
  if (!q.id) errors.push(`Q[${i}] missing id`);
  if (ids.has(q.id)) errors.push(`Q[${i}] duplicate id: ${q.id}`);
  ids.add(q.id);
  if (!topicIds.has(q.topicId)) errors.push(`Q[${q.id || i}] unknown topicId: ${q.topicId}`);
  if (!VALID_TYPES.has(q.type)) errors.push(`Q[${q.id || i}] invalid type: ${q.type}`);
  if (!q.prompt || !q.prompt.trim()) errors.push(`Q[${q.id || i}] empty prompt`);
  if (!q.answer || typeof q.answer !== 'object') errors.push(`Q[${q.id || i}] missing answer`);
  const a = q.answer || {};
  if (q.type === 'sql' && !a.canonical) errors.push(`Q[${q.id}] sql needs answer.canonical`);
  if (q.type === 'short_text' && !a.canonical) errors.push(`Q[${q.id}] short_text needs answer.canonical`);
  if (q.type === 'text_lines' && !Array.isArray(a.lines)) errors.push(`Q[${q.id}] text_lines needs answer.lines`);
  if (q.type === 'multi_line' && !Array.isArray(a.orderedLines)) errors.push(`Q[${q.id}] multi_line needs answer.orderedLines`);
  if (q.type === 'radio') {
    if (!Array.isArray(q.options) || q.options.length < 2) errors.push(`Q[${q.id}] radio needs >=2 options`);
    if (typeof a.value !== 'number') errors.push(`Q[${q.id}] radio needs answer.value (index)`);
  }
  if (q.type === 'checkbox') {
    if (!Array.isArray(q.options) || q.options.length < 2) errors.push(`Q[${q.id}] checkbox needs >=2 options`);
    if (!Array.isArray(a.values)) errors.push(`Q[${q.id}] checkbox needs answer.values (array of indices)`);
  }
  counts[q.topicId] = (counts[q.topicId] || 0) + 1;
});

console.log('Total topics:', json.topics ? json.topics.length : 0);
console.log('Total questions:', json.questions ? json.questions.length : 0);
console.log('');
console.log('Per-topic counts:');
for (const t of (json.topics || [])) {
  const c = counts[t.id] || 0;
  const flag = c < 6 ? '  ⚠ below 6' : '';
  console.log(`  ${c.toString().padStart(3)} · ${t.name}${flag}`);
  if (c < 6) warnings.push(`Topic "${t.name}" only has ${c} questions (target 6+)`);
}
console.log('');
if (errors.length) {
  console.log('ERRORS (' + errors.length + '):');
  errors.slice(0, 20).forEach(e => console.log('  · ' + e));
  if (errors.length > 20) console.log('  ... and ' + (errors.length - 20) + ' more');
  process.exit(1);
}
if (warnings.length) {
  console.log('WARNINGS (' + warnings.length + '):');
  warnings.forEach(w => console.log('  · ' + w));
}
console.log('OK ✓ — schema valid');
