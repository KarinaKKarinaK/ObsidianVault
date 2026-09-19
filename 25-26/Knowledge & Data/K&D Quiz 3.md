

---

## 🧠 **Knowledge & Data — Mock Final Exam**

---

### **Lecture 1–2: Data, Information, Knowledge, and Formal Representation**

**(1 pt)** 1️⃣ Which of the following best expresses the relationship between data, information, and knowledge?  
A. Information becomes data when interpreted in context  
B. Data + context = information; information + understanding = knowledge  
C. Knowledge can only be obtained through formal logic  
D. Data and information are interchangeable in knowledge graphs

---

**(2 pts)** 2️⃣ _Choose one or more:_ Which statements about _formal knowledge representation_ are correct?  
A. It provides a shared and explicit understanding of meaning  
B. It allows computers to infer new knowledge from existing facts  
C. It always assumes a closed-world view  
D. It removes ambiguity from interpretation

---

**(1 pt)** 3️⃣ Which of the following best describes _explicit knowledge_?  
A. Personal intuition and skills  
B. Knowledge that cannot be shared  
C. Knowledge that is codified and stored  
D. Knowledge dependent on experience only

---

**(1 pt)** 4️⃣ Knowledge graphs make semantics explicit by:  
A. Using labeled nodes and edges to represent entities and relations  
B. Converting data into tables for machine readability  
C. Removing redundancy from datasets  
D. Relying solely on numerical data

---

### **Lecture 3–4: RDF, URIs, Linked Data, SPARQL**

**(2 pts)** 5️⃣ RDF triples describe statements about resources. Which of the following triples is **well-formed**?  
A. ("Amsterdam", hasCapital, ex:Netherlands)  
B. (ex:Netherlands, ex:hasCapital, ex:Amsterdam)  
C. (ex:hasCapital, ex:Netherlands, ex:Amsterdam)  
D. (Amsterdam, Netherlands, hasCapital)

---

**(1 pt)** 6️⃣ In RDF, which component of a triple can **never** be a literal?  
A. Subject  
B. Predicate  
C. Object  
D. None — all can be literals

---

**(2 pts)** 7️⃣ _Choose one or more:_ Which of the following statements about Linked Data principles are correct?  
A. Use URIs as names for things  
B. Use HTTP URIs so that people can look them up  
C. Provide structured metadata only for static pages  
D. Include links to other URIs so users can discover more things

---

**(1 pt)** 8️⃣ What is the function of an RDF schema (RDFS)?  
A. To visualize data  
B. To define vocabularies and relationships between resources  
C. To query linked data  
D. To store data in relational tables

---

**(2 pts)** 9️⃣ In SPARQL, the pattern-matching part of a query appears in which clause?  
A. FILTER  
B. WHERE  
C. ORDER BY  
D. SELECT

---

### **Lecture 5–6: RDFS Semantics, Entailment, Triple Stores**

**(2 pts)** 🔟 _Choose one or more:_ Which entailments are valid under RDFS semantics?  
A. If ex:Dog rdfs:subClassOf ex:Animal and ex:Rex rdf:type ex:Dog → ex:Rex rdf:type ex:Animal  
B. If ex:owns rdfs:domain ex:Person and ex:Anna ex:owns ex:Dog → ex:Anna rdf:type ex:Person  
C. If ex:Dog rdfs:range ex:Animal → all dogs are animals  
D. If ex:hasFriend rdfs:range ex:Person and ex:John ex:hasFriend ex:Cat → ex:Cat rdf:type ex:Person

---

**(1 pt)** 11️⃣ What does the `rdfs:subPropertyOf` relation mean?  
A. A property inherits the domain and range of its superproperty  
B. Two properties are equivalent  
C. The subproperty is disjoint from the superproperty  
D. It creates a subclass hierarchy

---

**(1 pt)** 12️⃣ The Open World Assumption (OWA) implies that:  
A. Missing information is assumed false  
B. Missing information is assumed unknown  
C. All facts must be explicitly stated  
D. Data must come from a closed system

---

**(1 pt)** 13️⃣ What is a triple store?  
A. A database optimized for storing and querying RDF triples  
B. A store for three-dimensional datasets  
C. A collection of ontologies in OWL format  
D. A SPARQL syntax validator

---

### **Lecture 7–8: OWL, Description Logics, Axioms and Restrictions**

**(2 pts)** 14️⃣ _Choose one or more:_ Which of the following statements about OWL are true?  
A. OWL extends RDFS with richer semantics and constraints  
B. OWL is based on Description Logics  
C. OWL assumes a Closed World model  
D. OWL supports reasoning about classes, properties, and individuals

---

**(1 pt)** 15️⃣ The No Unique Name Assumption (UNA) in OWL means:  
A. Different names may refer to the same entity  
B. All URIs must be globally unique  
C. Different URIs always represent different objects  
D. All individuals are automatically distinct

---

**(2 pts)** 16️⃣ Consider:  
`ex:Country owl:hasCapital exactly 1 ex:City`  
This restriction expresses:  
A. Each country has at least one capital  
B. Each country has exactly one capital  
C. Each country may have any number of capitals  
D. Each city belongs to multiple countries

---

**(1 pt)** 17️⃣ In OWL, `owl:disjointWith` means:  
A. Two classes share no common instances  
B. Two classes are equivalent  
C. Two classes are subclasses of the same parent  
D. Two properties have the same range

---

**(2 pts)** 18️⃣ _Choose one or more:_ Which of the following are valid OWL property types?  
A. owl:FunctionalProperty  
B. owl:SymmetricProperty  
C. owl:ClosedProperty  
D. owl:TransitiveProperty

---

**(1 pt)** 19️⃣ The `owl:someValuesFrom` restriction means:  
A. Instances must have at least one relation of that type  
B. Instances must have all values from that class  
C. Instances must not have that property  
D. Instances must have exactly one relation

---

### **Lecture 9–10: Ontology Engineering, Alignment, Data Integration**

**(2 pts)** 20️⃣ In Ontology Development 101, which step comes _first_?  
A. Define taxonomy  
B. Enumerate terms  
C. Determine domain and scope  
D. Evaluate ontology

---

**(1 pt)** 21️⃣ What is the purpose of _competency questions_?  
A. To define what the ontology should be able to answer  
B. To test RDF syntax  
C. To train a reasoning algorithm  
D. To evaluate URI validity

---

**(2 pts)** 22️⃣ _Choose one or more:_ Which are main benefits of using ontologies?  
A. Communication between people  
B. Software interoperability  
C. Eliminating the need for databases  
D. Reuse and analysis of domain knowledge

---

**(1 pt)** 23️⃣ What does _ontological commitment_ mean?  
A. The scope of assumptions the ontology makes about its domain  
B. The number of triples committed to a store  
C. The link between data and metadata  
D. The logical consistency of queries

---

**(1 pt)** 24️⃣ Data integration on the Semantic Web aims to:  
A. Combine heterogeneous data sources into a unified model  
B. Replace relational databases  
C. Merge data only within one ontology  
D. Ensure all data uses identical URIs

---

**(2 pts)** 25️⃣ _Choose one or more:_ Which tools or standards can be used to map tabular data to RDF?  
A. R2RML  
B. OntoRefine  
C. CSVW  
D. OWL-DL

---

**(1 pt)** 26️⃣ The SPARQL `SERVICE` keyword allows:  
A. Federated queries across multiple SPARQL endpoints  
B. Data insertion into triple stores  
C. Exporting queries as RDF  
D. Testing query validity

---

**(2 pts)** 27️⃣ SPARQL `CONSTRUCT` queries are useful because they:  
A. Produce RDF triples instead of tabular results  
B. Modify the ontology schema  
C. Delete old triples  
D. Return human-readable summaries

---

---

# 🔒 **Answer Key (scroll to reveal)**

1️⃣ B  
2️⃣ A, B, D  
3️⃣ C  
4️⃣ A  
5️⃣ B  
6️⃣ A  
7️⃣ A, B, D  
8️⃣ B  
9️⃣ B  
🔟 A, B, D  
11️⃣ A  
12️⃣ B  
13️⃣ A  
14️⃣ A, B, D  
15️⃣ A  
16️⃣ B  
17️⃣ A  
18️⃣ A, B, D  
19️⃣ A  
20️⃣ C  
21️⃣ A  
22️⃣ A, B, D  
23️⃣ A  
24️⃣ A  
25️⃣ A, B, C  
26️⃣ A  
27️⃣ A

---

✅ **Total: 27 questions, 34 points**  
Would you like me to create a **printable, exam-style PDF** version next (with checkboxes and space for answers)?