# Personal Trading System: Conceptual Design

**Owner:** Karina
**Platforms:** eToro (manual execution), Obsidian (knowledge + journal), Claude Cowork (synthesis), Python watcher on laptop (monitoring)
**Asset scope:** US + EU equities, gold spot, oil (future), crypto (cold wallet, future)
**Initial watchlist:** NBIS, SPIR, UAMY, CIFR, OKLO, INDI, GOLD
**Strategy:** swing trading, 1 to 3+ weeks typical holds
**Status:** design, pre-implementation

---

## 1. Philosophy

A signal agent is only as good as the rules you give it. We design the system so that signals are *look signals* not *act signals*. You bring judgment; the system compresses "what do I need to know right now" from 20 minutes to 30 seconds. Over time, as the trade journal accumulates evidence, rules sharpen and a real strategy emerges from data rather than vibes.

## 2. Topology

Three processes, one shared filesystem (the Obsidian vault).

1. **Obsidian vault** is the source of truth: knowledge, configs, state, signals, journal, reviews. Markdown + YAML + a couple of CSVs.
2. **Python watcher** (laptop daemon) runs on a 5 to 10 min loop during market hours. Reads config from the vault, polls prices and news, runs three signal engines (conditions, ML, sentiment), writes signal markdown to the vault. Dumb on purpose; no LLM calls in the hot path.
3. **Claude Cowork** is the synthesizer you invoke by chat. Reads the vault, pulls fresh data, handles rich thinking: pre-trade analysis, journaling, concept writing, research, reviews.

No LLM calls happen in the monitoring loop. Claude only activates when you open Cowork or a scheduled task fires.

## 3. Vault layout

```
Portfolio/
  00_Dashboard.md
  01_Concepts/
     Technical/
        Indicators/
        Patterns/
        Setups/
     Fundamental/
        Metrics/
        Valuation_Models/
     Macro/
     Psychology/
     Risk_Management/
  02_Watchlist/
     NBIS.md
     SPIR.md
     UAMY.md
     CIFR.md
     OKLO.md
     INDI.md
     GOLD.md
  03_Journal/
     2026/
        04_April/
           2026-04-17_NBIS_long.md
  04_Signals/
     Inbox/
     Archive/
     Config/
        alerts.yaml
        watchlist.yaml
        models.yaml
  05_Reviews/
     Weekly/
     Monthly/
     Quarterly/
  06_Research/
     Companies/
     Sectors/
     Themes/
  07_Daily/
     2026-04-17.md
  08_Playbooks/
  09_Meta/
     Portfolio_State.md
     Performance_Log.csv
     Equity_Curve.md
     model_performance.csv
  _Templates/
  _Attachments/
```

## 4. YAML schemas

### Trade (open)

```yaml
---
type: trade
status: open
ticker: NBIS
direction: long
entry_date: 2026-04-17
entry_price: 42.50
size_shares: 50
position_value_usd: 2125
stop_loss: 40.00
target_price: 48.00
risk_usd: 125
reward_target_usd: 275
risk_reward: 2.2
setup: [breakout, volume_surge]
thesis: AI compute demand, Q1 beat, above MA50 with volume
conviction: 7
time_frame_days: 14
tags: [small_cap, tech, ai]
linked_signals: [signal_2026-04-17T14-32_NBIS]
---
```

### Trade (closed, fields added to same file)

```yaml
exit_date: 2026-04-23
exit_price: 46.10
pnl_usd: 180
pnl_pct: 8.47
holding_days: 6
outcome: win
followed_plan: true
lessons:
  - held through day-three pullback per plan
  - missed adding at retest
emotions: [calm, mild_fomo]
```

### Watchlist ticker page

```yaml
---
type: ticker
symbol: NBIS
name: Nebius Group
exchange: NASDAQ
asset_class: equity
sector: Technology
industry: AI Cloud Infrastructure
currency: USD
avg_volume:
last_price:
last_updated:
current_stance: watching
zones:
  strong_support:
  support:
  pivot:
  resistance:
  strong_resistance:
key_dates:
  next_earnings:
  next_catalyst:
priority: high
tags: [ai_infra, small_cap]
---
```

### Signal

```yaml
---
type: signal
timestamp: 2026-04-17T14:32:00Z
ticker: NBIS
signal_class: condition | ml_price | sentiment | composite
rule_id: nbis_breakout_45
rule_description: price > 45 with volume > 1.5x 20d avg
direction: bullish
current_price: 45.12
confidence: 0.78
evidence:
  condition: triggered
  ml_1d_up_prob: 0.62
  ml_1w_up_prob: 0.58
  sentiment_7d: 0.31
  news_count_24h: 4
reviewed: false
action_taken: none
notes:
---
```

## 5. Watcher repo

```
stock-watcher/
  src/
    watcher.py
    fetchers/
      prices.py
      news.py
    engines/
      conditions.py
      ml_predict.py
      sentiment.py
      composite.py
    writers/
      signal_writer.py
      state_writer.py
    notifier/
      desktop.py
      slack.py
    utils/
      market_hours.py
      dedupe.py
  models/
    xgb_1d_v1.pkl
    lstm_1d_v1.pt
    finbert/
  scripts/
    train_xgboost.py
    train_lstm.py
    backtest_rule.py
    eval_models.py
  data/
    cache/
    state.json
  config/
    .env
    vault_path.txt
  requirements.txt
  README.md
```

### Loop per tick

1. Check if any relevant market is open. Sleep otherwise.
2. Batch pull prices for watchlist (yfinance).
3. Batch pull news (Finnhub free tier + RSS fallback).
4. Update caches.
5. Run conditions engine. Any new hits?
6. On slower cadence (30 min): refresh ML predictions.
7. On slower cadence (hourly): refresh sentiment.
8. Run composite logic: cross-engine agreement.
9. For each new signal, write markdown to Inbox, fire notification.
10. Update state.json with dedup keys and cooldowns.

Dedup is critical: a condition like `price > 45` stays true for hours. Fire once, cooldown until reset, then re-arm.

## 6. ML stack (three slots, swappable)

1. **Short horizon (1d)**: XGBoost classifier on technical features. Returns, RSI, MACD, volume ratio, MA distances, Bollinger position, ATR. Output: up-probability next day. Retrain monthly.
2. **Medium horizon (1w)**: small LSTM or Transformer on OHLCV sequences, 60d lookback, 5d forward. Direction probability next week.
3. **Sentiment**: FinBERT pretrained, inference-only. Rolling sentiment score on news 24h and 7d.

**Composite:** all three agree -> composite signal, high weight. Two agree -> lower weight. Disagree -> no signal, but state logged.

**Caveats kept visible:** small caps have limited history; thin news means frequent "neutral" sentiment; regimes drift so retraining matters. Every model has performance tracked in `09_Meta/model_performance.csv`.

## 7. Claude skills

Each skill is a defined role I play in Cowork.

- **Pre-trade Analyst**: pre-trade checklist, risk sizing, thesis articulation, drafts journal entry on commit.
- **Journalist**: converts natural language ("bought 50 NBIS at 42.50") into structured trade markdown, updates Portfolio_State.
- **Signal Reviewer**: reads Inbox, groups, flags composites and stale entries.
- **Researcher**: deep dives on a ticker, writes to 06_Research.
- **Concept Writer**: writes or updates concept notes, links examples from journal.
- **Daily Brief** (scheduled): overnight news summary, signals count, open positions, key events.
- **Weekly Reviewer** (scheduled, Sundays): win rate, avg W vs L, expectancy in R, per-setup performance, plan adherence, patterns.
- **Monthly Strategist** (scheduled, 1st of month): equity curve, drawdown, per-playbook perf, playbook update proposals.

## 8. Notifications

- Primary: signals as markdown files in `04_Signals/Inbox/`.
- Secondary: desktop notification on fire, one line, click opens Obsidian.
- Tertiary (optional): Slack DM to yourself via webhook.

## 9. Daily loop

- Morning pre-open (CET or ET): Daily Brief note auto-generated.
- Market hours: watcher ticks every 5 to 10 min; notifications fire on new signals; you enter (tell me, I log it) or pass (archive the signal).
- After close: check open positions, adjust stops if needed.
- Sunday night: Weekly Review note ready; 30 min of annotation, possible playbook updates.

## 10. Phased implementation

1. **Phase 1 - Skeleton:** vault layout, templates, schemas, watchlist pages, Journalist + Pre-trade Analyst skills. Immediately usable for journaling.
2. **Phase 2 - Conditions monitor:** Python watcher, prices + conditions only, desktop notifications, Inbox writes.
3. **Phase 3 - Sentiment:** news + FinBERT inference.
4. **Phase 4 - First ML model:** XGBoost 1d classifier + training pipeline + performance log.
5. **Phase 5 - Second ML + composite:** LSTM 1w, cross-engine agreement logic.
6. **Phase 6 - Scheduled routines:** Daily Brief, Weekly Review, Monthly Strategist.

Each phase is independently usable. No broken intermediates.

## 11. Laptop watcher notes

- macOS: `caffeinate -i` wrapper during market hours; `launchd` for autostart/restart.
- Windows: Task Scheduler + startup entry.
- Linux: systemd user service.
- Gap: laptop closed = watcher offline. Fine for swing trading. Phase 7 = migrate to 5 USD/month VPS if needed.

## 12. Free-tier data stack

- Prices: yfinance (~15 min delay on free).
- News: Finnhub free (60 req/min), RSS fallback (MarketWatch, Yahoo Finance per-ticker).
- Fundamentals: yfinance.
- Gold: yfinance `GC=F` (futures) and `GLD` (ETF proxy).
- EU stocks: yfinance with exchange suffix (e.g., `ASML.AS`).
- Crypto (future): CoinGecko free API.

## 13. Watchlist initial entries

- **NBIS** Nebius Group, NASDAQ, AI cloud infra, high priority.
- **SPIR** Spire Global, NYSE, space/satellite data, high priority.
- **UAMY** United States Antimony, NYSE American, critical minerals, high priority.
- **CIFR** Cipher Mining, NASDAQ, bitcoin mining, medium priority.
- **OKLO** Oklo Inc, NYSE, small modular nuclear, high priority.
- **INDI** indie Semiconductor, NASDAQ, automotive semi, medium priority.
- **GOLD** spot gold (USD) via eToro commodity; tracked in data via `GC=F` / `XAUUSD=X`.

## 14. Open questions to revisit later

- VPS migration trigger (Phase 7).
- Real-time data upgrade trigger (Polygon or Finnhub paid tier).
- Crypto cold wallet workflow (Phase 8): how do "safe savings" allocations get journaled? Probably a separate note type.
- Backtesting framework: where do we test ML models and rules against historical data? Likely `scripts/backtest_rule.py` + a results log in `09_Meta/`.
- Tax treatment tracking (EU resident considerations): capture enough metadata in trade schema to export for accountant.
