RDF graphs are just sets of triples

**OWL is a more expressive and powerful extension of RDFS**, allowing for more complex relationships and logical constraints on data. RDFS provides the basic vocabulary for describing data, while OWL adds features for defining classes and properties with richer semantics, supporting automated reasoning and more complex models.

Punning ⇒ allows one to define a concept as both a class and an instance

In OWL, the **unique naming assumption (UNA)** is the idea that distinct names refer to distinct entities, but OWL does not make this assumption. Instead, OWL follows the open world assumption, which means different names could potentially refer to the same individual unless explicitly stated otherwise.

---
## I. Knowledge Fundamentals and Formal Systems (Modules 1 & 2 Overview)

The course begins by establishing foundational concepts regarding data, information, and knowledge, and introduces the formal structure necessary for predictable computing.

### A. Core Definitions

- **Data (Raw Data):** Individual facts that are out of context, lack meaning, and are difficult to understand. Data preparation often accounts for about **80% of the work** of a Data Scientist.
- **Information:** A set of data provided in context, making it relevant to one or more people at a point in time. Contextualisation increases usefulness.
- **Knowledge:** Information that has been retained with an understanding of its significance. Knowledge is often defined as **information plus rules**.
    - **Tacit Knowledge (Implicit):** Knowledge retained by a person in their mind.
    - **Explicit Knowledge (Formal):** Knowledge that has been formalized, codified, and stored. Formal knowledge is necessary to efficiently interpret and reuse data.

### B. Formal Systems and Logic

A **Logic** is a formal language defined by three components:

1. **Syntax:** Defines which expressions are legal (well-formed).
2. **Semantics:** Defines what legal expressions mean (the meaning of each sentence with respect to interpretations).
3. **Calculus:** Describes how to determine meaning for legal expressions (inference rules).

|Concept|Definition/Explanation|
|:--|:--|
|**Interpretation** ($I$ or $I_v$)|A function that assigns a natural number (in arithmetic logic) or an element of the universe (in KG logic) to each word or variable.|
|**Model**|An interpretation $I$ is a model of a formula/triple/knowledge base if the formula/triple is **true** under that interpretation.|
|**Entailment** ($\models$)|A formula $F$ entails another formula $G$ ($F \models G$) if $G$ is true in **all models** of $F$. This ensures predictable inference.|

### C. Simple Knowledge Graph (KG) Logic

- **Syntax:** Knowledge Graphs are constructed as a set of triples $T$.
    - $T = V \times P \times V$, where $V$ is the vocabulary (nodes/literals) and $P$ is the set of predicates/relations.
- **Semantics:** An interpretation $I$ consists of a universe $I_R$ (a set of arbitrary objects), a function $I_R: V \rightarrow I_R$ (assigns an element of the domain to each word), and a function $I_P: P \rightarrow \text{Powerset}(I_R \times I_R)$ (assigns pairs of objects to each predicate).
    - A triple $(s, p, o)$ is true if $(I_R(s), I_R(o)) \in I_P(p)$.
- **Simple KG Entailment:** A set of triples is entailed by a knowledge graph if it is a **subgraph** of the knowledge graph.

## II. Linked Data, RDF, and SPARQL (Module 2 Focus)

### A. The Semantic Web and Linked Data

The vision for the Semantic Web is to move from a Web of Documents to a **Web of Data/Knowledge** where information is machine-readable and linked. The Semantic Web aims to solve two problems: integrating semantically heterogeneous information and integrating physically distributed information.

#### The Four Proposals for Linked Data

1. **Give all things a name**.
2. **Names are addresses on the Web** (using HTTP URIs/IRIs).
3. **Relations between things form Graphs of Data**.
4. **Add explicit semantics (formal knowledge)** to allow for predictable inferencing (P1+P2+P3 form a global graph; P4 enables predictable reasoning).

### B. Resource Description Framework (RDF)

**RDF** is the W3C standard data model for the Semantic Web, enabling structured and semi-structured data to be mixed and shared across applications.

#### RDF Triples and Components

- **Triple Structure:** All information is expressed as a triple: **Subject, Predicate, Object**. This is also known as a statement, fact, or axiom.
- **Components of a Triple:**
    - **Subject/Object:** Can be a **URI/IRI** or a **Blank Node**.
    - **Predicate:** Must be a **URI/IRI**.
    - **Object (Only):** Can be a **Literal**.

|Component|Definition/Role|Key Features|
|:--|:--|:--|
|**URI (Uniform Resource Identifier)**|Names used to identify resources (almost anything). They denote resources.|Have a global scope, unique throughout the Web, and serve as addresses. **HTTP URIs** exploit the machinery of Web browsing.|
|**IRI (Internationalised Resource Identifier)**|URIs that allow unicode characters.|Used synonymously with URI in practice.|
|**Literal**|Used to represent "literal" data values (numbers, strings, etc.).|Must include a **datatype** (referenced by URI, default is `xsd:string`) or a **language tag** (e.g., `@en` for strings).|
|**Blank Node (BNode)**|Resources without a URI. Used when a resource is unknown or has no natural identifier.|Logically represent **existential quantifiers**. Cannot be used as a predicate.|

#### RDF Syntax and Serialization

- **RDF Graphs:** Simply a set of triples. They are highly versatile and allow for easy merging (taking the union) and extension (adding more triples).
- **Key Syntaxes:**
    - **N-Triples:** One unabbreviated triple per line, easy for parsing.
    - **Turtle:** A convenient, human-readable/writable syntax.
- **Turtle Shorthands:**
    - `@prefix`: Declares namespace prefixes to abbreviate long URIs.
    - `a`: Shorthand for `rdf:type`.
    - `;`: Allows multiple property-object pairs to share the same subject.
    - `,`: Allows multiple objects to share the same subject and predicate.
    - `[...]` or `_:`: Used to designate Blank Nodes.

### C. SPARQL Query Language

**SPARQL** (SPARQL Protocol and RDF Query Language) is the W3C standard query language for RDF graphs, often called "The SQL for the Web of Data".

- **Access:** [[Queries]] are sent to **SPARQL endpoints** (the standard HTTP REST API for querying triple stores) over HTTP.
- **Query Structure:** Queries describe **graph patterns** using triple patterns, which contain variables.

|SPARQL Query Type|Purpose|Output|
|:--|:--|:--|
|**SELECT**|Extracts specific information|Returns a table with variable bindings (e.g., JSON, XML).|
|**CONSTRUCT**|Extracts graph patterns|Returns a new RDF graph.|
|**INSERT** / **DELETE**|Used to modify the triple store|Inserts/deletes triples into the knowledge base.|
|**ASK**|Checks for the existence of a match|Returns true or false.|
|**DESCRIBE**|Returns a description of a resource|Returns an RDF graph (implementation dependent).|

- **Key Clauses and Features:**
    - **WHERE:** Specifies the graph pattern to be matched (conjunction of triple patterns).
    - **UNION:** Specifies disjunction (at least one pattern must match).
    - **OPTIONAL:** Allows a part of the graph pattern to be optional, meaning the query succeeds even if that part doesn't match.
    - **FILTER:** Restricts results based on conditions (e.g., comparison operators, functions like `year()`, `lang()`).
    - **DISTINCT:** Eliminates duplicate results in a `SELECT` query.
    - **SERVICE:** Allows for **Federated SPARQL querying**, sending parts of a query to an external SPARQL endpoint (e.g., DBPedia).
    - **Triple Stores:** Purpose-built graph databases (e.g., **GraphDB**) used for storing large volumes of RDF data efficiently via indexing and dictionaries.

## III. RDF Schema (RDFS) and Vocabularies (Module 3 Focus)

RDFS adds the fourth proposal of Linked Data: explicit semantics, allowing for predictable inferencing by providing a data-modelling vocabulary for RDF.

### A. RDFS Theory and Inferencing

- **Schema vs. Data:** Knowledge Representation (KR) distinguishes between **generic knowledge** (schema/ontology level, T-box, classes) and **factual knowledge** (data/instance level, A-box, individuals).
    - Classes denote a set of objects (e.g., `Person`).
    - Individuals represent a single object (e.g., `laurent`).
    - Properties/Roles represent relations amongst classes and individuals (e.g., `worksFor`).
- **Inferencing/Reasoning:** Algorithmic manipulation of knowledge to derive new knowledge, imposing constraints on possible interpretations.

#### RDFS Reserved Symbols (Vocabulary)

|Symbol|Purpose|Example|
|:--|:--|:--|
|**`rdfs:Class`**|Denotes a class (a resource that is a class).|`ex:Country rdf:type rdfs:Class`.|
|**`rdfs:subClassOf`**|Specifies that one class is a subclass of another.|`ex:EuropeanCountry rdfs:subClassOf ex:Country`.|
|**`rdfs:subPropertyOf`**|Specifies that one property is more specific than another.|`ex:hasCapital rdfs:subPropertyOf ex:containsCity`.|
|**`rdfs:domain`**|Specifies the class of subjects a property applies to (too blunt/global).|`ex:containsCity rdfs:domain ex:Country`.|
|**`rdfs:range`**|Specifies the class of objects a property applies to (too blunt/global).|`ex:containsCity rdfs:range ex:City`.|
|**`rdfs:label`**|Specifies the human-readable label for a resource.|`ex:Country rdfs:label "Land"@nl`.|
|**`rdfs:comment`**|Provides a natural language comment on a resource.|-|
|**`rdfs:seeAlso`**|Refers to another resource.|-|

- **Example Entailment Rule (Rule 10):** If $s$ `rdf:type` $o$ AND $o$ `rdfs:subClassOf` $t$, then infer $s$ `rdf:type` $t$.
- **Limitations:** RDFS is **not very expressive**. It lacks negation, a notion of equality, and features like property cardinality.

### B. Common Vocabularies

Vocabularies define properties (predicates) and classes (types) to allow for data integration and inferencing.

|Vocabulary|Purpose/Focus|Example Elements|
|:--|:--|:--|
|**RDF Vocabulary**|Basic data modelling terms.|`rdf:type`, `rdf:Property`.|
|**RDFS Vocabulary**|Schema modelling (see above).|`rdfs:Class`, `rdfs:subClassOf`.|
|**FOAF (Friend of a Friend)**|Persons and relations between persons.|`foaf:Person`, `foaf:name`, `foaf:knows`.|
|**Dublin Core (DC/DCTerms)**|Bibliographic attributes.|`dct:creator`, `dct:title`.|
|**DBPedia Ontology**|Ontology extracted from Wikipedia infoboxes.|`dbo:Film`, `dbo:University`.|
|**Schema.org**|Vocabulary for search engine optimization.|`schema:Movie`.|
|**SKOS (Simple Knowledge Organization System)**|Modelling thesauri, taxonomies, and concept hierarchies.|`skos:Concept`, `skos:broader`, `skos:related`.|

**SKOS vs. RDFS/OWL:**

- A `skos:Concept` is a subject used to index things, while an `owl:Class` is a set of things.
- `skos:broader` is more generic than `rdfs:subClassOf`, covering not just subclass relationships but also mereological (part-of) or topic implication relationships.

## IV. OWL and Advanced Inferencing (Modules 4 Focus)

OWL (Web Ontology Language) is necessary for proper knowledge modelling when RDFS is not expressive enough.

### A. OWL Theoretical Foundations

- **Description Logic (DL):** OWL is an implementation of DL, trading expressive power (unlike First-Order Logic, which is undecidable) for computational efficiency and decidability.
    
- **Key Assumptions of OWL/DL:**
    
    - **Open World Assumption (OWA):** Nothing is assumed to be false unless explicitly stated or derivable. This can lead to unexpected results if not considered.
    - **No Unique Naming Assumption (UNA):** Individuals/classes with different names can refer to the same thing (solved using `owl:sameAs`).
    - **Interpretation:** Concepts (classes) are interpreted as sets, and axioms define logical conditions that restrict who can or cannot be a member.
- **Fundamental Classes:**
    
    - **`owl:Thing`:** Every OWL class is a subclass of `owl:Thing`, and every individual is of type `owl:Thing`.
    - **`owl:Nothing`:** `owl:Nothing` is a subclass of every OWL class. An individual being of type `owl:Nothing` is used to indicate **inconsistency**.

### B. OWL Class Axioms

Axioms are used to define relations and constraints between classes.

|Axiom|Description|Effect/Entailment|
|:--|:--|:--|
|**`owl:equivalentClass`**|Two classes contain the same individuals and have the same definition.|Infers class equivalence.|
|**`owl:disjointWith`**|Classes do not contain the same individuals.|If an individual is asserted to be in both, it leads to **inconsistency**.|
|**`owl:complementOf`**|The complement contains all individuals that are **not** in the class.|Difficult to use precisely; `owl:disjointUnionOf` is often better.|
|**`owl:unionOf`**|Contains all individuals belonging to any class in the union.|If an individual belongs to a member class, it belongs to the union class.|
|**`owl:intersectionOf`**|Contains individuals belonging to _all_ classes in the intersection.|-|
|**`owl:oneOf`**|Enumerates all members of a class.|-|
|**Identity Axioms**|`owl:sameAs` and `owl:differentFrom`.|Used to specify that two URIs denote the same or different individuals.|

### C. OWL Property Types and Characteristics

OWL properties are classified into three disjoint categories and can have various characteristics.

#### Property Categories

1. **Object Properties:** Have non-literals (URIs/BNodes) as their range.
2. **Datatype Properties:** Have only literals as their range.
3. **Annotation Properties:** Cannot be used in restrictions.

#### Property Characteristics [182–186]

|Characteristic|Definition/Inference|Example Application|
|:--|:--|:--|
|**`owl:SymmetricProperty`**|If $p(x, y)$ then $p(y, x)$.|`hasFamilyMember`, `siblingOf`.|
|**`owl:AsymmetricProperty`**|If $p(x, y)$ then $p(y, x)$ is inconsistent.|-|
|**`owl:TransitiveProperty`**|If $p(x, y)$ and $p(y, z)$ then $p(x, z)$.|`isLocatedIn` (or structural relations like `partOf`).|
|**`owl:FunctionalProperty`**|A property has only one value for a subject (If $p(x, y)$ and $p(x, z)$, then $y = z$).|`hasBirthPlace` (assuming one birthplace). **Entails** $y$ `owl:sameAs` $z$.|
|**`owl:InverseFunctionalProperty`**|A property value uniquely identifies an instance (If $p(x, y)$ and $p(z, y)$, then $x = z$).|`isCapitalOf`. **Entails** $x$ `owl:sameAs` $z$.|
|**`owl:ReflexiveProperty`**|Every individual is related to itself via that property.|`knows` (if defined as reflexive).|
|**`owl:IrreflexiveProperty`**|No individual is ever related to itself.|`isParentOf`.|

- **Property Axioms:** Relations between properties include `owl:inverseOf`, `owl:equivalentProperty`, `owl:disjointProperty`, and `owl:propertyChainAxiom`.

### D. OWL Class Restrictions

An **`owl:Restriction`** is an `owl:Class` defined by specifying conditions on the property values of its individuals.

#### Necessary vs. Necessary & Sufficient Conditions

|Condition Type|OWL Syntax|Purpose/Inference|
|:--|:--|:--|
|**Necessary**|Use `rdfs:subClassOf`|If you are in class R, you must have condition C. Used to infer **subclass relations** or property values of known members.|
|**Necessary & Sufficient**|Use `owl:equivalentClass`|If you are in class R, you have condition C, AND if you have C, you are in R. Used to infer **class membership** of individuals.|

#### Types of Restrictions (Property Modifiers)

|Modifier|Logic Type|Description|
|:--|:--|:--|
|**`owl:someValuesFrom`**|Existential|All members of the class have **at least one** value from the specified class. (e.g., Nobel Prize Winners have won _some_ Nobel Prize).|
|**`owl:allValuesFrom`**|Universal|All members of the class have **only** values from the specified class. (e.g., Vegetarians only eat vegetarian food).|
|**`owl:hasValue`**|Specific Value|All members of the class have this **exact instance** as a value.|
|**`owl:min/max/qualifiedCardinality`**|Cardinality|Specifies the minimum/maximum/exact number of values (from a specified class).|
|**`owl:hasSelf`**|Local Reflexivity|Specifies that all members of the class have a relation with themselves.|

## V. Ontology Engineering, Alignment, and Data Integration (Module 5 Focus)

### A. Ontology Engineering

**Ontology Engineering** concerns the practical aspects and methodologies of building and using ontologies.

- **Definition of Ontology:** "An ontology is an explicit specification of a **shared conceptualisation** that holds in a particular context".
- **Ontological Commitment:** Each statement is a commitment to a view of the domain. The **rule of thumb** is to choose the **minimal ontological commitment** needed.
- **Methodologies:** Ontologies can be built **Top-down** (start with classes and hierarchy), **Bottom-up** (start with existing data/material), or **Middle-out** (start with fundamental concepts, move outward).
- **Key Stages (Non-linear process):**
    1. **Determine domain & scope:** Define purpose using **Competency Questions** (user-oriented interrogatives used for scoping and evaluation).
    2. **Consider reuse:** Utilize existing ontologies/vocabularies (e.g., FOAF, DBPedia).
    3. **Enumerate terms:** Nouns form classes, verbs form properties.
    4. **Define taxonomy:** Organize terms in a hierarchical structure using `rdfs:subClassOf`.
    5. **Define properties:** Specify `domain` and `range`, and property characteristics (e.g., functional, transitive).
    6. **Define classes and their properties:** Apply class axioms and restrictions (universal, existential, cardinality).
    7. **Define instances (Ontology Population):** This is usually **semi-automatic work** due to the large number of instances.
    8. **Check for anomalies:** Use reasoners to detect inconsistencies (a major advantage of OWL over RDFS).

### B. Ontology Population and Data Conversion

Ontology population involves filling the ontology with instances. Data sources (like relational databases or CSVs) must often be mapped to RDF triples.

- **Mapping Tabular Data to RDF (W3C Standards):**
    - **Direct Mapping of Relational Data to RDF**.
    - **R2RML:** RDB to RDF Mapping Language (for instructing conversion of RDB to RDF).
    - **CSVW:** Metadata Vocabulary for Tabular Data (for instructing conversion of CSV to RDF).
    - **RDF Data Cube Vocabulary (QB):** Used for representing the table itself (statistical data).
- **Practical Tools:** **OntoRefine** (specialized spin-off from OpenRefine) is used for loading CSV data and defining RDF mapping by dragging and dropping column headers to Subject, Predicate, and Object.

### C. Ontology Alignment and Integration

**Ontology Alignment** is the process of semantically mapping entities (classes and properties) between two or more ontologies to enable knowledge sharing.

- **Goals:** Link entities so information can flow (e.g., transferring beverage information from FoodOn to HeLis).
- **Key Relationships for Alignment (Mappings):**
    - **Equivalence ($\equiv$):** Two entities are the same (e.g., using `owl:sameAs` for individuals or `owl:equivalentClass` for classes).
    - **Subsumption ($\sqsubseteq$):** One entity is a subclass of another (e.g., using `rdfs:subClassOf`).
- **Challenges:** Ontologies are often designed for different domain-specific purposes, leading to variations in taxonomy structures and entity naming. Alignment may lead to logical **inconsistency**.

#### Alignment Techniques

1. **Classical/Lexical Methods:**
    
    - **Lexical Matching:** Matching entity names, synonyms, or descriptions (e.g., edit distance).
    - **Structural Matching:** Leveraging ontology graph structure (parents, children, neighbors).
    - **Logical Repair:** Mechanisms to restore consistency after mappings introduce contradictions.
    - **LogMap:** A well-known classical aligner that seeds mappings from exact lexical matches, expands locally (locality principle), and uses consistency checks.
2. **Language Model (LM) Methods:**
    
    - LMs bring strong language understanding, enabling alignment of linguistic variations without relying solely on external dictionaries.
    - **BERTMap:** Uses domain-specific corpora to fine-tune BERT for alignment tasks, leveraging entity names and aliases as text corpus inputs.
    - **Retrieve-then-Rerank:** A hybrid approach for large ontologies, where an efficient Retriever (e.g., BERT) narrows candidates down, and a Re-ranker (e.g., GPT/Gemini) provides deeper, fine-grained reasoning.
    - **Agentic Workflow:** Utilizing LLMs as autonomous agents equipped with tools like a **SPARQL Engine**, **Semantic Retriever**, and **Ontology Reasoner** to dynamically plan and execute alignment decisions.
3. **Data Integration Summary:**
    
    - Transform external information into RDF if necessary.
    - Try to maintain the original schema as much as possible.
    - Use inferencing to derive mappings where possible.