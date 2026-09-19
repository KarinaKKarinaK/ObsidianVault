/* Per-question progress persistence (localStorage).
 *
 * Each entry: { status: 'correct' | 'wrong', count, first, last }
 * 'correct' is sticky — once you get a question right, future wrong attempts don't
 * downgrade it. We still bump 'count' and 'last' so you can see re-attempts.
 */
(function () {
  const KEY = 'dbExamPrep.practice.v1';
  const LAST_EXAM_KEY = 'dbExamPrep.lastIsubmitExam.v1';

  function load() {
    try { const s = localStorage.getItem(KEY); return s ? JSON.parse(s) : {}; }
    catch (e) { return {}; }
  }
  function save(obj) {
    try { localStorage.setItem(KEY, JSON.stringify(obj)); }
    catch (e) { /* quota / private mode — ignore */ }
  }

  const Progress = {
    get(qid) { return load()[qid] || null; },
    all() { return load(); },

    record(qid, isCorrect) {
      const data = load();
      const prev = data[qid] || { count: 0, status: null, first: null };
      const status = prev.status === 'correct' ? 'correct' : (isCorrect ? 'correct' : 'wrong');
      data[qid] = {
        status,
        count: (prev.count || 0) + 1,
        first: prev.first || Date.now(),
        last: Date.now()
      };
      save(data);
      return data[qid];
    },

    clear(qid) { const data = load(); delete data[qid]; save(data); },

    clearMany(qids) {
      const data = load();
      for (const id of qids) delete data[id];
      save(data);
    },

    clearAll() { save({}); },

    statsByTopic(bank) {
      const data = load();
      const out = {};
      for (const t of bank.topics) out[t.id] = { total: 0, attempted: 0, correct: 0 };
      for (const q of bank.questions) {
        if (!out[q.topicId]) out[q.topicId] = { total: 0, attempted: 0, correct: 0 };
        out[q.topicId].total++;
        const p = data[q.id];
        if (p) {
          out[q.topicId].attempted++;
          if (p.status === 'correct') out[q.topicId].correct++;
        }
      }
      return out;
    },

    overall(bank) {
      const data = load();
      let attempted = 0, correct = 0;
      for (const q of bank.questions) {
        const p = data[q.id];
        if (!p) continue;
        attempted++;
        if (p.status === 'correct') correct++;
      }
      return { total: bank.questions.length, attempted, correct };
    },

    // Optional: last iSubmit-exam result
    saveLastIsubmit(result) {
      try { localStorage.setItem(LAST_EXAM_KEY, JSON.stringify(result)); } catch (e) {}
    },
    getLastIsubmit() {
      try { const s = localStorage.getItem(LAST_EXAM_KEY); return s ? JSON.parse(s) : null; }
      catch (e) { return null; }
    }
  };

  window.Progress = Progress;
})();
