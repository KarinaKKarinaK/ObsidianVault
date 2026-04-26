# HAI — Question Bank

[[HAI_topics|← Back to Topics]] | [[HAI_flashcard_tool.html|→ Flashcard Tool]]

> All questions from past exams (May 2025 + July 2025) + assignment questions. Model answers: ~200 words each, structure: **Intro → claim → evidence → example → counterpoint → conclusion**.
> Source: `Past_Exams/Exam XB_0113 2025 I.pdf`, `Past_Exams/Exam XB_0113 2025 II.pdf`, `Assignments/Screenshots`

---

## QUESTION ANSWERING TEMPLATE

```
INTRO:
- One sentence that restates the question as a claim (thesis)
- One sentence previewing your answer structure

BODY ARGUMENT 1:
- Claim: [main idea]
- Evidence: [concept/mechanism/author]
- Example: [specific historical case with name + date]

BODY ARGUMENT 2 (or counterpoint):
- Claim: [contrasting idea or complication]
- Evidence: [concept/mechanism]
- Example: [specific historical case]

CONCLUSION:
- Restate thesis in new words
- Optional: one follow-up question that opens further discussion
```

**For "to what extent" questions:** Take a position on a spectrum. Explain what supports it, what limits it. Be explicit: "To a large extent, X because Y, but this is limited by Z."

**For "line of thought" questions:** Explain the reasoning step by step — what claim is being made, what evidence supports it, and what conclusion it leads to.

**For "compare" questions (ABC-structure):** Explain A (with example) → Explain B (with example) → Explain the relationship C (make it explicit — similarity? tension? causation?).

---

## A-QUESTIONS

### A-01 [May 2025] Technology and Trust
> *"In the lecture, the introduction of new computing technology always went hand in hand with the need to build trust in the technology. Explain the line of thought."*

**Model Answer:**
The lecture argues that technical capability alone is never sufficient for a computing technology to be adopted — the technology must also become socially trusted by the institutions and users it serves.

The clearest example is **Hollerith's tabulating machine** (1890 US Census). Hollerith designed a punched-card system that could process census data far faster than manual clerks. But government officials and the public had to be convinced that the machine's results were reliable. Hollerith succeeded through speed (completion in 2.5 years vs. 7.5 previously), reproducibility, and legible output. Trust was built not just by the machine working but by making its workings intelligible.

The same dynamic recurs throughout computing history: **UNIVAC** (1952 election prediction on CBS) built public trust through a dramatic, visible demonstration; **IBM** built institutional trust through marketing, service contracts, and the cultural weight of the IBM brand. The slogan "nobody ever got fired for buying IBM" encapsulates this — trust reduced risk for decision-makers.

Conversely, technologies that lacked trust infrastructure failed regardless of technical merit. Atanasoff's ABC computer (1940s) worked technically but had no institutional home or trust network, and was passed over.

In conclusion, the lecture's line of thought is that trust is a *social* achievement, not a technical one — and computing history is in part a history of how trust was produced, legitimised, and sometimes exploited.

---

### A-02 [May 2025] Dutch Dinosaurs
> *"In the lecture, a number of Dutch computer pioneers were discussed. Explain the role of the Dutch Dinosaurs in the history of computing."*

**Model Answer:**
The "Dutch Dinosaurs" is the lecture's term for the Dutch contribution to early computing — a counter-narrative to the dominant Anglo-American story that locates computing's origins entirely in the US and UK.

The Dutch story begins with practical necessity. **H.A. Lorentz** and **C. Lely** required enormous calculations for the Zuiderzee waterworks (1910s–20s) — water management, not military needs, was the driver. **Johan van Veen** (1893–1953) at Rijkswaterstaat built the *Deltar* analogue computer for Delta flood control after the 1953 flood disaster — a genuine process-control computer serving national infrastructure.

The scientific tradition is represented by **Aad van Wijngaarden** (1916–1987), who visited England in 1946, brought back knowledge, and co-founded the Mathematisch Centrum in Amsterdam. On **June 21, 1952**, the ARRA — the first Dutch electronic computer — ran its first program. Van Wijngaarden later co-designed ALGOL 60, one of the most influential programming languages ever.

The Dutch case illustrates two important points. First, computing emerged from multiple national contexts for multiple reasons — it was not a uniquely American invention. Second, the choice to highlight or ignore the Dutch story reflects **historiographical agendas**: an Anglo-American history is a *particular* history, not a universal one.

---

### A-03 [May 2025] Metaphor — The "Electronic Brain"
> *"In the lecture, the metaphor of the 'electronic brain' was discussed. Explain the line of thought."*

**Model Answer:**
The lecture argues that the language used to describe computers is never neutral — metaphors shape how users, politicians, and the public understand what computers are and what they can do.

The term **"electronic brain"** was used extensively in British newspapers in the early 1950s to describe machines like EDSAC and later the Ferranti Mark I. The metaphor worked in two directions. For advocates, it highlighted the power of the machine — implying human-like reasoning capability and suggesting that intelligence could be replicated mechanically. For critics, it raised anxieties: if the machine had a "brain," did it threaten human employment, autonomy, or uniqueness?

The "brain" metaphor was not just journalistic shorthand; it also shaped research agendas. Cybernetics (Wiener, 1948) used brain-as-machine and machine-as-brain interchangeably. McCarthy's choice of the term "Artificial Intelligence" (Dartmouth, 1956) was partly a deliberate break from the brain metaphor — he wanted a term that was scientifically precise, not analogical.

Other computing metaphors (program, assembly, autocoding) shaped *how* programming was taught and understood. The progression from "plugging" to "programming" encoded different assumptions about skill, creativity, and the relationship between human and machine.

The line of thought: metaphors are cognitive tools that both enable and constrain — they open certain possibilities while closing off others.

---

### A-04 [May 2025] AI in Mathematics
> *"In the lecture, the relationship between AI and mathematics was discussed. Give two examples of this relationship."*

**Model Answer:**
The lecture traces two distinct but connected ways in which AI and mathematics are intertwined: AI as a tool *for* mathematics, and mathematics as a foundation *for* AI.

**Example 1 — Formal proof and LISP:** Mathematicians in the 1950s became interested in computers as proof-checking tools. If mathematics consisted of formal logical operations, could a machine verify proofs? This question drove John McCarthy (1927–2011) to develop **LISP** (1958), a programming language based on Alonzo Church's **lambda calculus** (1936). LISP became the foundation language for AI research for three decades — not because of AI applications, but because it was the right tool for symbolic manipulation. The connection: logic → formal proof → lambda calculus → LISP → AI.

**Example 2 — Principia Mathematica and automated reasoning:** Russell and Whitehead's *Principia Mathematica* (1910–13) attempted to derive all mathematics from logical axioms. This project — showing that mathematics was reducible to logic — directly inspired the dream of automated reasoning. Gödel (1931) showed the limits; Turing formalised computability (1936); both results were then incorporated into early AI theory. The vision of a machine that could reason formally underpinned expert systems, theorem provers, and modern proof assistants (Coq, Lean).

Both examples show that AI and mathematics are deeply entangled — AI is not just applied to mathematics, it emerged from mathematical ideas.

---

### A-05 [May 2025] AI and Education
> *"In the lecture, the relationship between AI and education in the 1960s and 1970s was discussed. Give two examples."*

**Model Answer:**
Two distinct traditions of using computers in education emerged in the 1960s–70s, reflecting fundamentally different theories of learning.

**Example 1 — Programmed Instruction (Skinner, 1950s–60s):** B.F. Skinner's behaviourist learning theory held that learning could be broken into discrete steps, each followed by immediate feedback. Computers were ideal "teaching machines": present a question, wait for answer, give correct feedback. This model was widely adopted in military and corporate training. It treated the computer as a sophisticated drill-and-practice system. Critics argued it was mechanical, reinforced rote learning, and reduced education to stimulus-response.

**Example 2 — LOGO (Seymour Papert, MIT, 1967):** Papert drew on Piaget's constructivism — children learn by building mental models through active exploration, not passive reception. LOGO let children program a turtle (physical or screen-based) using simple commands, discovering mathematical concepts (angles, geometry, recursion) through play. The computer was not the teacher but a tool for thinking — a "mind's mirror." LOGO assumed children could be *makers* of knowledge, not just receivers.

The contrast is crucial for the exam: programmed instruction = top-down behaviourism = computer as authority; LOGO = bottom-up constructivism = computer as tool. Both claimed to use "AI" concepts but had opposite pedagogical philosophies. This debate continues in discussions of AI tutors today.

---

### A-06 [May 2025] Game Culture and AI
> *"In the lecture, game culture was discussed in relation to the history of computing. Explain the line of thought."*

**Model Answer:**
The lecture argues that games played a structurally important role in the development of computing and AI — not as frivolous entertainment but as a domain in which machines could demonstrate capabilities previously thought to require human intelligence.

The key early example is **Nim** (1951): Christopher Strachey programmed the Ferranti Mark I to play Nim, a mathematical strategy game. This was an act of **appropriation** — a scientific computer repurposed for game-playing. But it was also a proof of concept: a machine could engage in rule-based strategic reasoning. This directly influenced the framing of AI as "game-playing intelligence."

Chess became the dominant benchmark. Claude Shannon published a theoretical paper on chess-playing computers (1950); Alan Turing wrote a chess-playing algorithm (1953, never implemented). The 1956 Dartmouth conference framed AI partly around game-playing as a testbed. Deep Blue's defeat of Kasparov (1997) and AlphaGo's defeat of Lee Sedol (2016) are the successors of the same research lineage.

Games also drove computing hardware: real-time graphics, fast processing, and eventually the GPU — a games technology — became the infrastructure for deep learning. The trajectory from Nim (1951) to GPU-based neural networks (2010s) shows that game culture was not tangential to AI history but integral to it.

---

### A-07 [May 2025] History of AI vs. History of Computing
> *"In the lecture, the history of AI was compared to the history of computing. Explain two comparisons."*

**Model Answer:**
The lecture makes a structural comparison between how the histories of AI and computing are typically told, revealing both parallels and important differences.

**Comparison 1 — Both have contested origin stories:** Computing's standard origin (ENIAC, 1945; Moore School; US) conceals parallel developments in the UK, Netherlands, Germany, and the Soviet Union. Similarly, AI's standard origin (Dartmouth conference, 1956; McCarthy; US) conceals prior work: cybernetics (Wiener, 1948), Turing's "Computing Machinery and Intelligence" (1950), and earlier dreams of logical machines (Leibniz, Babbage, Boole). In both cases, the "origin" chosen reflects the historian's agenda.

**Comparison 2 — Both use narratives of progress and crisis:** Computing history has its hardware generations (1st = vacuum tubes, 2nd = transistors, etc.) and crises (software crisis, 1968). AI history has its waves (symbolic AI → connectionism → deep learning) and winters (1970s, late 1980s). In both cases, the narratives of progress and crisis are partly rhetorical — used to justify current projects and secure funding. The "AI winter" narrative, for example, is used to argue that sustained investment is necessary to reach the "spring."

Both histories are also histories of what gets forgotten: the women programmers (ENIAC operators, Grace Hopper), the non-Western computing traditions, the paths not taken.

---

### A-08 [May 2025] Web 2.0 and AI
> *"In the lecture, the emergence of Web 2.0 was compared to developments in AI. Explain the line of thought."*

**Model Answer:**
The lecture connects Web 2.0 and AI through the concept of **data-driven systems** — both represent a shift from rule-based to statistical/behavioral approaches enabled by large-scale data collection.

Web 2.0 (early 2000s) is characterised by user-generated content (Wikipedia, YouTube, blogs), social networking (Facebook, Twitter), and recommendation systems (Netflix, Amazon). The key innovation was that user *behaviour* — clicks, ratings, watch times, purchases — became the raw material for improving systems. This is **surveillance capitalism** (Zuboff): data collection enables personalisation, which increases engagement, which generates more data.

AI followed a parallel path. Early AI (1950s–80s) relied on hand-coded rules (expert systems, GOFAI). The deep learning revolution (2010s) succeeded because vast datasets — partly generated by Web 2.0 platforms — enabled statistical learning at scale. ImageNet (2009), scraped from the web, trained convolutional neural networks that beat human performance. Large language models (GPT, BERT) were trained on web-scraped text.

The line of thought: Web 2.0 created the data infrastructure that modern AI required. The same business model (free service → behavioural data → algorithmic improvement) underlies both platforms and AI systems. This makes the history of the web inseparable from the history of contemporary AI.

---

### A-09 [July 2025] Prehistory of AI — Common Events with Computing
> *"In the lecture, the prehistory of AI was discussed. What events in this prehistory do AI and computing have in common?"*

**Model Answer:**
The lecture argues that the prehistories of AI and computing overlap at specific points but are largely separate — they come from different intellectual traditions.

**Common event 1 — Babbage's Analytical Engine (1837):** Babbage's design for a programmable mechanical computer is claimed as a precursor both by computing historians (stored-program concept) and by AI historians (the idea of a machine that could follow logical instructions). Ada Lovelace's notes (1843) include what some call the first algorithm — claimed by both traditions.

**Common event 2 — Turing (1936–1950):** Alan Turing's 1936 paper on computability (Turing machines) is foundational for computing theory. His 1950 paper "Computing Machinery and Intelligence" — introducing the Turing Test — is foundational for AI theory. Turing is the figure where both histories most clearly overlap, which is why he can be described as "father" of both fields (though the claim is contested).

**Common event 3 — Dartmouth Conference (1956):** This is where the two traditions formally merge — McCarthy coined "Artificial Intelligence" and assembled computing and mathematics researchers to work on a unified agenda.

Before 1956, computing was primarily driven by the administration and military traditions; AI's prehistory is primarily in logic and mathematics. Their convergence at Dartmouth is the key shared moment — everything before that is mostly parallel histories.

---

### A-10 [July 2025] Paris 1951 Conference — AI as a Driving Force
> *"In the lecture, the Paris conference of 1951 was discussed. Explain how AI was a driving force for scientists to enter the field of computing."*

**Model Answer:**
The 1951 Paris conference on computing was a moment where the intellectual excitement around "thinking machines" — not just calculating ones — attracted scientists who might otherwise have stayed in pure mathematics or physics.

The lecture's argument is that **AI as a vision** was a more compelling motivation for many scientists than batch processing or accounting. The idea that a machine could replicate human reasoning — theorem-proving, language understanding, game-playing — was intellectually exciting in a way that tabulating census data was not. This vision attracted mathematicians (like McCarthy, later), logicians, and linguists into what would become computer science.

Concretely, cybernetics (Wiener, 1948) had already created a cross-disciplinary field focused on information, control, and intelligence. By 1951, European scientists attending international conferences were engaging with these ideas. The possibility of artificial intelligence gave computing a *humanistic* as well as a technical significance — it was not just about speed but about mind.

The Paris 1951 context also shows that the history of computing is not purely driven by commercial or military needs: **intellectual curiosity and the dream of artificial minds** were legitimate drivers. This is important for understanding why certain researchers invested in computing even before there was obvious commercial application.

---

### A-11 [July 2025] Grace Hopper — Direct and Indirect Contributions
> *"Grace Hopper made both direct and indirect contributions to computing and AI. Explain both."*

**Model Answer:**
Grace Hopper (1906–1992) is one of the most important figures in the history of computing, with contributions that operated at both the technical and cultural level.

**Direct contributions:** Hopper developed the first **compiler** (A-0 system, 1952), a program that translated symbolic mathematical code into machine code — a foundational step toward higher-level programming. She was the primary force behind **COBOL** (1959), the business programming language that remained dominant for decades (and still runs much banking infrastructure). Her technical insight was that computers should be programmable in something closer to natural language — a democratic vision of computing.

**Indirect contributions:** Hopper was an advocate for making computing accessible to non-specialists — a cultural and political project. Her famous phrase "it's easier to ask forgiveness than to ask permission" became a motto for technological innovation. She popularised the term **"bug"** (a literal insect found in a relay in the Mark II, 1947) — shaping how programming errors are conceptualised. As a naval officer and public figure, she legitimised women in computing at a time when the field was becoming male-dominated. Her institutional influence made COBOL an international standard.

For AI specifically: COBOL's natural-language orientation prefigured natural language processing; her compiler work showed that programs could translate between levels of abstraction — a key AI concept.

---

### A-12 [July 2025] AI and Education — Programmed Instruction vs. LOGO
> *"In the lecture, AI was discussed in relation to education. Give two examples: programmed instruction and LOGO."*

*See A-05 above — same content. Both exams ask this question in similar form.*

---

### A-13 [July 2025] Computers and Ordinary Life (1980s–90s)
> *"In the lecture, computers entering ordinary life in the 1980s and 1990s was discussed using statistics and cultural examples such as blockbusters. Explain."*

**Model Answer:**
The lecture argues that the 1980s–90s saw computing transition from institutional/professional tools to household and cultural objects — a shift measured both statistically and culturally.

**Statistical dimension:** IBM PC (1981) and Apple Macintosh (1984) → home computer ownership rises. By 1990, approximately 22% of US households owned a personal computer; by 2000, over 50%. The spread of ATMs, supermarket UPC scanners, and airline reservation systems (SABRE) meant ordinary people interacted with computing infrastructure daily without knowing it.

**Cultural dimension:** **Blockbuster** and home video (VHS standardisation battle, mid-1980s) = computers managing rental inventory and customer data at scale. The video rental store was an early example of database-driven retail. Nintendo (1983 Japan, 1985 US) = computers as home entertainment: millions of households with a general-purpose processor running interactive software. The "PC" entering living rooms was not as a computer but as a games console — **appropriation** again.

Culturally, computers appeared in advertising, films (*WarGames* 1983, *Tron* 1982, *The Terminator* 1984), and news coverage as both promising and threatening. This cultural ambivalence — the computer as liberator and as surveillance tool — was established in this decade and shapes public perception of AI today.

---

### A-14 [July 2025] Data and AI — Surveillance Capitalism
> *"In the lecture, the connection between data, AI, and surveillance capitalism was discussed. Explain."*

*See C4 (Surveillance Capitalism) in topics file + B14 (Chapter 14). Same content — frame it as an A-question line of thought.*

**Key structure for this answer:**
1. Data as raw material for both Web 2.0 and AI
2. Surveillance capitalism: user behaviour → prediction products → sold to advertisers
3. AI systems (recommenders, LLMs) trained on data collected by surveillance capitalism platforms
4. Implication: AI and surveillance capitalism are structurally entangled, not accidentally connected

---

## B-QUESTIONS

### B-01 [May 2025] Maurice Wilkes and EDSAC
> *"What was the importance of Maurice Wilkes and EDSAC in the history of computing?"*

**Model Answer:**
Maurice Wilkes (1913–2010) built the EDSAC (Electronic Delay Storage Automatic Calculator) at Cambridge in 1949 — the first practical stored-program computer to run a complete program — and wrote the first systematic programming manual.

Wilkes attended the Moore School Lectures (1946) in Philadelphia, where he absorbed Von Neumann's stored-program concept from the EDVAC design. Returning to Cambridge, he built EDSAC with a team using mercury delay-line memory. On May 6, 1949, EDSAC ran its first program — computing a table of squares.

The significance is threefold. First, **practical realisation**: while ENIAC (1945) and EDVAC (on paper) preceded it, EDSAC was the first to actually run as a stored-program machine in regular operation — demonstrating the concept worked. Second, **systematisation of programming**: Wilkes, Wheeler, and Gill published the first programming manual (*The Preparation of Programs for an Electronic Digital Computer*, 1951) — a foundational text. Third, **knowledge transfer**: Wilkes trained researchers who spread across British universities and industry, making Cambridge a hub of early British computing.

Wilkes is also significant for the Dutch connection: his work influenced van Wijngaarden's ARRA project at the Mathematisch Centrum. EDSAC thus represents the Moore School Lectures' most immediate and fruitful legacy.

---

### B-02 [May 2025] Computer Manufacturers in the 1950s
> *"In the early 1950s computer manufacturers faced the challenge of turning a scientific instrument into a product. Explain how they reconstructed the automatic computer as a business machine."*

**Model Answer:**
The early 1950s saw three types of organisations attempting to commercialise the computer: **electronics firms** (RCA, GE, Honeywell), **business machine companies** (IBM, Remington Rand, NCR, Burroughs), and **startups** (EMCC — Eckert & Mauchly; ERA).

The core challenge was cognitive, not just technical: customers needed to understand what a computer was *for* and why it was better than existing tabulating machines or human calculators. Companies solved this differently. **Eckert & Mauchly** targeted government agencies (Census Bureau → UNIVAC I, 1951; Northrop aviation → BINAC). The 1952 CBS election-night broadcast of UNIVAC's prediction (correctly forecasting Eisenhower) was the first mass public demonstration — building trust through spectacle.

**IBM** was initially cautious — Watson Sr. reportedly doubted a large commercial market. IBM's approach was incremental: introduce electronics gradually, leverage existing customer relationships, and emphasise service and compatibility. The Model 650 (1954) was aimed at existing punched-card customers — reconstruction not revolution. IBM's marketing infrastructure (salesforce, leasing model, service contracts) turned the computer from a product into a *service relationship*.

The reconstruction succeeded when computers were reframed: not as "thinking machines" (threatening, alien) but as "data processing" tools (familiar, efficient extensions of existing office practice). The IBM 1401 (1959) — with its fast printer and Report Program Generator — completed this reconstruction: computers as business infrastructure.

---

### B-03 [May 2025] IBM — "Watson Rational but Wrong, Eckert & Mauchly Irrational but Right"
> *"CK uses the phrase 'Watson was rational but wrong; Eckert and Mauchly were irrational but right.' Explain."*

**Model Answer:**
This Campbell-Kelly phrase captures the paradox of technological forecasting: rational analysis of present conditions can lead to wrong predictions about future trajectories.

**Watson was rational but wrong:** Thomas Watson Sr. (IBM) looked at the existing market — businesses that used tabulating machines for payroll, accounting, and record-keeping — and calculated that there was a small, finite demand for computers (reportedly estimated 5–10 machines worldwide). This was *rational* given 1940s conditions: computers were enormous, fragile, and astronomically expensive. IBM's existing customers had no obvious need for them. Watson prioritised IBM's profitable punch-card business.

**Eckert & Mauchly were irrational but right:** Eckert and Mauchly founded EMCC (1946) on the belief that there would be large commercial demand for computers — despite having no market evidence and serious funding problems. They built UNIVAC targeting the Census Bureau and other agencies. This was "irrational" by conventional business logic. Yet they were right: demand grew dramatically as businesses discovered what computers could do.

The lesson for history of technology: **technological trajectories are not predictable from current conditions alone**. New technologies create new markets — they don't just serve existing ones. Watson was applying rational analysis to the wrong framework. The phrase also illustrates CK's broader argument that technological history is not simply the story of rational actors making optimal decisions.

---

### B-04 [May 2025] Real-Time Computing — Military and Safety
> *"Real-time computing started as a military and safety project. Explain."*

**Model Answer:**
Real-time computing — processing information fast enough to affect ongoing events — emerged from specific military and safety requirements in the late 1940s and early 1950s.

**Project Whirlwind (1944–1953)** at MIT was originally designed as an aircraft flight simulator for the US Navy (Jay Forrester, 1944). When Perry Crawford (Office of Naval Research) convinced Forrester to go digital (1945), the project transformed into something much larger — a demonstration that digital computers could process data in real time, responding to inputs within milliseconds rather than hours. Almost cancelled for cost overruns (ONR funding exhausted by 1951), Whirlwind was saved when it became the technological foundation for SAGE.

**SAGE (Semi-Automatic Ground Environment, 1958–63):** The Cold War air-defence network required radar data from hundreds of stations to be processed centrally and presented to human operators in real time. SAGE used IBM AN/FSQ-7 computers — the largest ever built — at 23 direction centres. Militarily, SAGE was obsolete almost as soon as it was deployed (ICBMs bypassed its air-defence logic). But as a **technological demonstration**, it was transformative: it developed core memory, CRT displays, modems, light-gun interfaces, and trained thousands of engineers — most of whom moved into civilian computing careers.

The safety dimension is also present: Whirlwind's aircraft simulation heritage meant that reliability under time pressure was a design requirement from the start — a discipline that carried into civilian real-time systems.

---

### B-05 [May 2025] Software Crisis — Stakeholders
> *"In the late 1960s there was a software crisis. Who were the stakeholders involved, and what were their interests?"*

**Model Answer:**
The **software crisis** (named at the 1968 NATO Software Engineering Conference in Garmisch) described the systematic failure of large software projects to be delivered on time, within budget, and without errors. Multiple stakeholders had different interests.

**Users/clients (governments, corporations):** IBM's OS/360 operating system — designed to run on the entire System/360 product line — was years late, contained thousands of bugs, and cost far more than projected. Clients experienced real operational harm: systems they had purchased could not deliver what was promised.

**Hardware manufacturers (IBM):** IBM had bet the company on System/360 and OS/360. The crisis threatened both revenue and reputation. IBM's response was to add more programmers — which Frederick Brooks later showed was counterproductive (*The Mythical Man-Month*, 1975: adding people to a late project makes it later).

**Academics and researchers (Dijkstra, European tradition):** Viewed the crisis as a fundamental problem of method — software development lacked the rigorous mathematical discipline that mathematics and engineering applied to their problems. **Structured programming** (Dijkstra) — eliminating GOTO statements, using clear control flow — was proposed as a disciplinary solution.

**The software industry (emerging):** IBM's "unbundling" (1968) — separating software pricing from hardware — created the software industry as a distinct commercial sector. Software companies had an interest in professionalising software development, creating methods and certifications that would raise barriers to entry.

---

### B-06 [May 2025] Timesharing — Ordinary People
> *"In the chapter 'New ways of computing,' timesharing was one of the topics. How did timesharing make computing accessible to ordinary people?"*

**Model Answer:**
Timesharing solved the bottleneck of batch processing: instead of waiting hours or days for a job to run, multiple users could interact with a computer *simultaneously* via remote terminals, experiencing near-instant responses.

**Technical mechanism:** The system divided CPU time into tiny slices and switched rapidly between users — imperceptible to any individual user who experienced continuous access. Pioneered at MIT (CTSS, 1961) and commercialised by GE (one of the "seven dwarfs" who chose timesharing as a niche strategy).

**Making computing accessible:** Three shifts occurred. First, **access without ownership**: universities and businesses could connect terminals to distant mainframes without owning the computer. Second, **interactive feedback**: instead of submitting a card deck and returning the next day, users could iterate, correct errors, and explore — making computing feel manageable. Third, **BASIC** (Kemeny & Kurtz, Dartmouth, 1963): designed specifically as a programming language for non-specialists. BASIC's simplicity allowed students, teachers, and hobbyists to write programs — the first democratisation of programming.

The *Whole Earth Catalogue* (Stewart Brand, 1968) framed timesharing terminals as liberation tools — "access to tools" that could empower individuals against institutions. This countercultural framing fused with the technology in California and became part of the ideology that later produced personal computing. Timesharing was thus not just a technical development but a step in the social history of who counted as a computer user.

---

### B-07 [May 2025] Personal Computers — California Cultures
> *"Campbell-Kelly discusses the role of Californian cultures in the development of personal computing. Explain."*

**Model Answer:**
Campbell-Kelly argues that Silicon Valley's distinctive culture — a blend of counterculture, academic research, and entrepreneurial risk-taking — was a key ingredient in the personal computer revolution, not just the technology itself.

The countercultural context: By the late 1960s, the San Francisco Bay Area had developed a culture that was simultaneously anti-establishment and technologically enthusiastic. The *Whole Earth Catalogue* (Stewart Brand, 1968) epitomised this: tools — including computers — were liberation devices for individuals and communities. The Homebrew Computer Club (1975) was a direct expression of this ethos: hackers sharing technical knowledge freely, seeing the personal computer as a political act (computing *for* the people, not *by* corporations).

The resulting culture differed from East Coast institutional computing (IBM: formal, hierarchical, expensive) and from European computing (academic, government-funded). California's version combined: informal collaboration, stock option cultures, tolerance for failure and re-invention, and close university-industry links (Stanford's Office of Technology Licensing pioneered commercial tech transfer).

Apple (Jobs + Wozniak, 1976), Intel (Grove, Moore, Noyce, 1968), and later Google (Page + Brin, 1998) emerged from this specific cultural ecology. The personal computer was not just technically feasible in 1975 — it had been for some time. What made it happen then and there was the cultural and institutional infrastructure that gave it meaning and market.

---

### B-08 [May 2025] Broadening the Appeal — 1980s
> *"In the 1980s, several companies tried to broaden the appeal of personal computers. Give an example of a successful and an unsuccessful attempt."*

**Model Answer:**
The 1980s saw a wave of attempts to make personal computers accessible to non-technical users — with mixed results.

**Successful example — Apple Macintosh (1984):** The Mac introduced a graphical user interface (GUI), mouse navigation, and desktop metaphor (files, folders, trash) to a mass-market product. Its famous "1984" Super Bowl advertisement positioned it against IBM's grey institutional computing. The Mac succeeded because it reduced the cognitive barrier to entry: users did not need to learn command-line syntax. Desktop publishing (Aldus PageMaker, 1985) gave the Mac a killer use case for professionals. The Mac showed that *design* — not just power — could sell computers.

**Unsuccessful example — Apple Lisa (1983) or various GUI attempts:** The Apple Lisa (1983) preceded the Mac with a similar GUI but cost $9,995 — far beyond most buyers. Despite superior features, it failed commercially. Similarly, **VisiCorp VisiOn** (1983) attempted a GUI for IBM PCs but was too slow and expensive. These failures show that technological innovation alone is insufficient: price point, software ecosystem, and marketing must align.

The IBM PC's success (1981) came from the opposite approach: an open architecture that invited third-party software and hardware development, creating an ecosystem. IBM "broadened appeal" not by making the computer easier to use but by making it cheaper to develop for — demonstrating that broadening appeal can take different forms.

---

### B-09 [May 2025] Internet — Three Desires
> *"Campbell-Kelly calls the Internet the 'confluence of three desires.' What were they?"*

**Model Answer:**
Campbell-Kelly identifies three distinct streams of motivation that converged to produce the Internet, each with different institutions, values, and goals.

**Desire 1 — Military/governmental (survivability):** ARPANET (1969), funded by DARPA, was designed to create a communications network that could survive a nuclear attack by routing data around damaged nodes. Packet switching (Baran, 1964) was the technical solution. This desire valued **resilience and decentralisation** — no central point of failure.

**Desire 2 — Academic/scientific (information sharing):** Universities and research institutions wanted to share computing resources and data across geographical distances. Email emerged (1971, Ray Tomlinson) as the dominant application — far more used than the file-sharing and remote computing that ARPANET was designed for. This desire valued **open access and collaboration** — the internet as a library and community.

**Desire 3 — Commercial (communication and revenue):** By the early 1990s, commercial providers (CompuServe, AOL) saw a market in paid internet access and online services. The World Wide Web (Berners-Lee, CERN, 1989; public 1991) and Mosaic browser (1993) made the internet visually accessible, enabling commercial e-commerce (Amazon 1994, eBay 1995) and advertising-based services.

The tensions between these three desires persist: military surveillance vs. academic openness vs. commercial exploitation. Net neutrality debates, GDPR, and platform regulation are contemporary expressions of the same conflicts.

---

### B-10 [May 2025] Diversity and Inclusion in the 2010s
> *"Campbell-Kelly discusses diversity and inclusion in the computing industry in the 2010s. What were the main issues?"*

**Model Answer:**
By the 2010s, the computing industry had become acutely aware of — and publicly embarrassed by — its demographic skew: predominantly male, and in the US, predominantly white and Asian-American, with almost no representation from Black, Hispanic, or Indigenous communities.

**The pipeline argument vs. structural change:** Industry responses split. The "pipeline argument" held that there simply weren't enough qualified diverse candidates — a supply problem solvable by better school-level STEM education. Critics (including Safiya Umoja Noble, Joy Buolamwini) argued this missed structural barriers: hiring bias, workplace culture (bro culture, sexual harassment), lack of role models, and the historical exclusion of women and minorities from computer science education (note that early computing was dominated by women — the ENIAC programmers were women; Grace Hopper; Ada Lovelace — who were systematically marginalised as the field professionalised).

**Google's 2014 diversity report** — which triggered the broader industry conversation — showed only 30% women employees, 2% Black. Subsequent initiatives (unconscious bias training, diversity hiring goals) produced limited results. The algorithmic bias issue (facial recognition failing on dark skin; hiring algorithms replicating historical biases) added urgency.

CK frames this as both a social justice issue and a technical risk: systems designed by homogeneous teams systematically fail diverse users — the diversity problem is not separate from the AI safety problem.

---

### B-11 [May 2025] Google — Surveillance Capitalism
> *"Google developed a new business model based on search. Explain how this led to surveillance capitalism."*

*See C4 (Surveillance Capitalism) model answer + B14 in topics. The key chain:*
PageRank (1998) → better search → massive user base → revenue problem → AdWords (2000) → user data enables targeting → targeting improves with more data → surveillance capitalism loop established.

---

### B-12 [May 2025] Computing and Governance — Ethical Liability
> *"Campbell-Kelly discusses ethical liability in computing governance. Give two examples."*

**Model Answer:**
The question of who bears ethical and legal responsibility when computing systems cause harm has become one of the central challenges of the 21st century.

**Example 1 — Algorithmic discrimination:** Amazon's AI hiring tool (2018) was scrapped after it was found to systematically downrank female candidates — because it had been trained on historically male-dominated hiring data. Who is liable? The company that deployed it? The engineers who built it? The data that trained it? Current US law (Section 230, employment law) does not clearly assign responsibility. The GDPR Article 22 (right not to be subject to automated decision-making) provides an EU framework, but enforcement is complex.

**Example 2 — Autonomous vehicles:** When a self-driving car (Uber, 2018; Tesla autopilot cases) kills a pedestrian, who is criminally liable — the company, the software engineer, the "driver" who was supervising? Traditional product liability law was designed for static products; autonomous systems create new liability frameworks. The EU AI Act (2024) attempts to create tiered liability based on AI system risk level.

CK's argument is that the governance gap — between technological capability and legal/ethical frameworks — is a recurring pattern in computing history (cf. early software liability questions in the 1980s), but the stakes with AI are higher because decisions are more consequential and less transparent.

---

### B-13 [July 2025] Moore School — Pre-war, War, Post-war
> *"In what ways was Moore School relevant in the history of computing? Distinguish between the pre-war, war and post-war period."*

**Model Answer:**
The Moore School of Electrical Engineering at the University of Pennsylvania was the institutional home of the most consequential period in early computing history.

**Pre-war:** The Moore School's Differential Analyzer — a mechanical analogue computer — was one of the most powerful computing tools of the 1930s. John Mauchly visited (1941) and was struck by the potential of electronic digital computation. The Moore School was already a centre of computational thinking before WWII.

**War (1943–45):** The **BRL (Ballistics Research Laboratory)** needed firing tables for artillery — laborious to compute by hand. Mauchly and Eckert proposed an electronic digital computer. With Goldstine (BRL liaison), they received funding and built **ENIAC** (operational 1945) — the first electronic general-purpose programmable computer. Von Neumann visited (1944), joined as a consultant, and drafted the *First Draft of a Report on EDVAC* — which introduced the stored-program concept.

**Post-war (1946–50):** The Moore School Lectures (1946) were a seminal knowledge-transfer event: engineers from the UK (Newman, Williams → Manchester Baby; Wilkes → EDSAC), Europe, and the US attended and took the stored-program design home. Eckert and Mauchly left to found EMCC. The Moore School's institutional role diminished, but the knowledge it disseminated shaped every major computer project of the late 1940s.

---

### B-14 [July 2025] Off-shoring and Out-sourcing
> *"Campbell-Kelly discusses off-shoring and out-sourcing in computing. What were the consequences?"*

**Model Answer:**
From the 1980s onward, the globalisation of the computing industry took two structural forms with different consequences.

**Off-shoring** (moving work to lower-cost countries): US companies moved software development, call centres, and IT support to India (Bangalore hub: Infosys, Wipro, TCS), then Eastern Europe, Philippines, and China. Drivers: labour cost differentials (Indian software engineers cost 20–30% of US equivalents in the 1990s), improved telecommunications, and education infrastructure (IITs). Consequences: growth of a global software industry in India; creation of a new middle class; but also loss of US/European entry-level IT jobs and concerns about intellectual property.

**Out-sourcing** (contracting IT functions to specialist providers): Companies like EDS (Ross Perot), Accenture, and IBM Global Services managed clients' entire IT operations — data centres, enterprise software, helpdesks. This allowed companies to focus on core competences and convert fixed IT costs to variable. Consequence: growth of IT services as a sector; but also loss of in-house expertise and vendor lock-in.

CK's framing: globalisation created a more efficient but more interdependent computing economy. The COVID-19 pandemic (supply chain disruption) and Ukraine war (Eastern European IT workers affected) later revealed vulnerabilities in this model. The diversity implication: off-shoring created computing industries in non-Western countries that increased diversity globally but did not necessarily address diversity in US/European leadership.

---

### B-15 [July 2025] Netflix/Web 2.0/Surveillance Capitalism
> *"Explain how Netflix can be seen as an example of surveillance capitalism."*

**Model Answer:**
Surveillance capitalism (Zuboff) describes a business model in which user behaviour is collected as raw material, processed into prediction products, and used to influence future behaviour — with advertising revenue as the monetisation mechanism.

Netflix fits this model, with some modifications. Netflix is subscription-based (not ad-funded in its original form), but the surveillance capitalism logic is present in its **recommendation engine**. Every second of viewing, every pause, every re-watch, every abandoned episode generates behavioural data. This data is used to:
1. **Predict** what a user will watch next (personalised recommendations)
2. **Commission** content (data showed House of Cards would succeed before production began)
3. **Optimise** thumbnails, trailers, and even *episode structure* for engagement

The goal is maximising **watch time** — engagement that generates subscription renewals and, since 2022, also advertising revenue. Netflix users pay both with money *and* with behavioural data.

The Web 2.0 context: Netflix is part of a broader pattern where digital platforms — YouTube, Spotify, TikTok — use engagement data to create feedback loops. The recommendation algorithm doesn't just respond to preferences; it shapes them. This is the deeper surveillance capitalism claim: behaviour is not just observed but *modified* by the prediction product. This has implications for cultural diversity (algorithmic narrowing of taste) and for mental health (engagement-maximising algorithms promoting outrage, anxiety, etc.).

---

### B-16 [July 2025] Computing and Governance — US vs. EU
> *"Compare the US and EU approaches to computing governance. What are the key differences?"*

**Model Answer:**
The US and EU have developed fundamentally different legal philosophies for governing computing — differences rooted in different conceptions of rights, markets, and the role of the state.

**US approach:** Based on **market self-regulation** and **First Amendment values**. Section 230 of the Communications Decency Act (1996) shields platforms from liability for user-generated content — a foundational legal protection for the tech industry. US privacy law is fragmented (no federal data protection law; California CCPA is strongest state-level). The underlying philosophy: innovation is best promoted by minimal regulation; markets will punish bad actors; free speech trumps content control.

**EU approach:** Based on **fundamental rights** and **precautionary principle**. GDPR (2018): data protection as a fundamental right; explicit consent required; right to be forgotten; mandatory data breach notification; fines up to 4% of global turnover. EU AI Act (2024): risk-based regulation of AI systems (prohibited uses, high-risk categories, transparency requirements). The underlying philosophy: citizens need protection from both state and corporate power; rights must be proactively protected.

**Consequence:** EU has higher compliance costs and potentially slower innovation; US has faster innovation but more documented harms (algorithmic discrimination, data breaches, platform manipulation). The "Brussels Effect" (Vogel): EU regulations become de facto global standards because multinational companies find it easier to implement one standard globally than separate EU/US versions — making EU governance more influential than its market size alone would suggest.

---

## C-QUESTIONS

### C-01 [May 2025] Histories and Alternative Starting Points
> *"Historians can choose different starting points for the history of computing. Explain how the choice of a starting point reflects the historian's agenda."*

**Model Answer:**
Every history of computing begins with a choice — and that choice reveals what the historian values and who they serve.

The **standard starting point** (Campbell-Kelly, most textbooks) is ENIAC (1945) at the Moore School, Pennsylvania. This starting point foregrounds the US, military funding, and the WWII context. It serves an agenda that celebrates American technological achievement and the defence-industrial complex as drivers of progress.

**Alternative starting point 1 — Babbage (1837):** Starting with Babbage emphasises the British contribution and the theoretical foundation of computing (the stored-program concept, the difference between data and program). This agenda emphasises ideas over implementation. But: Babbage's machine was never completed; starting there makes computing seem like an interrupted Victorian dream — a narrative Aiken exploited for funding.

**Alternative starting point 2 — Hollerith (1890):** Starting with the census machine emphasises the administrative tradition and the connection between computing and statecraft — making visible the role of data collection in governance. This is an agenda that foregrounds power, surveillance, and social control.

**Alternative starting point 3 — Polish codebreakers (1932):** Starting with Rejewski, Różycki, and Zygalski breaking Enigma emphasises the European and specifically Eastern European contribution — and challenges the Anglo-American narrative. This agenda is explicitly counter-hegemonic.

The conclusion: a "starting point" is never innocent. It determines which people, nations, and traditions are made central or peripheral. Recognising agendas does not invalidate histories — it makes us more critical consumers of them.

---

### C-02 [May 2025] Defining Technology — Cybernetics (Bolter)
> *"Campbell-Kelly discusses the concept of 'defining technology' developed by J. David Bolter. Apply this concept to the role of cybernetics in the 1960s."*

**Model Answer:**
J. David Bolter (*Turing's Man*, 1984) defines a "defining technology" as one that reshapes not just what people do but how they understand themselves and their world — providing a cultural metaphor for human nature.

Applied to **cybernetics in the 1960s:** Norbert Wiener's *Cybernetics* (1948) proposed that both animals and machines could be understood as **information-processing and feedback systems** — entities that received signals, processed them, and regulated their behaviour accordingly. This metaphor became extraordinarily generative.

In **science:** Neuroscience began describing the brain in cybernetic terms (neurons as switches, reflexes as feedback loops). In **psychology:** behaviourism gave way to cognitive science — the mind as information processor. In **social science:** organisations and governments were analysed as systems with inputs, outputs, and control mechanisms (Stafford Beer's *Brain of the Firm*; Project Cybersyn in Chile, 1971–73). In **popular culture:** robots, cyborgs, and "thinking machines" entered science fiction.

Cybernetics was a "defining technology" in Bolter's sense because it provided a universal vocabulary — feedback, control, information, homeostasis — that restructured understanding across domains. By the 1970s, the language of cybernetics had penetrated economics, ecology, management theory, and medicine.

The 21st-century parallel: AI is arguably the current defining technology. Large language models and neural networks are generating new metaphors for mind, creativity, and intelligence — reshaping self-understanding in ways analogous to cybernetics in the 1960s.

---

### C-03 [May 2025] Internet and Appropriation
> *"Give an example of appropriation in the history of the Internet and explain how it changed the Internet."*

**Model Answer:**
**Appropriation** — using a technology for purposes its designers did not intend — is one of the primary mechanisms through which the Internet changed from a military/academic network into a global social infrastructure.

The clearest example is **email**. ARPANET (1969) was designed for remote login (connecting researchers to distant computers) and file transfer. Email was added as a minor utility (Ray Tomlinson, 1971). Within two years, it accounted for the majority of ARPANET traffic — users had appropriated the network for personal and professional communication that the designers had not anticipated.

Email's appropriation changed the Internet in fundamental ways: it created the expectation of person-to-person asynchronous communication over the network; it attracted a much broader user base (administrators, secretaries, faculty, students — not just engineers); and it raised the first social and legal questions about network communication (flaming, privacy, workplace monitoring).

Further appropriations followed: the World Wide Web (designed for physics paper sharing at CERN, 1989) was appropriated for e-commerce (Amazon, 1994), social networking (Facebook, 2004), and streaming video (YouTube, 2005) — none of which Berners-Lee intended.

Each appropriation expanded the Internet's user base, attracted new funding and attention, and generated new social and legal challenges. The Internet as we know it is not what anyone designed — it is an accumulation of appropriations.

---

### C-04 [May 2025] AI Winters — Babbage, Aiken, and Agendas
> *"Describe the concept of AI winters and explain how the narrative of AI winters itself serves an agenda."*

**Model Answer:**
**AI winters** are periods of drastically reduced research funding and interest in AI, following cycles of over-promising and under-delivering. Two major winters: the 1970s (following the Lighthill Report, 1973) and the late 1980s–early 90s (collapse of expert systems).

The **Babbage-Aiken parallel** is instructive. Babbage over-promised his Difference and Analytical Engines — promised completion dates repeatedly passed, government funding was withdrawn, and Babbage died in bitterness. Aiken, seeking Harvard Mark I funding in the late 1930s, invoked Babbage's legacy — presenting himself as finally realising Babbage's vision — to secure IBM support. This was an **agenda**: Aiken used a narrative of thwarted genius and inevitable progress to make his case.

The AI winter narrative operates similarly. Its use serves multiple agendas:
- **For those seeking funding:** "We are in a winter — sustained investment will bring the spring." This frames past failures as temporary and investment as the solution.
- **For critics:** "AI has always over-promised — the current excitement is another bubble." This uses history as warning.
- **For historians:** Periodising AI as "waves and winters" creates a dramatic narrative that makes AI seem teleologically directed toward a final success — which may or may not be accurate.

The deeper point: the AI winter concept is not a neutral description of history but a rhetorical tool. Recognising this does not mean there were no winters — it means we should ask who benefits from which version of the story.

---

### C-05 [July 2025] Appropriation in Computing and AI
> *"Give an example of appropriation and explain how it connects the history of computing to the history of AI."*

**Model Answer:**
**Appropriation** — repurposing a technology for uses its designers did not intend — is the key mechanism linking computing and AI histories.

The Ferranti Mark I (1951) was a commercial scientific computer. Christopher Strachey — a schoolteacher and hobbyist — programmed it to play **Nim**, a mathematical strategy game. The engineers who built the Ferranti Mark I designed it for scientific calculation; Strachey appropriated it to demonstrate symbolic reasoning. This act was foundational for AI for two reasons: it showed that a digital computer could engage in something that resembled *thinking* (strategic planning), and it inspired John McCarthy and others who attended or heard about such demonstrations to imagine broader AI research programmes.

Gaming computers were themselves then appropriated by the AI research community at Dartmouth (1956): chess-playing, draughts (Arthur Samuel's self-learning checkers programme, 1959), and theorem-proving became the standard AI benchmarks. Samuel's checkers programme is significant because it **learned** — adjusting its evaluation function based on experience — an early instance of machine learning.

The chain continues: GPU graphics processors (designed for video games in the 1990s) were appropriated by Geoffrey Hinton's team for training neural networks (2012, AlexNet) — triggering the deep learning revolution. The GPU was not designed for AI; it became the infrastructure of modern AI through appropriation.

Appropriation thus explains why the history of computing and the history of AI cannot be told separately: AI researchers consistently took computing tools designed for other purposes and turned them toward intelligence research.

---

### C-06 [July 2025] Defining Technology — AI in the 21st Century
> *"Can AI be considered a 'defining technology' in Bolter's sense for the 21st century? Discuss."*

**Model Answer:**
J. David Bolter defines a "defining technology" as one that becomes a cultural metaphor for human nature — reshaping not just what we do but how we understand ourselves.

**The case that AI is a defining technology:** AI systems — particularly large language models and generative AI — are producing new metaphors for mind and creativity. If a machine can write poetry, hold conversations, generate images, and pass bar exams, what does it mean to be human? AI is forcing re-definition: intelligence, creativity, consciousness, and personhood are all being re-examined in light of what machines can and cannot do. This is exactly Bolter's criterion: a defining technology makes us redefine ourselves.

In medicine, law, education, and art, AI is providing new vocabularies: "hallucination" (AI term) has entered general use; "prompt engineering" is a new profession; "AI-generated" is a new category that forces us to ask what "genuine" human expression means. This spread of AI vocabulary into cultural discourse mirrors how cybernetics spread in the 1960s.

**The complication:** Bolter's examples (clock, steam engine, cybernetics) were technologies that dominated their era unambiguously. AI in the 2020s is contested — its capabilities are exaggerated by advocates and minimised by critics. We may be living through a third AI summer that precedes another winter. If so, AI would not be "defining" in the durable sense Bolter requires.

**Conclusion:** AI has strong claims to be the defining technology of the early 21st century, but its status is not yet settled. The critical question is whether the cultural transformation it is producing will persist — or whether, like cybernetics, it will be absorbed into the next paradigm.

---

## ASSIGNMENT QUESTIONS (for practice)

| Assignment | Question | Type |
|-----------|----------|------|
| 1.1 | Prehistory of computing cannot be understood as one history — explain | A |
| 1.2 | History of AI is older than history of computing — explain the line of thought | A |
| 1.3 | Early 20th century artificial languages — give 2 examples + relevance to AI | A |
| 1.4 | Digital culture as defining characteristic — give personal example + implications | C |
| 2.1 | AI was a main drive for scientists to enter computing — explain | A |
| 2.2 | Moore school — relevance pre-war, war, post-war | B |
| 2.3 | Dutch Dinosaurs — 2 pioneers + achievements + representativeness | C |
| 2.4 | To what extent can Alan Turing be regarded as the father of AI? | C |
| 3.1 | Computing sounds in 1950s — two ways + why speakers were connected | A |
| 3.2 | Real-time computing — CK's line of thought (military + entrepreneurial) | B |
| 3.3 | IBM and seven dwarfs — other manufacturers' roles + example of success | B |
| 3.4 | UPC — political as much as technical feat + connection to AI history | C |
| 4.1 | Mathematicians interested in proof checkers → mathematics by computer | A |
| 4.2 | FORTRAN vs. ALGOL 60 — differences + similarities using concept of agendas | B |
| 4.3 | BASIC — why it fits CK's "new ways of computing" chapter | B |
| 4.4 | Software crisis — what was in crisis, how solved, US vs. European perspective | C |
