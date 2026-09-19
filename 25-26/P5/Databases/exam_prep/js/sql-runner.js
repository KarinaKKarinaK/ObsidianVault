/* In-browser SQL runner powered by sql.js (SQLite/WASM).
 *
 * Exposes window.SqlRunner with:
 *   - SqlRunner.ready()          → Promise that resolves when sql.js is loaded
 *   - SqlRunner.run(sql, datasetId) → { ok, rows, columns, error }
 *   - SqlRunner.compare(userSql, modelSql, datasetId) → { match, userResult, modelResult, error }
 *
 * Datasets come from window.__SQL_DATASETS (loaded inline before this file).
 */
(function () {
  let SQL = null;            // sql.js module object
  let initPromise = null;    // resolves to SQL.Database constructor

  function decodeBase64ToBytes(b64) {
    const bin = atob(b64);
    const len = bin.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) bytes[i] = bin.charCodeAt(i);
    return bytes;
  }

  function ready() {
    if (initPromise) return initPromise;
    if (typeof initSqlJs !== 'function') {
      return Promise.reject(new Error('sql.js loader (initSqlJs) not present. Make sure vendor/sqljs/sql-wasm.js is loaded before js/sql-runner.js.'));
    }

    const opts = {};
    if (typeof window.__SQL_WASM_BINARY_B64 === 'string') {
      // Inline WASM — works under file:// because no fetch is involved.
      try {
        opts.wasmBinary = decodeBase64ToBytes(window.__SQL_WASM_BINARY_B64);
      } catch (e) {
        return Promise.reject(new Error('Failed to decode inline WASM: ' + e.message));
      }
    } else {
      // Fallback: let sql.js fetch the .wasm file. Only works under http(s)://.
      opts.locateFile = file => 'vendor/sqljs/' + file;
    }

    initPromise = initSqlJs(opts).then(s => { SQL = s; return s; }, err => {
      // Reset so a future call can retry.
      initPromise = null;
      throw err;
    });
    return initPromise;
  }

  function buildDb(datasetId) {
    if (!datasetId) throw new Error('No datasetId provided');
    const all = (window.__SQL_DATASETS) || {};
    const ds = all[datasetId];
    if (!ds) throw new Error('Unknown dataset: ' + datasetId);
    const db = new SQL.Database();
    db.run('PRAGMA foreign_keys = ON;');
    for (const stmt of (ds.schema || [])) db.run(stmt);
    for (const stmt of (ds.data   || [])) db.run(stmt);
    return db;
  }

  function execAll(db, sql) {
    // sql.js exec() returns an array of result objects (one per statement that returned rows).
    const results = db.exec(sql);
    if (!results || !results.length) return { columns: [], rows: [] };
    // Use the last result-bearing statement (queries are typically a single SELECT)
    const last = results[results.length - 1];
    return { columns: last.columns || [], rows: (last.values || []).map(r => r.slice()) };
  }

  function runStandalone(sql, datasetId) {
    return ready().then(() => {
      const db = buildDb(datasetId);
      try {
        const out = execAll(db, sql);
        return { ok: true, columns: out.columns, rows: out.rows };
      } catch (e) {
        return { ok: false, error: String(e.message || e) };
      } finally {
        try { db.close(); } catch (e) {}
      }
    }).catch(err => ({ ok: false, error: String(err.message || err) }));
  }

  // Order-insensitive comparison of result rows.
  // - Trim string cells.
  // - Treat null and '' as equal (some users wrap nulls in quotes).
  // - Columns: number must match. Order matters less for SELECT *, but for projection queries the order should match the model.
  //   We do an order-insensitive column comparison: as long as the columns of the same VALUES are present.
  function compareResults(a, b) {
    if (!a || !b) return { match: false, reason: 'missing result' };
    if (a.columns.length !== b.columns.length) {
      return { match: false, reason: 'Different number of columns (yours: ' + a.columns.length + ', model: ' + b.columns.length + ')' };
    }
    if (a.rows.length !== b.rows.length) {
      return { match: false, reason: 'Different number of rows (yours: ' + a.rows.length + ', model: ' + b.rows.length + ')' };
    }
    // Build canonical row tuples (sorted across rows, since order shouldn't matter without ORDER BY)
    const sig = rows => rows.map(r => JSON.stringify(r.map(canon))).sort().join('|');
    if (sig(a.rows) !== sig(b.rows)) {
      return { match: false, reason: 'Result rows differ from the model' };
    }
    return { match: true };
  }
  function canon(v) {
    if (v === null || v === undefined) return null;
    if (typeof v === 'number') return v;
    return String(v).trim().toLowerCase();
  }

  function compare(userSql, modelSql, datasetId) {
    return ready().then(() => {
      let modelOut = null, userOut = null;
      // Fresh DB for the model query
      const dbA = buildDb(datasetId);
      try { modelOut = execAll(dbA, modelSql); }
      catch (e) {
        try { dbA.close(); } catch (_) {}
        return { match: false, error: 'Model query failed: ' + e.message };
      }
      try { dbA.close(); } catch (e) {}
      // Fresh DB for the user query (avoid any state pollution)
      const dbB = buildDb(datasetId);
      try { userOut = execAll(dbB, userSql); }
      catch (e) {
        try { dbB.close(); } catch (_) {}
        return { match: false, error: 'Your query failed: ' + e.message, modelResult: modelOut };
      }
      try { dbB.close(); } catch (e) {}
      const cmp = compareResults(userOut, modelOut);
      return { match: cmp.match, reason: cmp.reason, userResult: userOut, modelResult: modelOut };
    }).catch(err => ({ match: false, error: String(err.message || err) }));
  }

  function datasetSchemaPreview(datasetId) {
    const all = (window.__SQL_DATASETS) || {};
    const ds = all[datasetId];
    if (!ds) return null;
    return {
      name: ds.name,
      schema: ds.schema || [],
      data: ds.data || []
    };
  }

  window.SqlRunner = { ready, run: runStandalone, compare, datasetSchemaPreview };
})();
