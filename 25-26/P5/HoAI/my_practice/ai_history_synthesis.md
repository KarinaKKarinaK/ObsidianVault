# AI History — Tied Into Computing History
> Cross-reference with: [[HAI_topics]], [[HAI_9_playbook]], [[HAI_question_bank]]
> This document maps AI developments alongside the computing history from CK + lectures, period by period.
> Use for C-questions that ask you to synthesise both threads.

---

## THE CORE ARGUMENT

AI and computing share a prehistory but diverge in their origins:
- **Computing** grew from the *administration* tradition (census, banking, insurance)
- **AI** grew from the *science/logic* tradition (mathematics, formal proof, philosophy of mind)
- They **converge at Dartmouth 1956**, and are intertwined ever since

The recurring pattern across every period: **AI borrows computing infrastructure → AI produces ideas that reshape computing**.

---

## PERIOD 1 — PREHISTORY (before 1940)

| Computing thread | AI thread | Connection |
|---|---|---|
| Babbage Difference Engine (1822), Analytical Engine (1837) | Leibniz's *Calculus Ratiocinator* (17th c.); Boole's logic (1847); Russell & Whitehead *Principia Mathematica* (1910–13) | Both dream of mechanised reasoning; Babbage's design includes a conditional branch — proto-AI architecture |
| Hollerith tabulating machine (1890 Census) | Ramon Llull's *Ars Magna* (13th c.); Aristotle's syllogism | Completely separate traditions — AI is in logic/philosophy, computing is in administration |
| Dutch waterworks calculations (Lorentz, Lely, 1910s–20s) | Esperanto and universal language projects (1887) | Both involve the dream of a universal, unambiguous language — one for water, one for thought |

**Key point for C-questions:** The prehistory of AI is *older* than the prehistory of computing. Computing emerged from a need to count faster; AI emerged from a need to reason formally.

---

## PERIOD 2 — WWII AND IMMEDIATE POST-WAR (1940–1950)

| Computing thread | AI thread | Connection |
|---|---|---|
| ENIAC (Eckert & Mauchly, 1945) — ballistics tables | Turing's "Computing Machinery and Intelligence" (1950) — Turing Test | Turing worked on Colossus (codebreaking) during the war — both traditions use the same wartime infrastructure |
| Moore School Lectures (1946) — spread stored-program concept across Europe | Cybernetics (Norbert Wiener, 1948) — brain/machine equivalence | Wiener attended overlapping circles; cybernetics gave AI a theoretical vocabulary before the term "AI" existed |
| Ferranti Mark I (UK, 1951), EDSAC (Wilkes, Cambridge, 1949), ARRA (van Wijngaarden, Amsterdam, 1952) | Strachey plays Nim on Ferranti Mark I (1951); Turing writes chess algorithm (1953) | **Appropriation moment**: the first AI demonstrations run on machines built for science, not for AI |
| Watson Sr. thinks demand is 5–10 machines worldwide | Cybernetics suggests intelligent machines are possible | IBM's underestimation is partly because they saw computers as calculators, not reasoning machines |

**Key CK phrase:** "Computing was not performed for its own sake, but always as a means to an end" (Moore School) — but for AI researchers, the *end* was intelligence itself, not calculation.

---

## PERIOD 3 — COMPUTING BECOMES BUSINESS / AI IS NAMED (1950–1960)

| Computing thread (CK Ch 5–6) | AI thread | Connection |
|---|---|---|
| UNIVAC on CBS predicts 1952 election → public trust in computing | 1956 Dartmouth Conference → "Artificial Intelligence" coined (McCarthy) | Both events use spectacle to establish legitimacy — UNIVAC on TV, Dartmouth as founding narrative |
| IBM 650 (1954) becomes first mass-market computer | Logic Theorist (Newell & Simon, 1955–56) — first AI program, proves theorems from *Principia Mathematica* | The Logic Theorist runs on an early computer — AI immediately appropriates computing hardware |
| IBM 1401 (1959) — Report Program Generator, ordinary business use | LISP (McCarthy, 1958) — first AI programming language, based on Church's lambda calculus | Two very different visions of what computers are *for* — business data vs. symbolic reasoning |
| "Electronic brain" metaphor in British press (EDSAC, early 1950s) | Dartmouth proposal (1956): "every aspect of learning or any feature of intelligence can be so precisely described that a machine can be made to simulate it" | The "electronic brain" metaphor both enables AI (if it's a brain, it can think) and creates problems (public fear, unrealistic expectations) |

**Key concept — Agendas:** McCarthy chose "Artificial Intelligence" deliberately to distinguish from cybernetics (Wiener's term) and to stake out a new field. The name itself was an agenda — separating from biology-influenced cybernetics toward a more formal, mathematical programme.

---

## PERIOD 4 — MAINFRAMES, TIMESHARING, AI OPTIMISM (1960–1970)

| Computing thread (CK Ch 6–9) | AI thread | Connection |
|---|---|---|
| IBM System/360 (1964) — unified architecture | DENDRAL (1965, Stanford) — expert system for chemistry; SIR (1964, Raphael) — semantic information retrieval | Both represent consolidation: computing consolidates around one architecture; AI consolidates around symbolic/rule-based systems |
| Timesharing (CTSS, MIT, 1961; GE as niche player) | MIT AI Lab (1959); Stanford AI Lab (1963) — both use timesharing computers | AI research happens on the *same machines* as timesharing demos; interactive computing and interactive AI develop together |
| BASIC (Dartmouth, 1963) — programming for non-specialists | Programmed Instruction (Skinner, 1960s) — AI in education; LOGO (Papert, MIT, 1967) — constructivist AI | Education is the first mass-market application of AI, using the same democratising impulse as BASIC |
| Whole Earth Catalogue (Brand, 1968) — "access to tools" | ELIZA (Weizenbaum, MIT, 1966) — natural language chatbot; people think it's human | Both represent computing entering culture: one as liberation tool, one as social mirror |
| IBM 1968 unbundling — software becomes a separate industry | Software crisis (1968 NATO conference); Dijkstra's structured programming | AI is affected too — LISP machines become a separate hardware niche; the boundary between AI and software engineering is contested |

**Key concept — Defining Technology (Bolter):** Cybernetics and computing in the 1960s were a *defining technology* — the metaphor "brain as information processor" reshaped psychology (cognitive science), management (Beer/Cybersyn), and philosophy. This is why AI could attract so much funding: it wasn't just engineering, it was about human nature.

---

## PERIOD 5 — MINICOMPUTERS, PC ORIGINS, AI WINTER 1 (1970–1980)

| Computing thread (CK Ch 9–10) | AI thread | Connection |
|---|---|---|
| PDP minicomputers (DEC) — new users, smaller scale | Lighthill Report (UK, 1973) — AI hasn't delivered; DARPA cuts funding → First AI Winter | Both: over-promise leads to disappointment. Computing survived because it had concrete business applications; AI didn't have those yet |
| *Whole Earth Catalogue*, Homebrew Computer Club (1975), Altair 8800 | PROLOG (Colmerauer, 1972) — logic programming; expert systems begin to take off | Hobbyist computing culture and AI research co-exist but barely interact; hobbyists are doing real-time gaming; AI is in university labs |
| UNIX (Bell Labs, Thompson & Ritchie, 1969–73) — ideas from MULTICS failure | AI winters: Minsky & Papert *Perceptrons* (1969) discredits neural networks for a decade | Both: established ideas get critiqued (MULTICS too complex → UNIX simplicity; perceptrons too limited → symbolic AI dominates) |
| Apple I (1976), Apple II (1977) — hobbyist → early adopter market | Backpropagation theory develops (Werbos 1974, popularised by Rumelhart & McClelland 1986) — but ignored until 1980s | AI's key future tool (backprop) is being developed just as personal computing is born — they will converge 40 years later |

---

## PERIOD 6 — PERSONAL COMPUTERS, BROADENING APPEAL, AI SUMMER & WINTER 2 (1980–1995)

| Computing thread (CK Ch 10–11) | AI thread | Connection |
|---|---|---|
| IBM PC (1981) — open architecture, legitimises personal computing | Expert systems boom (XCON at DEC, 1982; Symbolics LISP machines) — AI winter thaws, large corporate AI investment | Same decade, opposite trajectories: PCs democratise computing; AI becomes more expensive and specialised (LISP machines cost $50,000+) |
| Macintosh (1984) — GUI, "computer for the rest of us" | 5th Generation Computer Project (Japan, 1982–1992) — government-funded AI programme; triggers US/UK AI investment as competitive response | Political and commercial pressure to invest in AI parallels the PC industry's commercial competition |
| VisiCalc (1979), Lotus 1-2-3 (1983) — killer apps for PC | MYCIN (medical diagnosis, Stanford) — killer app concept for expert systems | Both show that applications drive adoption; the PC's killer app is the spreadsheet; AI's killer app attempt is the expert system |
| Compaq (1982) — first PC clone; price competition | Expert systems collapse (~1987–92) — too brittle, too expensive, too narrow → **Second AI Winter** | Computing survived commoditisation by price competition; AI could not — expert systems couldn't be commoditised |
| Internet (ARPANET → NSFNET → commercialisation; WWW Berners-Lee 1989) | Backpropagation rediscovered (Rumelhart et al., 1986); neural network interest revives | The second AI winter coincides with the birth of the web — computing moves forward, AI retreats |
| Arthur Samuel's checkers program (1959) + later chess programs | Deep Blue vs. Kasparov (1997) — IBM's chess machine beats world champion | Chess as the 40-year benchmark: from Shannon's 1950 paper to Deep Blue, computing infrastructure enabled the AI milestone |

**CK connection — Appropriation:** SABRE (airline reservations) + credit cards + ATMs = real-time computing applied to civilian life. AI's equivalent in this period is expert systems being "appropriated" from university labs into corporations — but the appropriation mostly fails because the technology is too brittle.

---

## PERIOD 7 — THE WEB, GOOGLE, SURVEILLANCE CAPITALISM, AI SPRING (1995–2015)

| Computing thread (CK Ch 11–14) | AI thread | Connection |
|---|---|---|
| WWW commercialises (Netscape 1994, Amazon 1994, eBay 1995) | Machine learning shift: statistical methods replace symbolic AI; SVM (Vapnik, 1995); boosting algorithms | Both: shift from hand-crafted rules to data-driven, statistical approaches |
| Google (1998) — PageRank + AdWords = surveillance capitalism | PageRank *is* a machine learning algorithm (graph-based ranking); AdWords learns user preferences | **Google is AI infrastructure**: PageRank is applied ML; recommendation systems are ML. The computing company and the AI company are the same company |
| Web 2.0 (mid-2000s): user-generated content, behavioural data as commodity | ImageNet (Fei-Fei Li, 2009) — 14M labelled images scraped from web; enables deep learning | Web 2.0 data *is* the training data for modern AI. Without Google Images, Flickr, Wikipedia, there is no deep learning revolution |
| Netflix launches streaming (2007) — recommendation engine drives engagement | AlexNet (Hinton et al., 2012) — deep learning beats all other methods on ImageNet → deep learning revolution | The GPU used to train AlexNet was a games hardware chip — appropriation again |
| iPhone (2007) — smartphone puts computing in every pocket | Siri (Apple, 2011), Google Now (2012), Cortana (2014) — AI as mainstream consumer product | AI enters ordinary life through the same device that put the internet in every pocket |
| Facebook, Twitter, YouTube — social data at scale | Large Language Models begin (word2vec 2013, seq2seq 2014) | Social platforms generate text data at unprecedented scale — the corpus for LLMs |

**Key concept — Surveillance Capitalism (Zuboff):** The entanglement is structural, not accidental. Google's business model requires AI (to improve targeting); AI requires Google's data (to train models). They are co-constitutive. The same is true for Facebook/Meta, Amazon, Netflix.

---

## PERIOD 8 — DEEP LEARNING, LLMs, AI AS DEFINING TECHNOLOGY (2015–present)

| Computing thread | AI thread | Connection |
|---|---|---|
| Cloud computing (AWS, Azure, GCP) replaces on-premise servers | GPT-2 (2019), GPT-3 (2020), GPT-4 (2023), Claude, Gemini — scale requires cloud | AI couldn't exist at current scale without cloud computing infrastructure |
| GPU hardware (NVIDIA) becomes the defining chip — originally for gaming | AlphaGo (DeepMind, 2016) beats Lee Sedol; AlphaFold (2020) solves protein folding | Games again: AlphaGo is the chess moment of the 2010s. The GPU appropriation (games → AI) is now complete |
| EU GDPR (2018), EU AI Act (2024) — governance responses | Algorithmic bias (Amazon hiring tool 2018; COMPAS recidivism scoring) — AI as ethical liability | Governance thread in CK Ch 15 is directly about AI governance — computing governance and AI governance converge |
| Platform concentration (Google, Apple, Meta, Amazon, Microsoft) | OpenAI (2015), Anthropic (2021), Google DeepMind (2014/2023) — AI labs inside or adjacent to platforms | The "big tech" computing story and the "AI lab" story are now one story |
| Digital divide — who has access to internet and computing | AI divide — who has access to AI tools; whose data trains AI; who is harmed by AI systems | The digital divide (CK Ch 13 globalisation) reappears as an AI divide; same structural dynamics |

**Key concept — Defining Technology (Bolter):** AI in the 2020s is reshaping self-understanding across domains: "hallucination," "prompt engineering," "AI-generated" as cultural categories; debates about creativity, consciousness, and what humans are *for* — exactly Bolter's criterion.

---

## THE KEY CONCEPTS — APPLIED ACROSS BOTH THREADS

### Appropriation
| Computing example | AI parallel |
|---|---|
| SAGE (military) → SABRE (airline reservations) | Ferranti Mark I (scientific) → Nim (AI demo) |
| Internet (military) → email → commercial web | GPUs (games) → AlexNet → deep learning |
| WWW (physics paper sharing) → e-commerce | ImageNet (web-scraped images) → computer vision |

### Agendas
| Computing example | AI parallel |
|---|---|
| Aiken uses Babbage to get Harvard/IBM funding | McCorduck writes *Machines Who Think* to advocate for AI field |
| IBM used System/360 as "bet the company" narrative | "AI winter/spring" narrative used to secure continued investment |
| "Two boys in a garage" myth (Silicon Valley) | "The Dartmouth conference founded AI" myth (obscures earlier work) |

### Defining Technology (Bolter)
| 1960s | 2020s |
|---|---|
| Cybernetics: brain as feedback system | AI: intelligence as computation |
| Computers reshape psychology (cognitive science), management (Cybersyn) | LLMs reshape education, law, medicine, art |
| Universal metaphor: information + control | Universal metaphor: training + inference |

### Surveillance Capitalism
- Computing thread: Google (AdWords), Netflix (recommendation), Facebook (social graph)
- AI thread: these platforms' data *is* what trained modern AI
- They are the same story — the business model and the technology are structurally entangled

---

## EXAM CHEAT SHEET — C-QUESTION COMBINATIONS

| If the question asks about... | Use these threads together |
|---|---|
| Histories / alternative starting points | AI prehistory (Leibniz, Babbage) vs. computing prehistory (Hollerith) + agendas |
| AI winters vs. Babbage/Aiken | Aiken's agenda + AI winter rhetoric + McCorduck + both use history to secure funding |
| Defining technology (Bolter) | Cybernetics 1960s (computing + AI together) → AI 2020s (both threads converge) |
| Appropriation | Pick *one* clean chain: Ferranti/Nim → chess → GPU/AlexNet; OR SAGE→SABRE + real-time AI |
| Silicon Valley vs. non-Valley | Computing: Stanford/VC/defence triangle; AI: DARPA funding, MIT/Stanford AI labs → same geography |
| Surveillance capitalism / data culture | Web 2.0 creates data → same data trains AI → same governance response (GDPR) |
