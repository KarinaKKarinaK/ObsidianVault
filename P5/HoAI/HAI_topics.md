# HAI — Topic Notes

[[HAI_question_bank|→ Question Bank]] | [[HAI_mindmap_data|→ Mind Map]] | [[HAI_flashcard_tool.html|→ Flashcard Tool]]

> **Exam:** Thu 28 May 2026, 15:30 | **Format:** written 2h15 | Pick **1A + 2B + 1C** | each = 2 pts | Bonus already secured (can skip one designated question)
> Source: lectures 1–4, seminars 1–3, past exams May 2025 & July 2025, assignment sheets

---

## HOW THE EXAM WORKS

| Type | Pool | Pick | Based on |
|------|------|------|----------|
| A | 8 questions | 1 | Lectures — "explain the line of thought" |
| B | 12 questions | 2 | Campbell-Kelly book chapters |
| C | 6 questions | 1 | Synthesis — book + lectures + analytical concepts |

**Essay structure (200 words min.):** Intro (thesis + preview) → Body (argument → example; counterargument → example) → Conclusion (repeat thesis + follow-up question)
**ABC-structure for comparison questions:** Explain A (with examples) → Explain B (with examples) → Explain C = the relation between them (make it explicit).

---

## PART 1 — A-QUESTIONS (Lecture Themes)

### A1. Three Traditions of Automation
The prehistory of computing cannot be told as a single story — at least three separate traditions converged. **Administration** (census offices, insurance companies, banks — Hollerith's tabulating machines for the 1890 US census); **Process control** (engineering and industrial automation — Dutch waterworks calculations, Taylor's scientific management); **Science** (calculation for physics, astronomy, military ballistics). These traditions operated largely independently and had very different goals, social contexts, and organisational homes. Only in retrospect does it seem as if they were all leading toward the same machine. This is why "a history" of computing is always "a" particular history, not "the" history — the choice of starting point reflects the historian's agenda.
> Source: Lecture 1

**Exam tip:** If asked about prehistory or multiple histories of computing, use the three traditions + show how each has different actors/contexts.

---

### A2. Technology and Trust — Hollerith and the 1890 Census
Herman Hollerith designed a punched-card tabulating machine for the 1890 US Census — the first large-scale automated data processing project. The key story is about **trust**: government officials had to be convinced to trust a machine with sensitive national data, a task previously done by human clerks. Hollerith succeeded partly because his machines were faster (completed in 2.5 years vs. 7.5 for 1880) and partly because he made the output legible and reliable. This introduces the broader theme that new computing technologies always require social/institutional trust to be adopted — pure technical superiority is not enough. The same dynamic reappears with UNIVAC (1952 election prediction on TV) and IBM's marketing-heavy approach.
> Source: Lecture 1

**Exam tip:** "Technology and trust" is a recurring A-question theme in both past exams. Connect Hollerith to later examples.

---

### A3. History of AI is Older than History of Computing
This is a lecture claim that reverses the common assumption. The standard narrative places AI as a 1950s product of computing. But if we define AI broadly — as attempts to mechanically replicate or extend human reasoning — its prehistory is much older: Aristotle's syllogism, Ramon Llull's *Ars Magna* (13th c.), Leibniz's *Calculus Ratiocinator* (17th c.), Babbage's Analytical Engine (1837), and crucially **the dream of a universal logical language** (Principia Mathematica, Esperanto, Peano notation). All of these predate electronic computers. Computing emerged from the *Administration* tradition; AI's roots are in the *Science* tradition (particularly logic and mathematics). They merge at the 1956 Dartmouth conference, but their prehistories are separate.
> Source: Lecture 1, Assignment 1.2

**Exam tip:** This framing is directly tied to C-question concepts (agendas, appropriation). Know specific examples from before 1940.

---

### A4. Babbage and the Aiken Intermezzo
Charles Babbage (1791–1871) designed the Difference Engine (1822) and Analytical Engine (1837) but never completed them — undone by engineering limits, funding disputes, and his own perfectionism. His work was largely forgotten by the time Howard Aiken at Harvard sought funding for the Mark I (1937–1944). Aiken strategically **invoked Babbage's legacy** — presenting himself as the person who finally completed Babbage's vision — to legitimise his project to IBM and Harvard administration. This is a textbook example of **agendas**: Aiken used a historical narrative instrumentally. The Mark I was actually quite different from the Analytical Engine, but the rhetorical lineage served Aiken's purpose. IBM later had its own PR scandal when Harvard took all the credit.
> Source: Lecture 1

**Exam tip:** Babbage→Aiken is the canonical example for "agendas" in C-questions. Know both the historical facts and the agenda argument.

---

### A5. Dutch Dinosaurs — Computing in the Netherlands
The "Dutch Dinosaurs" refers to the Dutch contribution to early computing — a counter-narrative to the Anglo-American story. Key figures: **H.A. Lorentz** and **C. Lely** used manual calculation for the Zuiderzee waterworks planning (1910s–20s); **Johan van Veen** (1893–1953) at Rijkswaterstaat built the *Deltar* for flood control; **Aad van Wijngaarden** (1916–1987) went to England in 1946, brought back knowledge, founded the Mathematisch Centrum in Amsterdam (1947), and built the **ARRA** (June 21, 1952) — one of the first Dutch computers. The Dutch case shows that computing emerged from real national needs (water management after WWII flooding), not just military/commercial pressure. Van Wijngaarden also co-designed ALGOL 60, a major programming language.
> Source: Lectures 1–2

**Exam tip:** Dutch Dinosaurs appears as both an A-question topic and a C-question context. Know: van Veen + Deltar, van Wijngaarden + ARRA + Mathematisch Centrum + ALGOL.

---

### A6. Cold War Science and Prejudice in Computing History
Cold War science shaped computing in profound ways (Manhattan Project → atomic power → massive computation need; NASA; military funding for Whirlwind/SAGE). But the dominant narrative is Anglo-American. **Prejudice in the historiography** appears in two ways: (1) non-Anglo pioneers are systematically ignored — e.g., **Polish mathematicians Rejewski, Różycki, and Zygalski** broke the Enigma cipher *before* Turing (from 1932), but the English Bletchley narrative gets all the credit; Japan and Germany also had computers ready by ~1948 (Manchester Baby, December 1948). (2) **Stephanie Dick** and others have shown that computing history reflects cultural dispositions — choices about what counts as "computing" encode ideological assumptions. Simple stories about computing heroes are always incomplete.
> Source: Lecture 2

**Exam tip:** "Prejudice" as a theme can be used in C-questions about agendas and histories. Rejewski etc. is the key factual anchor.

---

### A7. Computing Sounds
In the early 1950s, computers literally made music. **Christopher Strachey** sent a punched card tape to EDSAC (Cambridge) to play "God Save the Queen" (1951); the ARRA (Amsterdam) played the Dutch national anthem; the Univac had a "stall speaker." Sounds served multiple purposes: **termination signals** (the computation is done), **auditive monitoring** (you could hear the machine's operational state), **navigation** (debugging), and **instruction** (demonstrating to visitors). This is historically significant because it shows computers entering cultural life — sounds made the machine legible to a wider public. Later, making computers *silent* became a design goal (professionalism). The sounds also show **appropriation** at work: a military/scientific tool being used for entertainment.
> Source: Lecture 3, Assignment 3 (Q1)

**Exam tip:** Two uses of sounds: monitoring + cultural demonstration. Assignment 3 asks exactly: "Why were speakers connected to these machines?"

---

### A8. Metaphors in Computing
Language shapes how we think about technology. The word **"program"** was first used in the context of ENIAC (1946) and the verb **"programming"** appears by 1948. Before fixed terminology, computing actions were described with different metaphors: **plugging** (wiring), **sequencing**, **assembling** (→ Assembly language), **autocoding** (→ automatic translation), **pseudo-coding**. Each metaphor shaped what users thought the computer was doing — a machine tool, a translator, a logical reasoner. The transition to **FORTRAN** (1957) and **COBOL** (1959) as "natural language" programming was itself metaphorical. Similarly, "electronic brain" (used in British press for EDSAC) shaped public perception. The IBM 1401 was called "Big Blue." Metaphors are not neutral — they encode agendas and constrain imagination.
> Source: Lecture 3

**Exam tip:** "Metaphor" appears in the A-questions of May 2025 exam. Know: program/programming, assembling/autocoding, electronic brain.

---

### A9. Game Culture and Appropriation
**Appropriation** = taking a technology and re-purposing it for uses its designers never intended. Key early example: **Ferranti Mark I** (1951) — a scientific computer used by Christopher Strachey to play **Nim**, a mathematical game. The game was not just entertainment; it demonstrated the machine could perform symbolic reasoning. This was a key act of appropriation that shaped the trajectory of AI research. Later appropriation: computers → games → game culture → AI as competitive challenge (chess). Game culture also led to the concept of **interactive computing** and eventually personal computers. The Dartmouth conference (1956) used game-playing as a demonstration of "artificial intelligence."
> Source: Lecture 3

**Exam tip:** Appropriation as a C-concept is illustrated most cleanly by gaming (Nim 1951, chess). Know both the historical example and the analytical concept.

---

### A10. Cybernetics in Business and Scifi and AI
**Cybernetics** (Norbert Wiener, 1948) — the science of control and communication in animals and machines — briefly became a dominant metaphor for thinking about intelligence, organisations, and society. **Stafford Beer** applied cybernetics to business management; **Project Cybersyn** (Chile, 1971–73) was Salvador Allende's attempt to use cybernetic management for the entire national economy (Beer + Medina). Cybernetics in the 1960s was the defining intellectual framework — it shaped how AI was conceived. Simultaneously, **science fiction** (Asimov, Clarke, Philip K. Dick) created cultural expectations about intelligent machines that influenced both researchers and the public. The Dartmouth conference 1956 name "Artificial Intelligence" (McCarthy) was a deliberate choice to distinguish from cybernetics.
> Source: Lecture 3

**Exam tip:** Cybernetics as a "defining technology" (Bolter sense) of the 1960s. Project Cybersyn = concrete example. Scifi → cultural expectations → overpromising → AI winters.

---

### A11. AI and Mathematics — Proof Checkers and Computers
Mathematicians in the 1950s–60s became interested in computers for **formal proof**: could machines verify mathematical proofs? This interest drove the development of LISP (1958, John McCarthy) — a language for symbolic computation based on Alonzo Church's **lambda calculus** (1936). The connection: formal logic → Principia Mathematica (Russell & Whitehead, 1910) → Gödel's incompleteness (1931) → Turing's Halting Problem → Church's lambda calculus → McCarthy's LISP → AI as theorem proving. **MacKenzie** (*Mechanizing Proof*, 2001) documents how proof-checking computers were used not just for mathematics but also for military systems (Patriot missile guidance). This made formal methods both a research program and a political/military issue.
> Source: Lecture 4, Assignment 4 (Q1: Mathematics and AI)

**Exam tip:** The line: Principia Mathematica → Church → Turing → LISP → AI theorem proving. Know this chain.

---

### A12. AI and Education — Programmed Instruction vs. LOGO
Two distinct traditions of AI in education: (1) **Programmed instruction** (1960s) — B.F. Skinner's behaviourist model: break knowledge into small steps, test after each step, give immediate feedback. Computers as automated teaching machines. This was the dominant 1960s approach and was criticised as mechanical/dehumanising. (2) **LOGO** (Seymour Papert, MIT, 1967) — constructivist model: children learn by *doing* programming (turtle graphics), discovering mathematical concepts through play. LOGO treated the computer as a tool for thinking, not a replacement for the teacher. The contrast between programmed instruction (top-down, behaviourist) and LOGO (bottom-up, constructivist) maps onto deeper debates about what AI and computing can and should do in education.
> Source: Lecture 4

**Exam tip:** This appears in both past exams and in the "No Bonus" question. Always contrast programmed instruction (Skinner) with LOGO (Papert). Know the pedagogical philosophy behind each.

---

### A13. Programming Languages and Cultural Divide — ALGOL 60 vs FORTRAN/COBOL
In the late 1950s, two programming cultures emerged. **FORTRAN** (IBM, 1957) — practical, for scientists, American, compiled fast. **COBOL** (Grace Hopper, 1959) — for business, readable English-like, committee-designed. **ALGOL 60** — designed by a European/American committee (van Wijngaarden, Rutishauser, Bauer, Backus) at conferences in Zürich, Darmstadt, etc. — aimed at mathematical elegance and universality. Americans (IBM/industry) rejected ALGOL as too academic; Europeans embraced it as the "right" language. ALGOL introduced **structured programming** concepts that influenced every later language. Dijkstra and van Wijngaarden were champions. The divide reflects different agendas: American commercial pragmatism vs. European academic idealism.
> Source: Lecture 4, Assignment 4 (Q2: Programming languages + agendas)

**Exam tip:** FORTRAN = American/commercial. ALGOL 60 = European/academic. COBOL = business/committee. Know the "agendas" framing — this appears in assignments.

---

### A14. Software Crisis and the Rise of the Software Industry
By the late 1960s, software had become the bottleneck. **IBM's "unbundling"** (1968) — separating software pricing from hardware — transformed software from a service into a commodity, creating the software industry. The **software crisis** (NATO conference, 1968): large software projects were consistently late, over budget, and full of bugs. OS/360 was the classic example (Brooks: *The Mythical Man-Month*). European response: **Edsger Dijkstra** (1930–2002, Dutch) argued for *structured programming* — mathematical discipline in code. American response: management techniques, more testing, bigger teams. The crisis shaped: agile precursors, software engineering as a discipline, and the beginning of professional separation between software and hardware.
> Source: Lecture 4

**Exam tip:** Software crisis = 1968 NATO conference. IBM unbundling = 1968. Dijkstra = European structured programming response. This is also a C-question topic (US vs European perspective).

---

## PART 2 — B-QUESTIONS (Campbell-Kelly Chapters 4–15)

> One paragraph per chapter. Focus on: main thesis → key narrative → most exam-likely question.

---

### B4. Chapter 4 — Inventing the Computer
**Period:** 1940s. **Thesis:** The "invention" of the computer was not a single moment but a series of parallel developments converging through wartime urgency and post-war knowledge sharing. **Narrative:** The Moore School (UPenn) built ENIAC (Mauchly + Eckert + Goldstine, 1945) for ballistics; Von Neumann joined and wrote the *First Draft of a Report on EDVAC* (1945), introducing the stored-program concept. Moore School Lectures (1946) spread the knowledge to Europe — Newman and Williams → Manchester Baby (1948); Wilkes → EDSAC (Cambridge, 1949). Atanasoff's ABC was a predecessor but was passed over. **CK's key argument:** The Moore School functioned as a "means to an end" (ballistics calculation) — the computer was not the goal but the tool. **Most likely exam question:** Why was the Moore School central to early computing history? Distinguish between what it built and what it disseminated.
> Source: Seminar 2; Campbell-Kelly Ch. 4

---

### B5. Chapter 5 — The Computer Becomes a Business Machine
**Period:** Late 1940s–1950s. **Thesis:** The transition from scientific instrument to business machine required both technical and organisational innovation. **Narrative:** Three company types competed: electronics firms (RCA, GE, Honeywell), business machine firms (IBM, Remington Rand, NCR, Burroughs), and startups (EMCC — Eckert & Mauchly, ERA). Eckert & Mauchly → UNIVAC (Census Bureau) → acquired by Remington Rand; 1952 election prediction on CBS TV made UNIVAC famous but Remington Rand failed to capitalise. IBM was slow (Watson Sr. sceptical), built the SSEC (PR success), then gradually introduced electronics; Model 650 (MDC) dominated the market. By end of 1950s: "IBM and the seven dwarfs." **Most likely exam question:** CK phrase: "Watson was rational but wrong; Eckert and Mauchly were irrational but right" — explain.
> Source: Seminar 2; Campbell-Kelly Ch. 5

---

### B6. Chapter 6 — The Maturing of the Mainframe
**Period:** 1960s. **Thesis:** IBM consolidated dominance through superior marketing and a massive architectural bet (System/360). **Narrative:** IBM had ~75% of market by 1960s — "IBM and the seven dwarfs" (Sperry Rand/UNIVAC, Honeywell, RCA, GE, Control Data, Burroughs, NCR). IBM 1401: cheap, fast printer (IBM 1403), Report Program Generator (RPG) → 12,000 sold (vs. 1,000 forecast). Competitors used three survival strategies: IBM compatibility (RCA Spectra 70), own compatible family (Honeywell/Burroughs/NCR), niche specialisation (Control Data → scientific; GE → timesharing). System/360 (1964): IBM risked everything on one compatible family — technically conservative but commercially revolutionary. 1970–71 recession: RCA and GE exit → "IBM and the BUNCH." Cultural ambivalence: computers seen as both job threat and modernisation tool ("Desk Job" culture). **Most likely exam question:** How did IBM maintain dominance? What strategies did "the seven dwarfs" use?
> Source: Seminar 3; Campbell-Kelly Ch. 6

---

### B7. Chapter 7 — Real Time Computing
**Period:** Late 1940s–1970s. **Thesis:** Real-time computing (processing data fast enough to affect ongoing events) emerged from military necessity and spread to civilian life through entrepreneurial appropriation. **Narrative:** Batch processing = submit job, wait for result. Real-time = continuous interaction. **Project Whirlwind** (MIT, Jay Forrester, 1944): started as aircraft simulator; Perry Crawford (1945) convinced them to go digital; Bill Papian introduced core memory (1951); almost cancelled but survived as SAGE. **SAGE** (Semi-Automatic Ground Environment): 23 direction centers, IBM AN/FSQ-7; militarily obsolete almost immediately (ICBMs), but spawned CRT culture, drum memory, trained engineers. Civilian spinoffs: **SABRE** (IBM + American Airlines, 1957–64): 1,100 terminals in 50 cities; credit cards/ATMs (Diners Club 1949 → BankAmericard 1958 → Visa 1970; Barclays ATM 1967); **UPC** (1973): McKinsey + IBM + vendors — as much a political as a technical achievement. **Most likely exam question:** CK attributes real-time computing to "blending of military research and entrepreneurial efforts" — explain with Whirlwind/SAGE → SABRE chain.
> Source: Seminar 3; Campbell-Kelly Ch. 7

---

### B8–9. Chapters 8–9 — New Ways of Computing / Timesharing
**Period:** 1960s–1970s. **Thesis:** Timesharing transformed computing from a batch, institutional activity to an interactive, potentially personal one — and California counterculture shaped how this transformation happened. **Narrative:** Timesharing (multiple users sharing one computer via terminals) pioneered by CTSS (MIT, 1961), then GE (niche strategy from Ch. 6). BASIC (Kemeny & Kurtz, Dartmouth, 1963): designed for non-specialists — "New ways of computing." *Whole Earth Catalogue* (Stewart Brand, 1968): hippie tool catalogue that included computers as liberation tools — "access to tools." California blended counterculture + tech culture (different from East Coast institutional computing). Precursor to personal computing: from timesharing terminal to personal terminal to personal computer. **Most likely exam question:** How did timesharing create new kinds of computing users? What role did BASIC play?
> Source: Campbell-Kelly Ch. 8–9

---

### B10. Chapter 10 — The Personal Computer
**Period:** 1970s–1980s. **Thesis:** Broadening the appeal of computers in the 1980s required making them accessible to non-specialists, which was a social and design challenge as much as a technical one. **Narrative:** Early personal computers (Altair 1975, Apple I/II 1976/1977) aimed at hobbyists. Apple Macintosh (1984): GUI, mouse, for "the rest of us." IBM PC (1981): open architecture, legitimised personal computing for business. GUI-based OS attempts and failures: VisiCalc (killer app for Apple II), Lotus 1-2-3 (IBM PC). Lisa (Apple, 1983) — too expensive, failed. The Macintosh popularised the GUI concept (originally from Xerox PARC). By the late 1980s personal computing = mainstream business tool. **Most likely exam question:** What made personal computers appeal to a broader public in the 1980s? Give examples of successful and failed strategies.
> Source: Campbell-Kelly Ch. 10

---

### B11. Chapter 11 — The Internet
**Period:** 1980s–1990s. **Thesis:** The Internet emerged from the "confluence of three desires": military networking (ARPANET), academic information sharing, and commercial communication. **Narrative:** ARPANET (1969): packet switching, military origin, designed to survive nuclear attack. Academic use: email becomes dominant application; sociologists and psychologists begin studying email's social effects (new social issues: flaming, norms, identity). Commercial Internet: World Wide Web (Berners-Lee, CERN, 1989) → browser (Mosaic, 1993) → commercialisation. The three desires don't always align — tensions between open access (academic) and commercial control (companies) persist. **Most likely exam question:** CK calls Internet a "confluence of three desires" — what were they, and how did each shape the early Internet?
> Source: Campbell-Kelly Ch. 11

---

### B12. Chapter 12 — Silicon Valley
**Period:** 1970s–2000s. **Thesis:** The "Silicon Valley myth" (two boys in a garage) conceals a specific cultural and institutional context that is hard to replicate. **Narrative:** Silicon Valley grew from Shockley Semiconductor → Fairchild Semiconductor → Intel (traitorous eight); Stanford University research culture; venture capital ecosystem. The "garage myth" (Apple, HP, Google) obscures the role of university connections, defence contracts, and VC funding. Company culture in Silicon Valley: flat hierarchies, stock options, informal dress codes, "move fast and break things" — contrasted with non-Valley company cultures (IBM: suits, hierarchy). **Most likely exam question:** What distinguishes Silicon Valley company culture from non-Valley computing companies? Is the "two boys in a garage" myth accurate?
> Source: Campbell-Kelly Ch. 12

---

### B13. Chapter 13 — Globalization and Diversity
**Period:** 1990s–2010s. **Thesis:** The globalisation of computing created new labour geographies (offshoring/outsourcing) and, by the 2010s, began to confront the diversity problem it had systematically created. **Narrative:** Off-shoring: US companies moved software development to India (Infosys, Wipro, TCS), then Eastern Europe, China. Out-sourcing: IT services (Accenture, EDS) managed companies' computing infrastructure. Result: global software industry with complex supply chains. Diversity and inclusion (2010s): computing industry became aware of its demographic skew (male, white, Asian-American). Initiatives to increase diversity faced "pipeline" arguments vs. structural change arguments. **Most likely exam question:** What were the consequences of off-shoring and out-sourcing for the global computing industry?
> Source: Campbell-Kelly Ch. 13

---

### B14. Chapter 14 — The World Wide Web: Searching and Advertising
**Period:** 1990s–2010s. **Thesis:** Google invented a new business model — **surveillance capitalism** — that monetised attention by combining free search with targeted advertising based on user data collection. **Narrative:** Early search (AltaVista, Yahoo) was directory-based. Google (Page + Brin, 1998): PageRank algorithm (link structure as relevance signal) → dramatically better search. Revenue problem: solution = targeted advertising (AdWords, 2000). Business model: service is "free" but users pay with data. Netflix/Web 2.0: streaming personalisation = same model (watch history → recommendation → more engagement → more data). **Surveillance capitalism** (Shoshana Zuboff): human behaviour as raw material for prediction products sold to advertisers. GDPR (2018) = European regulatory response. **Most likely exam question:** How did Google develop surveillance capitalism? Is Netflix an example of the same phenomenon?
> Source: Campbell-Kelly Ch. 14

---

### B15. Chapter 15 — Computers and Governance
**Period:** 2000s–2020s. **Thesis:** The question of who governs computing — and who bears ethical liability — is answered very differently in the US and EU, with consequences for privacy, accountability, and AI. **Narrative:** US approach: self-regulation, First Amendment protection, Section 230 (platforms not liable for user content). EU approach: GDPR (2018), right to be forgotten, data as a right, platforms have responsibilities. Ethical liability: who is responsible when an algorithm discriminates, when a self-driving car kills someone, when a recommendation system radicalises users? The "ethical AI" debate. **Most likely exam question:** Compare US and EU approaches to computing governance. What are the differences in legal philosophy?
> Source: Campbell-Kelly Ch. 15

---

## PART 3 — C-QUESTIONS (Analytical Concepts for Synthesis)

> These concepts appear in *every* C-question. Master the definition, a primary example, and a counterexample or complication.

---

### C1. Appropriation
**Definition:** Taking a technology designed for one purpose and using it for a different, often unforeseen purpose. Appropriation is a key mechanism of technological change — it is how technologies acquire new social meanings and create new practices.
**Primary examples:**
- Ferranti Mark I (1951): scientific computer → Nim game (Strachey) → demonstration of AI reasoning
- SAGE (military air defence) → SABRE (civilian airline reservations) → credit card networks
- Internet (military/academic) → commercial/social media
- Computing sounds (monitoring tool) → musical performance/cultural demonstration
**Complication:** Appropriation is not always intentional or controlled — it happens in social use, not just design. Some appropriations fail (e.g., Videotext in 1980s tried to create Internet-like services before users were ready).
**In C-questions:** Show how appropriation connects the history of computing to the history of AI; show that technological trajectories are not predetermined.
> Source: Lectures 3–4; past exam C-questions (both years)

---

### C2. Agendas
**Definition:** Interests, goals, and purposes that shape how historical narratives are constructed. Historians, funders, and institutions use histories to serve present aims — to legitimate projects, secure funding, or establish priority claims.
**Primary examples:**
- Aiken used the Babbage narrative to secure IBM funding for the Harvard Mark I — Babbage as precursor even though the machines were very different
- AI winters narrative: used to argue for renewed funding — "we learned from our mistakes"
- Eckert & Mauchly claimed ENIAC credit; Von Neumann publication of EDVAC report caused bitter dispute over authorship
- Pamela McCorduck's *Machines Who Think* presented AI history to advocate for the field
- Programming languages: FORTRAN (IBM/commercial agenda) vs. ALGOL (European academic agenda)
**Complication:** All histories have agendas — this does not make them false, but it means we should ask: who benefits from this telling?
**In C-questions:** Use "agendas" to explain *why* certain stories are told, who is left out, and what the stakes are.
> Source: Lectures 1–4; past exam C-questions (both years)

---

### C3. Defining Technology (J. David Bolter, *Turing's Man*, 1984)
**Definition:** A "defining technology" is a technology that reshapes not just what we do but how we understand ourselves and our world — it becomes a cultural metaphor for human nature and intelligence.
**Bolter's examples:**
- The clock (17th century) → humans as clockwork machines (Descartes)
- The steam engine (19th century) → society as energy system
- **Cybernetics/computers (1960s)** → brain as information processor, humans as cybernetic systems
- **AI (21st century)** → intelligence as computation, humans definable by what machines cannot do (or can do)
**Key mechanism:** A defining technology provides a vocabulary (metaphors, analogies) that spreads beyond the technical domain into philosophy, politics, medicine, education.
**Complication:** Not all influential technologies become "defining" in Bolter's sense — the technology must reshape self-understanding, not just behaviour.
**In C-questions:** Ask whether AI is the defining technology of the 21st century. Use cybernetics (1960s example) and current AI (generative AI, LLMs) as the two poles.
> Source: Lecture 3 (Bolter reference); past exam C-questions (both years)

---

### C4. Surveillance Capitalism
**Definition** (from Shoshana Zuboff): A business model in which human experience and behaviour are collected as raw material, processed into "prediction products," and sold to advertisers or other buyers who want to influence behaviour.
**Primary examples:**
- **Google** (2000): free search → AdWords → user data as commodity → surveillance capitalism
- **Netflix**: viewing history → recommendation engine → engagement maximisation → subscriber retention
- **Facebook**: social graph + activity data → targeted political advertising
- **Web 2.0 generally**: user-generated content + engagement data = the product
**Key move:** Users think the service is "free." It is not — they pay with behavioural data.
**European response:** GDPR (2018) — data as a right, explicit consent, right to erasure.
**US response:** Self-regulation, Section 230 protections.
**In C-questions:** Connect to Ch. 14–15 (CK); use to answer questions about "data-driven culture" and "computing and governance."
> Source: Campbell-Kelly Ch. 14; past exam C-questions (both years)

---

### C5. AI Winters
**Definition:** Periods of drastically reduced funding and interest in AI research, following failed promises and oversold expectations. Two major winters: 1970s (after Lighthill Report, 1973) and late 1980s (after expert systems collapse, ~1987–93).
**Causes:**
- 1st winter: Overselling of machine translation and general AI; Lighthill Report (UK, 1973) concluded AI had failed to deliver; US DARPA cut funding
- 2nd winter: Expert systems (LISP machines) were brittle, expensive, hard to maintain; Japanese 5th Generation Computer project didn't deliver
**Narrative use (agenda):** The "AI winter" concept is itself used rhetorically: (a) to warn about overselling current AI, (b) to argue for sustained investment ("we're different this time"), (c) by historians to periodise AI history. Pamela McCorduck used it to argue for the field's resilience.
**Complication:** The narrative of "AI winter → spring" may obscure continuous background work that persisted through winters (neural networks in 1980s, support vector machines in 1990s).
**In C-questions:** Use to discuss agendas + AI history; know the Babbage→AI winter→LLM arc.
> Source: Lecture 1; past exam C-questions (both years) — AI winters appears in BOTH exams

---

### C6. Digital Culture
**Definition:** The transformation of existing practices and habits by digital technology — not just new tools, but new ways of doing old things, with positive and negative implications.
**Examples:**
- Music: from vinyl/CD to streaming (Spotify) — access expanded, but artist revenue compressed
- Journalism: from print gatekeeping to social media virality — democratisation + misinformation
- Banking: ATMs + online banking — 24/7 access + algorithmic credit scoring
- Education: LOGO and programmed instruction (L4) → MOOCs → AI tutors
**Key analytical move:** Digital culture is not just "computers change things" — it is the specific *logic* of digital technology (data collection, personalisation, platformisation, network effects) reshaping cultural production and consumption.
**In C-questions:** Assignment 1.4 and exam C-questions ask to apply this to a personal/professional example. Also connects to surveillance capitalism and Bolter's defining technology.
> Source: Lecture 1–4; assignment 1.4; past exam C-questions (both years)

---

## KEY LITERATURE MAP

| Author/Year | Key Claim | Exam Relevance |
|-------------|-----------|----------------|
| Campbell-Kelly et al. (2023⁴) | Computing history told through economic/social lens; American story | B-questions: all chapters |
| Bolter, J.D. (1984) *Turing's Man* | Computing is the "defining technology" of the modern age | C: defining technology |
| Zuboff, S. (2019) *Surveillance Capitalism* | User data → prediction products → sold to influence behaviour | C: surveillance capitalism |
| McCorduck, P. *Machines Who Think* | AI history as advocacy — "we survived the winters" | A: AI history; No-bonus question |
| Dijkstra, E. (1972+) | Structured programming as mathematical discipline | A: software crisis |
| Brooks, F. (1975) *Mythical Man-Month* | More programmers → slower project (adding manpower to late project makes it later) | B7/B8 context |
| Medina, E. *Cybernetic Revolutionaries* | Project Cybersyn: socialist cybernetics in Chile | A: cybernetics |
| Stephanie Dick | AI/computing history reflects cultural dispositions | A: prejudice in computing history |
| Jonnie Penn "Animo Nullius" | Data as *terra nullius* (unclaimed resource) — colonial framing of AI data | A: prehistory of AI; data ethics |

---

## EXAM STRATEGY

**What appears in BOTH past exams (very high probability):**
- A: Technology & trust, AI and education, metaphors, Dutch Dinosaurs, AI history comparisons
- B: Software crisis, IBM (7 dwarfs / System/360), timesharing/BASIC, Internet, governance/GDPR
- C: Appropriation, agendas, defining technology (Bolter), AI winters, surveillance capitalism

**Quick reference for "line of thought" questions:**
Always structure as: **claim → mechanism → historical example → implication**
Never just list facts — explain *why* the claim is made, using the specific language from lectures.

**For B-questions:** Know chapter title, period, main thesis, 2–3 specific named examples (people, machines, companies, dates).
