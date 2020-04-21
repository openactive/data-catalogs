# OpenActive Data Catalogs

OpenActive Data Catalogs provide a mechanism for registering [OpenActive Datasite Sites](https://developer.openactive.io/publishing-data/dataset-sites) so that they can be discovered and harvested by data users.


## Structure

The JSON-LD [OpenActive Data Catalog Collection](https://openactive.io/data-catalogs/data-catalog-collection.jsonld) contains a list of JSON-LD Data Catalogs, which each contain a list of HTML Dataset Sites. Each HTML Dataset Site references OpenActive feed URLs within its JSON-LD metadata.


## Processing guidance

1. Download the OpenActive Data Catalog Collection JSON-LD file using a GET request to the canonical URL [`https://openactive.io/data-catalogs/data-catalog-collection.jsonld`](https://openactive.io/data-catalogs/data-catalog-collection.jsonld).

2. Download each Data Catalog JSON-LD file referenced by the `hasPart` array in the OpenActive Data Catalog Collection ([Data Catalog example data](https://opendata.leisurecloud.live/api/datacatalog)).

3. Download each Dataset Site HTML page referenced by the `dataset` array in each Data Catalog ([Dataset Site example](https://opendata.fusion-lifestyle.com/OpenActive/)).

4. Extract the JSON-LD metadata from inside the HTML page of the Dataset Site ([example extraction library](https://www.npmjs.com/package/htmlmetaparser)).

5. The feed URLs are located in the `distribution` property of the JSON-LD metadata within the Dataset Site.


## Hosted data files

To support the OpenActive Data Catalogs infrastructure, the following two data files are hosted from within [this central repository](https://github.com/openactive/data-catalogs/). They should be accessed via the canonical URLs below:

### OpenActive Data Catalog Collection
A JSON-LD collection of all Data Catalogs recognised as compliant by OpenActive.

[`https://openactive.io/data-catalogs/data-catalog-collection.jsonld`](https://openactive.io/data-catalogs/data-catalog-collection.jsonld)

### OpenActive Data Catalog for Singular Datasets
A JSON-LD Data Catalog for singular datasets that are not included in other Data Catalogs. This data catalog is included in the OpenActive Data Catalog Collection.

[`https://openactive.io/data-catalogs/singular.jsonld`](https://openactive.io/data-catalogs/singular.jsonld)

## Contribution

### For booking systems or bespoke websites with a single database
If you have created a new Dataset Site, simply create a [Pull Request for the OpenActive Data Catalog for Singular Datasets](https://github.com/openactive/data-catalogs/edit/master/singular.jsonld) and add your Dataset Site's production URL to the `dataset` array.


### For large booking systems with multiple databases
If you have created a new Data Catalog, simply create a [Pull Request for the OpenActive Data Catalog Collection](https://github.com/openactive/data-catalogs/edit/master/data-catalog-collection.jsonld) and add your Data Catalog's production URL to the `hasPart` array.


## Related specifications

The Dataset Site JSON-LD metadata format, Data Catalog format, and Data Catalog Collection format are planned to be standardised as part of the [Dataset API Discovery specification](https://www.openactive.io/dataset-api-discovery/EditorsDraft/).
