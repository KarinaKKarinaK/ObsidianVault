
---

## Mock Exam: Knowledge & Data (34 Questions)

### Section 1: Foundations, Logic, and RDF Model

**Q1. According to Forbes (as cited in the sources), what percentage of a Data Scientist's work is generally attributed to data preparation, linking, and cleaning?** A. Approximately 20% B. Approximately 50% C. Approximately 80% D. Approximately 99%

**Q2. What is the goal of defining knowledge formally (Explicit Knowledge)?** A. To guarantee that all data is stored in relational databases. B. To allow for predictable inferencing, thereby increasing data reusability. C. To force the use of natural language descriptions. D. To ensure that the system operates strictly under the Closed World Assumption (CWA).

**Q3. Let $\text{KB}$ be a knowledge base and $\text{F}$ a formula. Which statement accurately defines entailment ($\text{KB} \vDash \text{F}$) in a formal system?** A. $\text{F}$ is entailed by $\text{KB}$ if there is at least one model of $\text{KB}$ that is also a model of $\text{F}$. B. $\text{F}$ is entailed by $\text{KB}$ if and only if $\text{F}$ is true in every model (interpretation) where $\text{KB}$ is true. C. $\text{F}$ is entailed by $\text{KB}$ if $\text{F}$ is syntactically a subgraph of $\text{KB}$. D. If $\text{KB}$ has no models, then nothing is entailed.

**Q4. Consider the propositional formula: $\text{p} \to (\neg \text{q} \land \text{r})$. Which of the following interpretations is a model?** A. $I(\text{p})=\text{True}, I(\text{q})=\text{True}, I(\text{r})=\text{True}$. B. $I(\text{p})=\text{True}, I(\text{q})=\text{False}, I(\text{r})=\text{True}$. C. $I(\text{p})=\text{True}, I(\text{q})=\text{False}, I(\text{r})=\text{False}$. D. $I(\text{p})=\text{False}, I(\text{q})=\text{True}, I(\text{r})=\text{False}$.

**Q5. Which of the following is _not_ one of the four proposals for achieving a Web of Linked Data?** A. Relations between things form Graphs of Data. B. Names are addresses on the Web. C. Use propositional logic to represent classes and instances. D. Add explicit semantics (formal knowledge) to allow for predictable inferencing.

**Q6. Which line of RDF Turtle syntax correctly uses a shorthand mechanism?** A. `ex:Rembrandt "painted" ex:theNightWatch .` B. `@prefix ex: <http://example.org/> . ex:a ex:p ex:b , ex:c , ex:d .` C. `ex:a ex:p ex:b . ex:c ex:p ex:d .` D. `ex:a :b :c .`

**Q7. Let $\text{KG}={(\text{a}, \text{p}, \text{b}), (\text{b}, \text{q}, \text{a})}$ be a knowledge graph in Simple KG logic. Which of the following interpretations is a model of $\text{KG}$?** A. $(U, I)$ with $U={1, 2}, I(\text{a})=1, I(\text{b})=2, I(\text{p})={(1, 2)}, I(\text{q})={(1, 1)}$. B. $(U, I)$ with $U={1, 2}, I(\text{a})=2, I(\text{b})=2, I(\text{p})={(1, 2)}, I(\text{q})={(2, 2)}$. C. $(U, I)$ with $U={1, 2}, I(\text{a})=2, I(\text{b})=1, I(\text{p})={(2, 1)}, I(\text{q})={(1, 2)}$. D. $(U, I)$ with $U={1, 2}, I(\text{a})=1, I(\text{b})=2, I(\text{p})={(2, 1)}, I(\text{q})={(1, 2)}$.

**Q8. What is the primary function of a **Blank Node** (`_:id` or `[ ]`) in RDF?** A. It represents a specific, named instance on the Web, identified by a URI. B. It is used exclusively to represent literal values like strings or numbers. C. It denotes a resource without a URI, serving as an **existential quantifier**. D. It represents a variable in a SPARQL query pattern.

### Section 2: SPARQL, Triple Stores, and RDFS

**Q9. Which pair of SPARQL query types returns an RDF graph as output, rather than a table of variable bindings or a boolean value?** A. `SELECT` and `ASK`. B. `CONSTRUCT` and `DESCRIBE`. C. `INSERT` and `DELETE`. D. `FILTER` and `UNION`.

**Q10. Which SPARQL keyword facilitates querying data from external SPARQL endpoints, enabling data integration?** A. `UNION`. B. `OPTIONAL`. C. `FILTER`. D. `SERVICE`.

**Q11. Given the query `SELECT ?x (COUNT(?y) as ?nb_y) WHERE { ?y ex:studies ?x } GROUP BY (?x) ORDER BY DESC (?nb_y)`, what does this query try to achieve?** A. Return a table listing people who study in a specific city. B. Return a list of study programmes ($\text{?x}$) and the count of students studying in each program ($\text{?nb_y}$), ordered by the count. C. Return a list of properties that are sub-properties of `ex:studies`. D. Return a single count of all triples matching the pattern.

**Q12. How do Triple Stores, such as GraphDB, typically achieve fast querying (JOIN handling) in SPARQL?** A. By operating strictly under the Closed World Assumption (CWA). B. By avoiding the use of URIs entirely, replacing them with short hashes. C. By indexing the data in various ways (e.g., subject, object, predicate, and combinations) and using dictionaries. D. By supporting only the `SELECT` query type over HTTP.

**Q13. Given the RDFS graph: ${(\text{ex:S } \text{rdfs:subClassOf } \text{ex:T}), (\text{ex:s } \text{rdf:type } \text{ex:S}) }$. Which new triple is inferred by RDFS entailment rule 10?** A. $\text{ex:S } \text{rdf:type } \text{rdfs:Class}$. B. $\text{ex:T } \text{rdf:type } \text{rdfs:Class}$. C. $\text{ex:s } \text{rdf:type } \text{ex:T}$. D. $\text{ex:S } \text{rdfs:subClassOf } \text{ex:S}$.

**Q14. Given the axioms: {(\text{ex:likes } \text{rdfs:domain } \text{ex:Human}), (\text{ex:Stefan } \text{ex:works_with } \text{ex:Laptop}) }. What is the undesirable triple inferred using RDFS Domain rules (rdfs2)?** A. \text{ex:works_with } \text{rdf:type } \text{rdf:Property}. B. \text{ex:works_with } \text{rdfs:range } \text{ex:Human}. C. $\text{ex:Laptop } \text{rdf:type } \text{ex:Human}$ (This relies on \text{ex:works_with} having domain $\text{ex:Human}$, rather than $\text{ex:likes}$). D. $\text{ex:Stefan } \text{rdf:type } \text{ex:Human}$.

**Q15. Which statement is true regarding the expressivity of taxonomies, ontologies, and SKOS?** A. An ontology is more expressive than a taxonomy. B. To express basic hierarchies, OWL is required. C. In formal logic terms, SKOS is generally more expressive than OWL. D. A taxonomy includes complex restrictions like cardinality and disjointness.

**Q16. Vocabularies like FOAF and Dublin Core primarily assist data reuse by providing:** A. Strict, powerful formal semantics for deep inferencing. B. Standardized URIs for common concepts and properties, providing a **social semantics** to a formal language. C. Pre-defined RDFS entailment rules not available in standard RDF. D. Mechanisms to enforce the Closed World Assumption (CWA).

### Section 3: OWL and Advanced Inferencing

**Q17. Which fundamental OWL element is commonly used to indicate that a set of axioms defining a class or individual leads to a logical contradiction?** A. `owl:Thing`. B. `owl:disjointWith`. C. `owl:equivalentClass`. D. `owl:Nothing` (since no individual can be an instance of $\text{owl:Nothing}$).

**Q18. Given the Knowledge Graph: $\text{ex:C } \text{owl:unionOf } (\text{ex:A } \text{ex:B})\text{. } \text{ex:a } \text{rdf:type } \text{ex:A}$. What is derived (is entailed)?** A. $\text{ex:A } \text{owl:intersectionOf } \text{ex:B}$. B. $\text{ex:a } \text{rdf:type } \text{ex:C}$. C. $\text{ex:a } \text{owl:differentFrom } \text{ex:b}$. D. The knowledge base is inconsistent.

**Q19. A property $\text{p}$ is defined as $\text{ex:p } \text{rdf:type } \text{owl:FunctionalProperty}$. If two statements exist: $\text{ex:x } \text{ex:p } \text{ex:y}$ and $\text{ex:x } \text{ex:p } \text{ex:z}$, what is derived?** A. $\text{ex:x } \text{owl:sameAs } \text{ex:y}$. B. $\text{ex:y } \text{owl:sameAs } \text{ex:z}$. C. $\text{ex:x } \text{owl:differentFrom } \text{ex:z}$. D. Nothing, as this requires an `owl:InverseFunctionalProperty`.

**Q20. Which of the following relationships are both **symmetric** and **irreflexive**? (Based on examples from family relations)** A. `fatherOf`. B. `motherOf`. C. `siblingOf`. D. `ancestorOf`.

**Q21. When defining a Class Restriction, using $\text{rdfs:subClassOf}$ (e.g., $\text{ex:R } \text{rdfs:subClassOf } [\text{Restriction } \text{C}]$) means you have applied what type of logical condition?** A. Necessary and sufficient condition. B. Only a sufficient condition. C. Only a necessary condition. D. An assertion of identity.

**Q22. Consider the OWL ontology fragment: $\text{ex:EuropeanCitizen } \text{rdfs:subClassOf } [\dots \text{owl:onProperty } \text{ex:citizenOf} \text{; } \text{owl:someValuesFrom } \text{ex:EuropeanCountry}]$. If $\text{ex:john } \text{ex:citizenOf } \text{ex:netherlands}$ and $\text{ex:netherlands } \text{rdf:type } \text{ex:EuropeanCountry}$ are true, what can be derived?** A. $\text{ex:john } \text{rdf:type } \text{ex:EuropeanCountry}$. B. $\text{ex:john } \text{rdf:type } \text{ex:EuropeanCitizen}$. C. $\text{ex:netherlands } \text{rdf:type } \text{ex:EuropeanCitizen}$. D. $\text{ex:john } \text{rdf:type } \text{ex:Person}$.

**Q23. Why do Universal Restrictions (`owl:allValuesFrom`) combined with `owl:equivalentClass` (necessary and sufficient conditions) often fail to infer class membership in OWL?** A. Because they can only be used on Datatype Properties. B. Due to the **Open World Assumption (OWA)**, the knowledge base cannot assume that all required property values are present. C. Because all values must be explicitly enumerated using `owl:oneOf`. D. Because $\text{owl:allValuesFrom}$ always creates an inconsistency.

**Q24. To define a class where all members must have a specified property relation with _themselves_ (e.g., defining a Narcissist as someone who loves themselves), which property is required?** A. `owl:FunctionalProperty`. B. `owl:allValuesFrom`. C. `owl:hasSelf` (Boolean). D. `owl:maxQualifiedCardinality`.

### Section 4: Ontology Engineering, Alignment, and Complexity

**Q25. In the Ontology Engineering 101 methodology (Noy & McGuinness), what step immediately follows "Enumerate Terms"?** A. Define instances. B. Define taxonomy. C. Check for anomalies. D. Define properties.

**Q26. What is the main purpose of defining **Competency Questions** during the Ontology Engineering process?** A. They serve as a final check for logical inconsistencies using a reasoner. B. They determine the purpose and scope of the ontology by specifying what users want to know. C. They define the formal semantics (interpretations and models) of the language used (e.g., OWL). D. They ensure that data integration relies only on proprietary formats like CSVW.

**Q27. When building an ontology in an Open World, making an overly restrictive statement that might lead to unintended inferences or contradictions is known as:** A. Punning. B. Over-commitment. C. Ontological alignment. D. Using Blank Nodes.

**Q28. What are the two most prevalent semantic relations used to define **Ontology Alignments** between entities in different ontologies?** A. `owl:differentFrom` and `owl:propertyChainAxiom`. B. **Equivalence** ($\equiv$) and **Subsumption** ($\sqsubseteq$). C. `skos:broader` and `skos:related`. D. Negation ($\neg$) and Intersection ($\cap$).

**Q29. How do Language Models (LMs) primarily assist modern ontology alignment systems (e.g., BERTMap)?** A. They define the computational complexity of the alignment task. B. They leverage strong language understanding to align linguistic variations (synonyms, aliases) found in labels and annotations. C. They replace the need for SPARQL engines entirely. D. They enforce the Unique Naming Assumption (UNA).

**Q30. What technique is characteristic of the BERTMap algorithm for efficient ontology alignment?** A. It exclusively uses structural matching based on `rdfs:subClassOf`. B. It pairs a Language Model (BERT) with efficient candidate selection (using corpora and refinement/repair modules) to achieve non-quadratic complexity. C. It performs alignment purely in a zero-shot setting without any fine-tuning. D. It relies solely on aligning concepts defined using `owl:hasSelf`.

**Q31. What is the complexity (in terms of Big-O notation, $n$ nodes, $m$ edges) of the Dijkstra algorithm when implemented using a heap data structure to manage unvisited nodes?** A. $\text{O}(n \log n)$. B. $\text{O}((m+n) \log n)$. C. $\text{O}(n \cdot m)$. D. $\text{O}(n)$.

**Q32. What is the running time (in terms of Big-O) for the **DELETE** operation in a heap data structure?** A. $\text{O}(n)$. B. $\text{O}(1)$. C. $\text{O}(\log n)$. D. $\text{O}(n \log n)$.

**Q33. What is the Big-O complexity of a straight-forward implementation (without specialized data structures) of **Prim's algorithm**?** A. $\text{O}(n \log m)$. B. $\text{O}(n^2)$. C. $\text{O}(m+n)$. D. $\text{O}(m \cdot n)$.

**Q34. Which statement is generally TRUE about Depth-First Search (DFS) and Breadth-First Search (BFS) graph algorithms?** A. BFS is always faster than DFS in finding the shortest path. B. The maximum memory taken by DFS is proportional to the tree width; maximum memory taken by BFS is proportional to the tree depth. C. The maximum memory taken by DFS is proportional to the tree depth; maximum memory taken by BFS is proportional to the tree width. D. We use DFS if we know the solution is far from the source vertex.

---

## Answer Key

|Q#|Answer|Q#|Answer|Q#|Answer|Q#|Answer|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|**1**|C|**10**|D|**19**|B|**28**|B|
|**2**|B|**11**|B|**20**|C|**29**|B|
|**3**|B|**12**|C|**21**|C|**30**|B|
|**4**|B|**13**|C|**22**|B|**31**|B|
|**5**|C|**14**|D|**23**|B|**32**|C|
|**6**|B|**15**|A|**24**|C|**33**|D|
|**7**|C|**16**|B|**25**|B|**34**|C|
|**8**|C|**17**|D|**26**|B|||
|**9**|B|**18**|B|**27**|B|||