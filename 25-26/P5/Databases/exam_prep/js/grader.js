/* Grading logic — one entry per question type.
 * Each grader returns { correct: boolean, summary: string, model: string }.
 */
(function () {
  function normalizeSql(s) {
    if (!s) return '';
    return s
      .toLowerCase()
      .replace(/\/\*[\s\S]*?\*\//g, ' ')
      .replace(/--[^\n]*/g, ' ')
      .replace(/[;\s]+/g, ' ')
      .replace(/\s*([(),=<>+\-*/])\s*/g, '$1')
      .replace(/`|"/g, "'")
      .trim();
  }
  function normalizeLine(s) {
    return (s || '').toLowerCase().replace(/\s+/g, '').trim();
  }
  function attrSet(line) {
    // "A, B" or "A,B" -> sorted normalized set string "a,b"
    return (line || '')
      .toLowerCase()
      .replace(/[{}()\s]/g, '')
      .split(',')
      .filter(Boolean)
      .sort()
      .join(',');
  }
  function setOfSets(text) {
    if (!text) return new Set();
    const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    return new Set(lines.map(attrSet).filter(Boolean));
  }
  function setEquals(a, b) {
    if (a.size !== b.size) return false;
    for (const v of a) if (!b.has(v)) return false;
    return true;
  }

  function grade(question, userAnswer) {
    const a = question.answer || {};
    switch (question.type) {
      case 'sql':       return gradeSql(question, userAnswer, a);
      case 'short_text':return gradeShortText(question, userAnswer, a);
      case 'text_lines':return gradeTextLines(question, userAnswer, a);
      case 'multi_line':return gradeMultiLine(question, userAnswer, a);
      case 'radio':     return gradeRadio(question, userAnswer, a);
      case 'checkbox':  return gradeCheckbox(question, userAnswer, a);
      default:
        return { correct: false, summary: 'Unknown question type.', model: '' };
    }
  }

  function gradeSql(q, user, a) {
    if (!user || !user.trim()) return { correct: false, summary: 'No answer submitted.', model: a.canonical || '' };
    const u = normalizeSql(user);
    const candidates = [a.canonical, ...(a.acceptedAnswers || [])].filter(Boolean).map(normalizeSql);
    if (candidates.some(c => c === u)) {
      return { correct: true, summary: 'Correct — matches the model answer.', model: a.canonical || '' };
    }
    // Loose check: required patterns must all appear, forbidden patterns must not.
    const reqs = (a.requiredPatterns || []).map(p => new RegExp(p, 'i'));
    const forb = (a.forbiddenPatterns || []).map(p => new RegExp(p, 'i'));
    const missing = reqs.filter(r => !r.test(user));
    const hasForbidden = forb.some(r => r.test(user));
    if (missing.length === 0 && !hasForbidden && reqs.length > 0) {
      return {
        correct: true,
        summary: 'Looks correct — your query has all the required structure. Compare with the model below for style.',
        model: a.canonical || ''
      };
    }
    let summary = 'Not quite. ';
    if (missing.length) summary += 'Missing key element(s): ' + missing.map(r => r.source).join(', ') + '. ';
    if (hasForbidden) summary += 'Your query uses something that should not appear. ';
    return { correct: false, summary: summary.trim(), model: a.canonical || '' };
  }

  function gradeShortText(q, user, a) {
    if (!user || !user.trim()) return { correct: false, summary: 'No answer submitted.', model: a.canonical || '' };
    const u = normalizeLine(user);
    const candidates = [a.canonical, ...(a.acceptedAnswers || [])].filter(Boolean).map(normalizeLine);
    if (candidates.some(c => c === u)) return { correct: true, summary: 'Correct.', model: a.canonical || '' };
    return { correct: false, summary: 'Not quite — see the model answer.', model: a.canonical || '' };
  }

  function gradeTextLines(q, user, a) {
    const expected = new Set((a.lines || []).map(attrSet));
    const actual = setOfSets(user);
    if (setEquals(expected, actual)) return { correct: true, summary: 'Correct — all required answers listed and no extras.', model: (a.lines || []).join('\n') };
    const missing = [...expected].filter(x => !actual.has(x));
    const extra   = [...actual].filter(x => !expected.has(x));
    let summary = 'Not quite. ';
    if (missing.length) summary += 'Missing: ' + missing.map(m => '{' + m + '}').join(', ') + '. ';
    if (extra.length)   summary += 'Should not be in the answer: ' + extra.map(m => '{' + m + '}').join(', ') + '. ';
    return { correct: false, summary: summary.trim(), model: (a.lines || []).join('\n') };
  }

  function gradeMultiLine(q, user, a) {
    const want = (a.orderedLines || []).map(normalizeLine).filter(Boolean);
    const got  = (user || '').split(/\r?\n/).map(normalizeLine).filter(Boolean);
    const same = want.length === got.length && want.every((v, i) => v === got[i]);
    if (same) return { correct: true, summary: 'Correct — steps match in order.', model: (a.orderedLines || []).join('\n') };
    return { correct: false, summary: 'Not quite — the steps or their order do not match the model.', model: (a.orderedLines || []).join('\n') };
  }

  function gradeRadio(q, user, a) {
    if (user === null || user === undefined || user === '') return { correct: false, summary: 'No option selected.', model: q.options[a.value] };
    if (Number(user) === Number(a.value)) return { correct: true, summary: 'Correct.', model: q.options[a.value] };
    return { correct: false, summary: 'Not the right option.', model: q.options[a.value] };
  }

  function gradeCheckbox(q, user, a) {
    const want = new Set((a.values || []).map(Number));
    const got = new Set((user || []).map(Number));
    if (want.size === got.size && [...want].every(v => got.has(v))) {
      return { correct: true, summary: 'Correct — exact set selected.', model: (a.values || []).map(i => q.options[i]).join(' / ') };
    }
    const missing = [...want].filter(v => !got.has(v));
    const extra   = [...got].filter(v => !want.has(v));
    let summary = 'Not quite. ';
    if (missing.length) summary += 'Missing: ' + missing.map(i => '"' + q.options[i] + '"').join(', ') + '. ';
    if (extra.length)   summary += 'Should not be selected: ' + extra.map(i => '"' + q.options[i] + '"').join(', ') + '. ';
    return { correct: false, summary: summary.trim(), model: (a.values || []).map(i => q.options[i]).join(' / ') };
  }

  // Async grader — for SQL questions with a datasetId, run user + canonical against sql.js and compare result sets.
  // Falls back to the sync grader for everything else.
  function gradeAsync(question, userAnswer) {
    if (question.type !== 'sql') return Promise.resolve(grade(question, userAnswer));
    if (!question.datasetId || question.runnable === false || typeof SqlRunner === 'undefined') {
      return Promise.resolve(grade(question, userAnswer));
    }
    const canonical = (question.answer && question.answer.canonical) || '';
    if (!canonical || !userAnswer || !String(userAnswer).trim()) {
      return Promise.resolve(grade(question, userAnswer));
    }
    return SqlRunner.compare(userAnswer, canonical, question.datasetId).then(cmp => {
      if (cmp.error) {
        // Execution error — fall back to text grader so the user still gets some feedback,
        // but surface the error for clarity.
        const textResult = grade(question, userAnswer);
        return {
          correct: false,
          summary: cmp.error + (textResult.summary ? '  ·  Text-grader: ' + textResult.summary : ''),
          model: canonical,
          userResult: cmp.userResult,
          modelResult: cmp.modelResult
        };
      }
      if (cmp.match) {
        return {
          correct: true,
          summary: 'Correct — your query produces the same result as the model.',
          model: canonical,
          userResult: cmp.userResult,
          modelResult: cmp.modelResult
        };
      }
      return {
        correct: false,
        summary: 'Result differs from the model. ' + (cmp.reason || ''),
        model: canonical,
        userResult: cmp.userResult,
        modelResult: cmp.modelResult
      };
    });
  }

  window.Grader = { grade, gradeAsync, normalizeSql };
})();
