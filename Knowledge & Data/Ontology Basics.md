In the context of ontologies and knowledge representation languages like RDF (Resource Description Framework) and OWL (Web Ontology Language), the components of data and knowledge are precisely defined to ensure explicit meaning. These components are fundamental to the structure of RDF triples (Subject, Predicate, Object).

### 1. Entities (Resources)

- **Explanation:** Entities, or **Resources**, are the "things" that the ontology is describing, whether they are physical objects (like `ex:TruffleTheCat`) or abstract concepts (like `ex:Cat` or `ex:Human`). They are the subjects or objects of triples.
- **Identification:** Resources are primarily identified by **URIs** (Uniform Resource Identifiers) or **IRIs** (Internationalised Resource Identifiers). URIs have a global scope and are unique across the Web.
- **Types in Ontologies:** In the schema or ontology level (T-box), entities include **Classes** (which denote a set of individual objects, e.g., `ex:Cat`) and **Properties** (which define relations). At the data or instance level (A-box), entities include **Individuals** (which represent a single object, e.g., `ex:TruffleTheCat`).
- **Blank Nodes (BNodes):** Resources without a URI are called Blank Nodes. They are used when a resource is unknown or lacks a natural identifier and represent **existential quantifiers** in logical terms.

### 2. Literals (Values)

- **Explanation:** Literals represent **"literal" data values**, such as numbers, strings, or dates (e.g., a name or an area measurement). They serve as attribute values for resources.
- **Role in Triples:** Literals can **only appear in the Object position** of a triple, as no relationships are allowed to start from a literal value.
- **Datatypes and Language Tags:** All literals must have an associated **datatype** (referenced via a URI, commonly `xsd:string` by default) or a **language tag** (e.g., `@nl`) for strings.

### 3. Properties (Predicates)

- **Explanation:** Properties (also called roles or predicates) define the **relationship** between a Subject resource and an Object (which can be another resource or a literal value). They are defined by URIs.
- **Role in Ontologies:** Properties are crucial for defining the **Class Axioms** and **Class Restrictions** that characterize generic knowledge. Defining properties involves specifying characteristics such as `rdfs:domain` and `rdfs:range`, or advanced OWL characteristics like `owl:FunctionalProperty` or `owl:TransitiveProperty`.
- **Property Categories (OWL):** OWL properties fall into three disjoint categories:
    - **Object Properties:** Relate two resources (non-literals).
    - **Datatype Properties:** Relate a resource to a literal value.
    - **Annotation Properties:** Used for metadata (like `rdfs:label` or `rdfs:comment`) and cannot be used in restrictions.