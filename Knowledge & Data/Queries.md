## I. SPARQL Fundamentals and Structure

**SPARQL (SPARQL Protocol and RDF Query Language)** is the W3C standard query language designed specifically for RDF graphs (Linked Data). It is often referred to as "The SQL for the Web of Data".

### A. The Querying Environment

- **Triple Stores:** RDF data is typically stored in dedicated, purpose-built graph databases called **Triple Stores** (e.g., GraphDB, Virtuoso, Jena).
- **SPARQL Endpoint:** Queries are sent over HTTP to a **SPARQL endpoint**, which is the standard HTTP REST API for querying triple stores.
- **Query Purpose:** SPARQL queries **describe graph patterns with variables** that must match parts of the RDF graphs stored in the triple store. Results are usually returned as a table with variable bindings (e.g., JSON, XML).

### B. Core Query Syntax Components

A SPARQL query typically follows this structure:


| Component         | Keyword                                               | Purpose                                                                                                                | Example                                      |
| :---------------- | :---------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------- | :------------------------------------------- |
| **Declarations**  | `PREFIX`                                              | **Abbreviates long URIs/IRIs** by declaring namespace prefixes (similar to Turtle syntax).                             | `PREFIX dbo: <http://dbpedia.org/ontology/>` |
| **Projection**    | `SELECT` / `CONSTRUCT` / `ASK` / `DESCRIBE`           | **Defines the type of result returned** and specifies the variables to be retrieved.                                   | `SELECT DISTINCT ?capital ?area`             |
| **Query Pattern** | `WHERE`                                               | Specifies the **Graph Pattern** (a set of triple patterns containing variables) that must be matched against the data. | `WHERE { ?country dbo:capital ?capital . }`  |
| **Modifiers**     | `ORDER BY`, `LIMIT`, `DISTINCT`, `GROUP BY`, `FILTER` | **Refines, sorts, counts, or limits** the results returned by the query.                                               | `ORDER BY DESC(?area) LIMIT 5`               |

The Projection component in SPARQL defines the type of result produced by the query,. This result dictates whether you receive a table of variable bindings, a simple true/false answer, or a new graph of RDF triples.

The SPARQL Query Language specifies six types of queries, including the four retrieval types listed below: `SELECT`, `CONSTRUCT`, `ASK`, and `DESCRIBE`,.

Here is the breakdown of the Projection keywords and their corresponding function and output:

| Component      | Keyword         | Purpose                                                                                                                                                                                            | Example                                                                                                               |
| :------------- | :-------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------- |
| **Projection** | **`SELECT`**    | Returns a **table with variable bindings**,, extracting specific information out of a dataset. Variables listed after `SELECT` (e.g., `?capital`, `?area`) are the columns in the resulting table. | `SELECT DISTINCT ?capital ?area` [Query Example], or `SELECT ?l WHERE { dbpedia:The_BFG_(2016_film) rdfs:label ?l }`. |
| **Projection** | **`CONSTRUCT`** | Returns an **RDF graph** (a set of triples),. It uses the triple patterns found in the `WHERE` clause to generate new triples, often saved as TTL or RDF/XML.                                      | `CONSTRUCT { ?y ex:kengetal "020". } WHERE { ?y dbo:areaCode "020". }`,.                                              |
| **Projection** | **`ASK`**       | Returns **true or false**, indicating whether a solution matching the graph pattern in the `WHERE` clause exists.                                                                                  | `ASK WHERE { der:Amsterdam dbo:areaCode "020". }`.                                                                    |
| **Projection** | **`DESCRIBE`**  | Returns an **RDF graph** that provides descriptive information about the specified resource(s).                                                                                                    | `DESCRIBE dbr:Amsterdam`.                                                                                             |
|                |                 |                                                                                                                                                                                                    |                                                                                                                       |

The remaining two primary query types (`INSERT` and `DELETE`) are used to modify the triple store by inserting or deleting triples, using the same triple patterns as `SELECT`,.

---

## II. Detailed Explanation of Projection Keywords

The Projection component determines the exact output format of the query. There are six types of SPARQL queries, four of which are primarily used for data retrieval or checking: `SELECT`, `ASK`, `CONSTRUCT`, and `DESCRIBE`.

### A. SELECT

The **`SELECT`** query is used to **extract specific information** from the RDF graph and returns the results as a **table with variable bindings**.

- **Purpose:** To retrieve the values bound to the specified variables that satisfy the `WHERE` clause.
- **Output Format:** A table (or result set) where each row represents a solution binding for the variables listed (e.g., JSON, XML, TSV, CSV).
- **Keywords/Features:** Can be combined with modifiers like `DISTINCT` (to eliminate duplicate results), `ORDER BY`, `LIMIT`, and aggregation functions (`COUNT`, `GROUP BY`).

|Example|Explanation|
|:--|:--|
|`SELECT ?album ?title WHERE { ?album dce:title ?title . }`|Returns a list of all matching pairs of album URIs (`?album`) and their titles (`?title`).|

### B. ASK

The **`ASK`** query is used to check for the **existence of a matching solution** for the query pattern.

- **Purpose:** To determine if the `WHERE` clause can be satisfied by any data in the triple store.
- **Output Format:** A simple boolean value: **`true` or `false`**.
- **Use Case:** Quick check for the presence of a fact or pattern, avoiding the transfer of potentially large result sets.

|Example|Explanation|
|:--|:--|
|`ASK WHERE { dbr:Amsterdam dbo:areaCode "020" . }`|Asks if the resource for Amsterdam has the area code "020" in the knowledge base.|

### C. CONSTRUCT

The **`CONSTRUCT`** query returns an **RDF graph** (a set of triples) based on the query results.

- **Purpose:** Instead of returning a table of variable bindings, `CONSTRUCT` uses the variable bindings found in the `WHERE` clause to populate a new triple template provided immediately after the `CONSTRUCT` keyword. This is often used to generate new triples, which can then be saved or inserted.
- **Output Format:** An RDF graph (a set of triples), which can be serialized in formats like TTL or RDF/XML.
- **Relation to Insertion:** `CONSTRUCT` can be used to generate a graph that is then used by an `INSERT` query.

|Example|Explanation|
|:--|:--|
|`CONSTRUCT { ?y ex:kengetal "020". } WHERE { ?y dbo:areaCode "020". }`|Finds all entities (`?y`) with area code "020" and constructs new triples where `?y` has the property `ex:kengetal` with the value "020".|

### D. DESCRIBE

The **`DESCRIBE`** query returns an **RDF graph** that describes a specific resource.

- **Purpose:** To retrieve all relevant triples associated with one or more designated resources. The exact set of triples returned is generally implementation-dependent.

|Example|Explanation|
|:--|:--|
|`DESCRIBE dbr:Amsterdam`|Retrieves descriptive information (a graph of triples) about the resource representing Amsterdam.|

### E. Data Manipulation Queries (`INSERT` and `DELETE`)

While not strictly projection keywords, `INSERT` and `DELETE` are command types used to modify the triple store. They use triple patterns similar to `CONSTRUCT` and `SELECT` queries to identify data for modification.

- **`INSERT`:** Adds new triples to the triple store, typically based on a generated pattern (often combined with `SERVICE` to import data from external sources).
- **`DELETE`:** Removes existing triples from the triple store.

|Example (INSERT)|Explanation|
|:--|:--|
|`INSERT { ?a owl:sameAs ?x } WHERE { ... SERVICE <...> { ... } }`|Inserts an `owl:sameAs` triple linking a local entity (`?a`) to a remote entity (`?x`), conditional on matching the `WHERE` pattern.|
|`DELETE { ?person foaf:givenName 'Bill' } INSERT { ?person foaf:givenName 'William' } WHERE { ?person foaf:givenName 'Bill' }`|An example of using `DELETE` and `INSERT` to update a literal value.|

---

## III. Detailed Explanation of Modifiers

Modifiers are optional clauses that appear after the core query pattern (`WHERE` clause) to structure and refine the output.

### A. FILTER

- **Purpose:** Restricts the solutions by a specific expression or test. The condition within the filter must evaluate to `true` for the match to be included in the solution set.
- **Details:** Filters frequently involve comparison operators (`>`, `<`, `=`), logical operators (`&&`, `||`), and functions (`year()`, `month()`, `lang()`, `strlen()`, `REGEX()`, etc.).
- **Negation:** The filter syntax is often used with `NOT EXISTS` to specify patterns that should _not_ match. Alternatively, `MINUS` can be used for negation.
- **Example:** `FILTER (year(?release_date) = 2007 && month(?release_date) = 7)`.

### B. DISTINCT

- **Purpose:** Ensures that only **unique solutions** (rows of variable bindings) are returned in the result set.
- **Use Case:** Essential when multiple data patterns might lead to the same set of variable bindings if not restricted (e.g., if multiple countries share the same capital).
- **Example:** `SELECT DISTINCT ?capital ?area`.

### C. ORDER BY and LIMIT

- **`ORDER BY` Purpose:** Sorts the resulting table based on the values of specified variables (e.g., ascending or descending).
- **`LIMIT` Purpose:** Restricts the maximum number of solutions returned.
- **Example:** `ORDER BY DESC(?label) LIMIT 10`.

### D. GROUP BY and Aggregates

- **`GROUP BY` Purpose:** Groups the result rows based on the values of one or more specified variables. This is necessary when applying aggregate functions.
- **Aggregates:** Used to perform calculations over groups or the entire result set. Common aggregates include `COUNT`, `SUM`, `MIN`, `MAX`, and `AVG`.
- **Example:** `SELECT ?x (COUNT(?y) as ?nb_y) WHERE { ... } GROUP BY ?x`. This query returns the count of matching `?y` values associated with each unique `?x` value.

### C. SPARQL Query Types

There are six types of SPARQL queries:

1. **`SELECT`:** Extracts specific information and returns a **table with variable bindings**.
    - _Example:_ `SELECT ?capital ?area WHERE { ... }`.
2. **`CONSTRUCT`:** Executes the query and uses the results to return a **new RDF graph** (a set of triples).
    - _Used for:_ Generating new triples, which can then be saved (e.g., as TTL) or inserted into a triple store.
3. **`ASK`:** Checks whether a solution for the query pattern exists and returns only **`true` or `false`**.
4. **`DESCRIBE`:** Returns an RDF graph providing a description of a specific resource.
5. **`INSERT` / `DELETE`:** Used to **modify** the knowledge base by inserting or deleting triples. They operate using the same triple patterns as `SELECT`.

## II. Graph Patterns and Matching Logic (`WHERE` Clause)

The `WHERE` clause specifies the Graph Pattern, which is an RDF graph containing variables, that the system attempts to match against the stored data.

### A. Triple Patterns and Variables

- A query pattern consists of multiple **triple patterns**.
- A **variable** is denoted by a question mark (`?`) or dollar sign (`$`) followed by a name (e.g., `?x`, `?y`).
- A triple pattern is a triple (Subject, Predicate, Object) where any position can hold a variable.
    - _Example:_ `?country dbo:capital ?city .`
- **Conjunction:** If multiple triple patterns are listed sequentially in the `WHERE` clause, they form a **conjunction** (logical AND). All patterns must match for the overall pattern to succeed.

### B. Turtle Shorthands in `WHERE`

Standard Turtle shortcuts are widely used inside the `WHERE` clause to make queries more concise:

- **Semicolon (`;`):** Allows multiple Predicate-Object pairs to share the same Subject.
    - _Example (E.g. #2):_ `?s dbo:county dbr:Netherlands ; dbo:county dbr:Belgium .`
- **Comma (`,`):** Allows multiple Objects to share the same Subject and Predicate.
- **`a`:** Shorthand for `rdf:type`.

### C. Combining Patterns: Conjunction, Disjunction, and Optionality

|Keyword|Logical Operation|Description|
|:--|:--|:--|
|**Conjunction** (implicit)|AND|Two or more triple patterns listed sequentially. Both must be found.|
|**`UNION`**|OR (Disjunction)|Specifies that at least one of the enclosed graph patterns should match.|
|**`OPTIONAL`**|Optional Match|A part of the graph pattern is optional. The overall query succeeds even if the `OPTIONAL` pattern does not match; the variables in the optional pattern are simply left unbound for that result.|

### D. Filtering and Negation

|Keyword|Purpose|Example/Details|
|:--|:--|:--|
|**`FILTER`**|Restricts results based on conditions or functions.|Tests in the `FILTER` clause must be validated for matching subgraphs. Functions include mathematical operations, `lang()` (language check), `year()`, `strlen()`, etc..|
|**`NOT EXISTS`**|Negation|Finds results where a specific pattern **does not exist** for a given binding.|
|**`MINUS`**|Negation|Specifies patterns that must **not** match the results (alternative to `FILTER NOT EXISTS`).|

**Example (E.g. #3 - Negation):** To find languages spoken but _not_ official:

```
	?country dbo:language ?language .
	FILTER NOT EXISTS {
		?country dbo:officialLanguage ?language .
	}
```

## III. Query Modifiers and Aggregates

Query modifiers are optional clauses used after the `WHERE` clause to process and shape the result set.

|Keyword|Purpose|Example/Details|
|:--|:--|:--|
|**`DISTINCT`**|Removes duplicate solutions/rows from the result set.|If you query for two properties and one subject, `DISTINCT` ensures unique pairs are returned.|
|**`ORDER BY`**|Sorts the result set.|Can use `ASC` (ascending) or `DESC` (descending).|
|**`LIMIT`**|Restricts the number of results returned (useful for performance or previews).||
|**`GROUP BY`**|Groups results based on specified variables.|Required when using aggregate functions.|
|**Aggregates**|Performs calculation over groups.|Includes **`COUNT`**, `SUM`, `MIN`, `MAX`, `AVG`, `GROUP_CONCAT`, and `SAMPLE`.|

**Example (E.g. #3 - Aggregation and Ordering):**

```
SELECT ?country (COUNT(?language) AS ?numUnofficialLanguages)
...
GROUP BY ?country
ORDER BY DESC(?numUnofficialLanguages)
```

This query counts the number of matches for `?language` per `?country`, assigns the count to `?numUnofficialLanguages`, groups the results by country, and orders them descendingly.

## IV. Advanced Features for Data Integration

### A. Federated Queries (`SERVICE`)

The **`SERVICE`** keyword is fundamental for data integration on the Semantic Web.

- It allows for **Federated SPARQL querying**.
- Parts of a query can be sent to an **external SPARQL endpoint** (e.g., DBPedia).
- The results from the remote service are then combined with the results from the local knowledge base.

**Example:** Linking local data (`?a`) to external DBPedia data (`?x`):

```
SELECT DISTINCT ?a ?x ?name
WHERE {
    ?a ont:hasName ?name.
    SERVICE <https://dbpedia.org/sparql> {
        ?x a dbo:Artist .
        ?x foaf:name ?name
    }
}
```

### B. Data Manipulation (`INSERT` / `DELETE`)

`INSERT` and `DELETE` queries are used for persistent modifications to the local triple store. They are often used in conjunction with `SERVICE` to import external data or align concepts.

- **Linking Entities (`owl:sameAs`):** You can retrieve data from an external source (`?x`) and insert a mapping (`owl:sameAs`) linking it to your local entity (`?a`) based on matching patterns:
    
    ```
    INSERT {?a owl:sameAs ?x}
    WHERE {
        ?a ont:hasName ?name.
        SERVICE <https://dbpedia.org/sparql> { ... match pattern ... }
    }
    ```
    

### C. Property Paths and Inferencing

SPARQL allows for the use of **Property Paths**, which enable querying transitive relations or hierarchical structures efficiently.

- **`*` (Zero or More):** Used to traverse a property zero or more times. This is especially useful in conjunction with RDFS concepts like `rdfs:subClassOf`, enabling queries that benefit from inferencing based on schema rules.

**Example (E.g. #1 - Inferential Query):** Finding all cities contained by any entity that is defined as a country, or a subclass of a country, or a subclass of a subclass of a country, etc..

```
		?countryDef rdfs:subClassOf* ex:Country.
        ?relation rdfs:subPropertyOf* ex:containsCity.
```

## V. Modelling Data in Queries (The RDF Context)

When writing queries, remember how data must be represented in RDF:

|RDF Component|Role in Query|Constraints/Notes|
|:--|:--|:--|
|**URI/IRI**|Used for Subjects, Predicates, and Objects.|Identified resources or properties. Abbreviated using `PREFIX`.|
|**Literal**|Used only in the Object position.|Must be enclosed in quotes (`"..."`) and can include optional datatype (`^^xsd:type`) or language tag (`@en`).|
|**Blank Node**|Used for Subjects and Objects, represented by `_:` or `[...]`.|Represents an existential quantifier (a resource exists, but its URI is unknown).|
|**Variable**|Used in all three positions (S, P, O).|Starts with `?` or `$`. Results are returned as bindings for these variables.|

**Key SPARQL Functions for Literals**:

- `lang(?variable)`: Returns the language tag of a literal. Used often in `FILTER` statements to restrict results to a specific language (e.g., `FILTER (lang(?name) = "en")`).
- `str(?variable)`: Returns the string value of a literal.
- `isIRI()`, `isLiteral()`, `isNumeric()`, `strLen()`: Useful for validating or manipulating the data type of the result values.

# More Examples
#### E.g. #1 - SPARQL query that finds all the cities in the dataset
```
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX ex: <http://example.com/kad/>
SELECT DISTINCT ?city WHERE {
	{
		?country a ?countryDef.
		?countryDef rdfs:subClassOf* ex:Country.
		?country ?relation ?city.
		?relation rdfs:subPropertyOf* ex:containsCity.
	}
}
```

#### E.g. #2 - a query for the graph g (containing DBPedia information about two countries) that checks which motor ways cross both countries.
```
"""
PREFIX dbr: <http://dbpedia.org/resource/>
PREFIX dbo: <http://dbpedia.org/ontology/>
SELECT ?s
	WHERE {
		?s
		dbo:county dbr:Netherlands ;
		dbo:county dbr:Belgium .
	}
	LIMIT 10
"""
```

#### E.g. #3 - a new query against http://dbpedia.org/sparql that does the following:

- Find all languages spoken in countries that are not official languages of that country.
- The query should return two colums: the country, and the number of languages.
- Order the countries by the number of unofficial languages, from high to low.

```
"""
PREFIX dbo: <http://dbpedia.org/ontology/>
PREFIX dbr: <http://dbpedia.org/resource/>

SELECT ?country (COUNT(?language) AS ?numUnofficialLanguages)
WHERE {
	?country a dbo:Country .
	?country dbo:language ?language .
	?language a dbo:Language .
	FILTER NOT EXISTS {
		?country dbo:officialLanguage ?language .
	}
}
GROUP BY ?country
ORDER BY DESC(?numUnofficialLanguages)
"""
```