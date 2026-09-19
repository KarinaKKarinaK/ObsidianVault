## RDFS vs OWL

| Concept                                                                                       | Expressible in RDFS? | Expressible in OWL? | Example / Note                                                      |
| --------------------------------------------------------------------------------------------- | -------------------- | ------------------- | ------------------------------------------------------------------- |
| **Subclass / subproperty hierarchy**                                                          | ✅                    | ✅                   | `rdfs:subClassOf`, `rdfs:subPropertyOf`                             |
| **Domain / Range constraints**                                                                | ✅                    | ✅                   | RDFS can say “subjects of `ex:eats` are `ex:Person`”                |
| **Class membership (rdf:type)**                                                               | ✅                    | ✅                   | `ex:bob rdf:type ex:Person`                                         |
| **Property characteristics (functional, symmetric, transitive, inverse, inverse-functional)** | ❌                    | ✅                   | OWL adds: `owl:FunctionalProperty`, `owl:SymmetricProperty`, etc.   |
| **Cardinality restrictions (exactly, at least, at most)**                                     | ❌                    | ✅                   | e.g. `owl:cardinality "1"`                                          |
| **Value restrictions (allValuesFrom / someValuesFrom)**                                       | ❌                    | ✅                   | Express constraints on what kinds of things a property can point to |
| **Equivalence (classes, properties, individuals)**                                            | ❌                    | ✅                   | `owl:equivalentClass`, `owl:sameAs`                                 |
| **Disjointness (classes, properties, individuals)**                                           | ❌                    | ✅                   | `owl:disjointWith`                                                  |
| **Empty class (owl:Nothing)**                                                                 | ❌                    | ✅                   | OWL can represent contradictions or “no instances”                  |
| **Complex class constructors (intersection, union, complement)**                              | ❌                    | ✅                   | e.g. `owl:intersectionOf`, `owl:unionOf`                            |
| **Property chains (if R(x,y) & S(y,z) → T(x,z))**                                             | ❌                    | ✅                   | OWL 2: `owl:propertyChainAxiom`                                     |
| **Equality reasoning (owl:sameAs)**                                                           | ❌                    | ✅                   | Merges individuals                                                  |
| **Open World Assumption (OWA)**                                                               | ⚠️ Implicit          | ✅ Explicit in OWL   |                                                                     |
| **Closed World reasoning**                                                                    | ❌                    | ❌                   | Neither RDFS nor OWL assumes it                                     |


## Quick heuristics for exam questions:

- **If the question involves:**
    
    - “Exactly one”, “at least one”, “at most one” → ✅ _OWL only_ (cardinality)
        
    - “Property is functional/symmetric/transitive” → ✅ _OWL only_
        
    - “Two things are the same/different” → ✅ _OWL only_
        
    - “Empty class”, “disjoint classes”, “equivalent classes” → ✅ _OWL only_
        
    - “Subclass relationships / domain-range typing” → ✅ _Both (RDFS & OWL)_
        
    - “All instances of a class are also instances of another class” → ✅ _RDFS already supports it via `rdfs:subClassOf`_
        
    - “Object of a property is an instance of a class” → ✅ _RDFS can already express with `rdfs:range`_


## OWL Property Characteristicst


|**Property Type**|**Meaning (in logic)**|**Example in math / real life**|**OWL Keyword**|**Typical Exam Clue**|
|---|---|---|---|---|
|**Transitive**|If A R B and B R C → A R C|`>` , `<`, `≥`, `≤`, `ancestorOf`|`owl:TransitiveProperty`|“greaterThan is transitive” ✅|
|**Symmetric**|If A R B → B R A|`=` , `siblingOf`, `marriedTo`|`owl:SymmetricProperty`|“equalTo is symmetric” ✅|
|**Asymmetric**|If A R B → ¬(B R A)|`>` , `<` , `parentOf`|`owl:AsymmetricProperty`|“greaterThan is asymmetric” ✅|
|**Reflexive**|A R A always holds|`≥`, `≤`, `=`|`owl:ReflexiveProperty`|“equalTo is reflexive” ✅|
|**Irreflexive**|A R A never holds|`>`, `<`, `parentOf`|`owl:IrreflexiveProperty`|“greaterThan is irreflexive” ✅|
|**Functional**|One subject → at most one object|`hasBirthDate`, `hasMother`|`owl:FunctionalProperty`|“each person has exactly one birthdate” ✅|
|**Inverse Functional**|One object → at most one subject|`hasSSN`, `hasEmail`|`owl:InverseFunctionalProperty`|“if two people have the same SSN, they are the same person” ✅|


## RDFS vs SKOS
| Concept                | Used For                                               | Typical Use Case                                    | Direction / Logic       | OWL Equivalent?      | Example                                          |
| ---------------------- | ------------------------------------------------------ | --------------------------------------------------- | ----------------------- | -------------------- | ------------------------------------------------ |
| **rdfs:subClassOf**    | _Hierarchical relationship between classes (taxonomy)_ | “OakTree is a subclass of Tree”                     | From specific → general | ✅ (`owl:subClassOf`) | `ex:OakTree rdfs:subClassOf ex:Tree`             |
| **rdfs:subPropertyOf** | _Hierarchical relationship between properties_         | “hasBrother” is subproperty of “hasSibling”         | From specific → general | ✅                    | `ex:hasBrother rdfs:subPropertyOf ex:hasSibling` |
| **rdfs:domain**        | _Specifies allowed subject type_                       | Every subject using `ex:eats` must be a `ex:Person` | N/A                     | ✅                    | `ex:eats rdfs:domain ex:Person`                  |
| **rdfs:range**         | _Specifies allowed object type_                        | Every object of `ex:eats` must be a `ex:Food`       | N/A                     | ✅                    | `ex:eats rdfs:range ex:Food`                     |
| **rdf:type**           | _Declares an instance of a class_                      | “Bob is a Person”                                   | N/A                     | ✅                    | `ex:bob rdf:type ex:Person`                      |

## Functional vs InverseFunctional Properties

A functional property is a property that can have only one (unique) value y for each instance x. IFP (owl:InverseFunctionalProperty): **If a property is declared to be inverse-functional, then the object of a property statement uniquely determines the subject (some individual)**.

- **FunctionalProperty:**  
    For any property `p`, if
    
    `a p b1 a p b2`
    
    then **b1 and b2 must be the same individual.**  
    → Formally: if p is functional and the same subject has two different objects, we infer `b1 owl:sameAs b2`.
    
- **InverseFunctionalProperty:**  
    For any property `q`, if
    
    `a1 q b a2 q b`
    
    then **a1 and a2 must be the same individual.**  
    → If two subjects share the same object through an inverse-functional property, we infer they are the same.
    

---

### 🧩 Step 2: Apply these to our data

#### For `ex:p` (functional):

We have:

`ex:x ex:p ex:y ex:x ex:p ex:z`

Same subject (`ex:x`), two objects (`ex:y`, `ex:z`).

Because `ex:p` is **functional**, we must infer:

`ex:y owl:sameAs ex:z`

✅ **So A is true.**

---

#### For `ex:q` (inverse functional):

We have:

`ex:x ex:q ex:y ex:z ex:q ex:y`

Two subjects (`ex:x`, `ex:z`) share the same object (`ex:y`).

Because `ex:q` is **inverse functional**, we must infer:

`ex:x owl:sameAs ex:z`


# Whole Course Content General Overview
## **Module 1–2: Foundations of Knowledge Representation**

### Key Concepts

- **Data → Information → Knowledge**
    
    - Data = raw facts
        
    - Information = contextualized data
        
    - Knowledge = structured, meaningful information
        
- **Formal knowledge** = machine-interpretable (uses logic/symbols)
    
- **Informal knowledge** = human-understandable only
    

### Formal Systems

- **Syntax:** structure (symbols, variables)
    
- **Semantics:** meaning (truth, entailment)
    
- **Inference rules:** how to derive new truths (e.g. modus ponens)
    
- **Entailment (⊨):** If A ⊨ B → whenever A is true, B must be true
    

### Simple Knowledge Graph Logic

- **Knowledge Graph (KG):** network of triples (subject–predicate–object)
    
- **Entailment:** A set of triples is entailed if it’s a subgraph of the KG.
    

---

## 🌐 **Module 3–4: RDF, RDFS, and SPARQL**

### RDF Basics

- **Triple structure:** (subject, predicate, object)
    
- **URIs identify everything**
    
- **Literals** represent values (e.g. “Amsterdam”, 2023)
    
- **Blank nodes** = unnamed resources
    
- **RDF Syntax:** Turtle (.ttl), N-Triples (.nt), RDF/XML
    

### RDFS Basics

- `rdfs:Class`, `rdfs:subClassOf`, `rdfs:domain`, `rdfs:range`, `rdfs:subPropertyOf`
    
- Example:
    
    ```
    ex:Country rdf:type rdfs:Class .
    ex:Netherlands rdf:type ex:Country .
    ex:hasCapital rdfs:domain ex:Country .
    ex:hasCapital rdfs:range ex:City .
    ```
    

### SPARQL Cheatsheet

|Query Type|Purpose|
|---|---|
|`SELECT`|Returns table of results|
|`CONSTRUCT`|Returns RDF graph|
|`ASK`|Returns True/False|
|`DESCRIBE`|Returns RDF description|
|`INSERT`|Adds triples|

**Core syntax:**

```sparql
PREFIX dbo: <http://dbpedia.org/ontology/>
SELECT ?city WHERE {
  ?city dbo:country dbr:Netherlands .
}
```

**Features:**

- `FILTER`, `GROUP BY`, `HAVING`, `COUNT`, `SUM`
    
- `MINUS` for negation
    
- Functions: `STRLEN`, `CONCAT`, `REGEX`, `BOUND`, `EXISTS`
    
- **Federated Queries:** use `SERVICE <endpoint> { ... }`
    
- SPARQL endpoints: e.g. `https://dbpedia.org/sparql`
    

---

## 🧩 **Module 5: Triple Stores & Programmatic Access**

### Triple Stores

- Specialized graph databases for RDF data.
    
- Optimize joins using indexing on subject–predicate–object.
    
- Examples: **GraphDB, Virtuoso, Fuseki, Stardog**
    

**Python access example:**

```python
from SPARQLWrapper import SPARQLWrapper, JSON
sparql = SPARQLWrapper("http://dbpedia.org/sparql")
sparql.setQuery("""
  SELECT ?label WHERE {
    <http://dbpedia.org/resource/Asturias> rdfs:label ?label
  }
""")
sparql.setReturnFormat(JSON)
results = sparql.query().convert()
```

**Tools:** GraphDB, Yasgui, rdflib

---

## 🦉 **Module 6–7: OWL (Web Ontology Language)**

### Why OWL?

- Adds expressivity to RDFS: cardinality, equivalence, transitivity, disjointness, etc.
    
- **Open World Assumption (OWA):** absence ≠ false
    
- Based on **Description Logic** → _decidable subset_ of first-order logic.
    

### OWL Basics

- **Classes:** concepts (e.g., Person, Animal)
    
- **Individuals:** instances (e.g., Alice)
    
- **Properties:**
    
    - Object property (relates individuals)
        
    - Datatype property (relates individual → literal)
        
- **Axioms:** statements that define relationships and constraints.
    

### OWL Restrictions

|Type|Meaning|Example|
|---|---|---|
|`someValuesFrom`|∃ (existential)|“A Wine **has some** Color”|
|`allValuesFrom`|∀ (universal)|“All Wines **have only** Colors”|
|`hasValue`|fixed value|“Wine hasColor = red”|
|`cardinality`|number of values|“A Country has exactly 1 Capital”|
|`minCardinality` / `maxCardinality`|range limits|“Person has at least 1 parent”|
|`owl:equivalentClass`|A ≡ B|“Human ≡ Person”|
|`owl:disjointWith`|mutually exclusive|“Male ⊥ Female”|

### Common OWL Mistakes

- **Over-commitment:** too strict; use minimal assumptions.
    
- **Domain/Range misused:** prefer restrictions over global constraints.
    
- **Universal Restrictions:** not good for necessary + sufficient conditions.

- **Complement misuse:** use `disjointUnionOf` instead.
    
- **Always run reasoner in Protégé!**
    

### Necessary vs Sufficient Conditions

- ### **Necessary condition**
	- “If something is a member of Class A, then it must also satisfy Condition X.”
	- It’s **required** for class membership, but **not enough alone** to conclude that something belongs to the class.
	- ***e.g. “All vegetarians eat only vegetarian food.”***
		- If something **is a Vegetarian**, it **must** satisfy the condition (only eats vegetarian food).  
		- But if someone eats vegetarian food, we **can’t infer** they are Vegetarian.
		- So this is **necessary** but **not sufficient**.
	
- ### **Sufficient condition**
	- “If something satisfies Condition X, then it must be a member of Class A.”
	- It’s enough to _classify_ an individual as belonging to that class.
	- ***e.g. “A Vegetarian is exactly someone who eats only vegetarian food.”***  
	- This is **both necessary and sufficient**:
		- Necessary: Every Vegetarian must eat only vegetarian food.
		- Sufficient: Anyone who eats only vegetarian food is automatically classified as Vegetarian.

#### Summary Table
| Type                              | OWL Syntax            | Meaning                           | What Can Be Inferred                     |
| --------------------------------- | --------------------- | --------------------------------- | ---------------------------------------- |
| **Necessary**                     | `rdfs:subClassOf`     | “All A’s satisfy X”               | If `a rdf:type A`, → `a satisfies X`     |
| **Sufficient**                    | `owl:equivalentClass` | “All things satisfying X are A’s” | If `a satisfies X`, → `a rdf:type A`     |
| **Both (Necessary + Sufficient)** | `owl:equivalentClass` | “A ↔ X”                           | Bidirectional reasoning (classification) |

### **Quick Rule for Exams**

- If you see **rdfs:subClassOf → only one-way inference (necessary).**
    
- If you see **owl:equivalentClass → two-way inference (necessary + sufficient).**

**When defining a new class in Protégé:**

- **Use “Subclass Of”** for constraints that must hold true (necessary).
    
- **Use “Equivalent To”** for full definitions that allow the reasoner to _classify individuals_ automatically.

---

## 🔁 **Module 8: Advanced OWL Reasoning**

### Punning

**Punning ⇒** allows one to define a concept as both a class and an instance

- Same IRI used for multiple roles (e.g., class & individual)
    
- No interference; reasoners treat them as separate entities.
    

### Key Takeaways

- **Reasoners (e.g., Pellet)** derive implicit facts.
    
- Always save as `.ttl` and run reasoner often.
    
- OWA means missing info ≠ false.
    
- Choose minimal ontological commitment.
    

---

## 🧭 **Module 9: SKOS & Ontology Alignment**

### SKOS (Simple Knowledge Organization System)

- For **thesauri and vocabularies**, simpler than OWL.
    
- Concepts linked via:
    
    - `skos:broader` = Expresses a **hierarchical relationship** where one concept is _more general_ than another.
    - `skos:narrower` = Expresses the **inverse** of `skos:broader`.
    - `skos:related` = Expresses a **non-hierarchical association** between two concepts.
        
    - `skos:exactMatch`, `skos:closeMatch`
        

### Ontology Mapping

|Source–Target|Common Relation|
|---|---|
|Individual–Individual|`owl:sameAs`, `owl:differentFrom`|
|Class–Class|`owl:equivalentClass`, `rdfs:subClassOf`, `owl:disjointWith`|
|Property–Property|`rdfs:subPropertyOf`, `owl:equivalentProperty`|
|Individual–Class|`rdf:type`, restriction, or punning|

**Evaluation:**

- Measure **precision**, **recall**, and **confidence** of mappings.
    
- Compare automatic alignments to expert “gold standard”.
    

---

## 🧰 **Quick Practical Checklist (for exam or assignments)**

✅ Understand how **RDF, RDFS, OWL, SPARQL** connect  
✅ Know when to use:

- RDFS → simple hierarchies
    
- OWL → logical reasoning + constraints  
    ✅ Know what **Open World Assumption** means  
    ✅ Be able to read/write simple **Turtle syntax**  
    ✅ Recognize OWL restriction examples and classify them  
    ✅ Understand **triple store indexing** logic  
    ✅ Identify **SPARQL query purpose** from syntax  
    ✅ Avoid OWL modelling mistakes
    
