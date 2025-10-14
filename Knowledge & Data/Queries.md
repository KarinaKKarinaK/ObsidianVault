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