/* Loads the question bank and exposes lookups. */
(function () {
  const DataStore = {
    bank: null,
    _loading: null,
    load() {
      if (this.bank) return Promise.resolve(this.bank);
      // Prefer the inline bank (works from file:// without a server).
      if (window.__QUESTIONS_BANK && Array.isArray(window.__QUESTIONS_BANK.topics)) {
        this.bank = window.__QUESTIONS_BANK;
        return Promise.resolve(this.bank);
      }
      if (this._loading) return this._loading;
      this._loading = fetch('data/questions.json', { cache: 'no-store' })
        .then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
        .then(json => {
          if (!json || !Array.isArray(json.topics) || !Array.isArray(json.questions)) {
            throw new Error('Malformed question bank');
          }
          this.bank = json;
          return json;
        });
      return this._loading;
    },
    topic(id) { return this.bank.topics.find(t => t.id === id) || null; },
    questionsByTopic(id) { return this.bank.questions.filter(q => q.topicId === id); },
    countsByTopic() {
      const counts = {};
      for (const q of this.bank.questions) counts[q.topicId] = (counts[q.topicId] || 0) + 1;
      return counts;
    }
  };
  window.DataStore = DataStore;
})();
