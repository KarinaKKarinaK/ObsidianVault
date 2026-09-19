# 15-Minute Codex Demo: From a Messy Excel to an Interactive Data App

**Format:** live, fully inside the Codex desktop app (no CLI, no terminal)
**Build target:** an interactive web dashboard for a regional sales leader at a health-technology company
**Data:** `regional_health_orders.xlsx` (267 orders across 13 countries in Central/Eastern Europe + Central Asia)
**Star technique:** the prompt-refinement loop (describe, let the AI interrogate you, get a clean prompt back, run once)

---

## The use case (your framing, 60 seconds)

The persona: a VP responsible for a multi-country region (Poland, Czechia, Kazakhstan, Romania, and a dozen more). Every Monday they get the same thing the whole industry gets: a flat Excel export of the order book. Rows of deals, countries, product lines, values, win/loss status. To answer "where am I behind target and why," they pivot by hand or wait for an analyst.

The pitch in one line: "I am going to take that exact spreadsheet and, in one Codex session, turn it into a live dashboard the VP could actually open. No analyst, no BI license, one prompt done right."

That framing matters because it makes the demo about a believable business problem, not "look, AI makes a chart."

---

## Before you hit record (setup, not counted in the 15 min)

1. Install and open the **Codex desktop app** (macOS or Windows). Sign in with a ChatGPT plan that includes Codex.
2. Create an **empty folder** on your machine, e.g. `regional-dashboard/`, and drop `regional_health_orders.xlsx` inside it.
3. In the Codex app, **open that folder as your workspace.** Codex works against a real directory, so the app can read the Excel, write the app files, and run a preview.
4. Pick the model: use the strongest coding model your plan offers for the build, and keep the default for quick edits.
5. Do **one rehearsal run end to end** the day before. Live model output varies between runs, so you want to know roughly where it lands and have a fallback screenshot of the finished dashboard in case the room's network dies.

**Tip:** Codex's "computer use" feature is not available in the EEA, the UK, or Switzerland at launch, so if you are demoing from Amsterdam do not build the demo around it. You do not need it here. The in-app web preview, file reading, and code editing all work fine in the EU.

**Tip:** keep the Codex sidebar visible. It can preview the spreadsheet and, once built, the running web app, which is what makes this feel like one continuous workspace instead of tool-hopping.

---

## Minute-by-minute run sheet

| Time | Segment | What the audience sees |
|------|---------|------------------------|
| 0:00 to 1:30 | Frame the problem | You, the messy Excel open in the Codex sidebar |
| 1:30 to 5:30 | Prompt refinement loop | The AI asking you smart questions, then handing back a clean spec |
| 5:30 to 9:30 | First build run | Codex reads the Excel and scaffolds the whole app |
| 9:30 to 12:30 | Preview and iterate | Live dashboard, you point at something and ask for a change |
| 12:30 to 14:00 | One "wow" upgrade | Add a filter or an AI-written summary, optionally deploy |
| 14:00 to 15:00 | Recap the method | The reusable takeaways, not the specific app |

---

## Segment 1 (1:30 to 5:30): The prompt-refinement loop

This is the part people should screenshot. The mistake everyone makes is firing a one-line prompt and then fighting the output for 20 minutes. Instead you make the model do the requirements-gathering.

It is three moves.

### Move 1: Describe what you want, in plain language, in detail

Paste this (adapt the specifics to your taste, but keep it concrete):

```
I have an Excel file in this workspace called regional_health_orders.xlsx.
It is an order book for a medical-technology company's sales region.
Columns include: Order ID, Order Date, Quarter, Country, Sub-Region,
Account, Channel, Business Group, Product, Order Type, Units,
Order Value (EUR), Gross Margin %, and Status (Won / Pipeline / Lost).

I want you to build a single-page interactive web dashboard that reads this
data and helps a regional sales VP answer "where am I behind and why" at a
glance. It should run locally in a browser. I want real interactive charts,
filtering, and clean executive styling. I am going to present this live,
so it needs to look polished, not like a default template.
```

**Tip:** notice what this prompt does NOT do. It does not pick a chart library, a color scheme, or a layout. You are describing the *job to be done* and the *audience*, then letting the model propose the rest. That is deliberate.

### Move 2: Force the clarifying questions BEFORE any code

This single instruction is the whole trick. Paste it right after:

```
Before you write any code, ask me your clarifying questions: anything about
the metrics, the layout, the interactions, the tech stack, or edge cases in
the data that would change what you build. Ask everything you need so that
your first build is the one I actually want. Do not build yet.
```

Codex will come back with a numbered list. Expect questions like:
- Which KPIs go in the header cards (total order value, win rate, pipeline coverage, average margin)?
- Won-only revenue, or include pipeline weighted by stage?
- Which breakdowns matter most (country, business group, quarter trend)?
- Should it compare against the Quarterly Targets sheet for attainment?
- Plain HTML/JS with a CDN chart library, or a React build?
- How to handle the Lost deals: separate view, or a win-rate metric?

**Tip for the room:** read two or three of its questions out loud and say "this is the part I would have forgotten." That is the teaching moment. The model surfaces decisions you did not know you were making.

### Move 3: Answer, then ask for the refined prompt back

Answer the questions in one message. Keep it tight, for example:

```
1. Header cards: total order value, won revenue, win rate %, and open pipeline value.
2. Won revenue for the headline number; show pipeline separately.
3. Breakdowns: revenue by country (bar), revenue by business group (donut),
   quarterly trend (line), and a sortable table of top accounts.
4. Yes, compare won revenue vs the Quarterly Targets sheet and show attainment %.
5. Plain HTML + JS with a charting library from a CDN, so it opens with no build step.
6. Lost deals only feed the win-rate metric, do not show them as a category.
Styling: clean executive look, restrained palette, navy and a single accent.
```

Then the closing instruction, which is the second half of the trick:

```
Now write the full, refined build prompt as a single self-contained spec
that captures all of this. Show it to me before you build, so I can confirm
it is exactly what I want.
```

Codex returns one consolidated spec. You glance at it, say "perfect, build it," and now your first real run is working from a complete brief instead of a vague wish.

**Why this matters (say this out loud):** you just compressed three or four rounds of "no, not like that" into one structured exchange. The refined prompt is also reusable. Save it. Next quarter, new data, same prompt, same dashboard.

---

## Segment 2 (5:30 to 9:30): The build run

Tell Codex to go. It will:
1. Read the spreadsheet using its built-in spreadsheet skill (it can parse the xlsx directly, no manual export to CSV).
2. Write the app files into your workspace folder.
3. Wire the data in (either by reading the file or by emitting the rows as JSON it bakes into the page).

While it works, **narrate what is happening** instead of staring at a spinner:
- "It is reading the actual Excel, not a sample. Same file the VP gets."
- "It is making the layout and library choices we agreed on in the spec."

**Tip:** if the build stalls or the chart data looks empty, the usual cause is the data-loading path. Just say: `The charts are empty, load the data directly from the Excel file in the workspace and log how many rows you parsed.` Recovering live, calmly, is itself a good demo moment. It shows this is a real tool, not a rigged trick.

**Tip:** ask for the KPI numbers to be checked against the source: `Verify the total won revenue in the header matches the sum of Order Value where Status = Won in the spreadsheet.` Trust in the numbers is the whole point for an executive audience.

---

## Segment 3 (9:30 to 12:30): Preview and iterate live

Open the app in the Codex in-app preview (or your browser). Now do one or two visible iterations so the audience sees the loop, not just the result.

Good live edits, in plain language:
```
Make the four KPI cards bigger and put win rate as a colored badge,
green above 60% and amber below.
```
```
Sort the country chart descending and highlight any country below its target in red.
```

**Tip:** the Codex app lets you point at the running preview and comment on a specific element to give visual feedback, rather than describing it in words. If your version supports it, use it once on stage. Clicking a chart and typing "this axis is unreadable, fix it" lands far better than a paragraph of instructions.

**Tip:** make exactly one change at a time during the demo. Batched changes look impressive in private and chaotic on stage, because if one part is wrong you cannot tell which instruction caused it.

---

## Segment 4 (12:30 to 14:00): The "wow" upgrade

Pick ONE of these depending on your audience.

**Option A, the analyst killer (best for a business crowd):** add a generated narrative.
```
Add a "Regional summary" panel at the top that writes two or three sentences
in plain English describing the biggest story in the current filtered data:
which country and product line are driving results and where attainment is weakest.
```
If your plan allows it, this can be wired to call a model at view time so the summary updates as you filter. Even a rules-based version reads like magic to a non-technical room.

**Option B, the "it's real software" move:** deploy it.
```
Deploy this dashboard to Vercel so I can share a live link.
```
Codex can deploy web apps to hosts like Vercel, Netlify, Cloudflare, and Render. Ending on a public URL you can text to someone is a strong close.

**Tip:** decide A or B before the demo and rehearse only that one. Do not improvise both with two minutes left.

---

## Segment 5 (14:00 to 15:00): Recap the method, not the app

Land these four reusable points. They are what people take home.

1. **Describe the job and the audience, not the implementation.** Let the model pick the chart library. You pick the goal.
2. **Make the AI ask before it builds.** "Ask me clarifying questions, do not build yet" turns a vague prompt into a real spec and saves the back-and-forth.
3. **Get the refined prompt back and save it.** It is a reusable asset. New data next quarter, same prompt.
4. **Iterate one change at a time, against the real data, with the numbers verified.** That is the difference between a toy and something an executive would actually open.

Close line: "The skill here is not coding. It is knowing how to brief. The refinement loop is the whole thing, and it works for slides, documents, and analysis too, not just dashboards."

---

## Pre-flight checklist (print this)

- [ ] Codex desktop app open, signed in, strong model selected
- [ ] Workspace folder open with the xlsx inside it
- [ ] The three refinement prompts copied somewhere you can paste fast
- [ ] Your answer message to the clarifying questions pre-written
- [ ] A fallback screenshot or recording of the finished dashboard
- [ ] Decided: Option A (AI summary) or Option B (deploy) for the finale
- [ ] One rehearsal run completed end to end
- [ ] Network checked, and a phone hotspot as backup

## Common live-demo failures and the fix

| Symptom | Likely cause | Live fix |
|---------|-------------|----------|
| Charts render empty | data path or parsing | "Load data from the Excel directly and log the row count" |
| Numbers look wrong | won/pipeline filter mixed up | "Verify header totals against Status = Won in the file" |
| Build takes too long | over-scoped first prompt | cut scope live: "ship the 4 KPI cards and country chart first" |
| Ugly default styling | you let it pick blind | the refined prompt should have named a palette; restate it |
| Model picks a heavy stack | unspecified | the spec said "plain HTML + JS, no build step"; remind it |
