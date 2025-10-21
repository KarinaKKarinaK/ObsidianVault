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