# OpenActive Data Catalogs

OpenActive Data Catalogs provide a mechanism for registering [OpenActive Datasite Sites](https://developer.openactive.io/publishing-data/dataset-sites) so that they can be discovered and harvested by data users.

## Structure

The Data Catalog Collection contains a list of Data Catalogs, which each contain a list of Dataset Sites. Each Dataset Site references its OpenActive feed URLs within JSON-LD metadata.


## Data Files

### OpenActive Data Catalog Collection
A collection of all data catalogs recognised as compliant by OpenActive.

[https://openactive.io/data-catalogs/data-catalog-collection.jsonld](https://openactive.io/data-catalogs/data-catalog-collection.jsonld)

### OpenActive Data Catalog for Singular Datasets
A data catalog for singular datasets that are not included in other data catalogs. This data catalog is included in the OpenActive Data Catalog Collection.

[https://openactive.io/data-catalogs/singular.jsonld](https://openactive.io/data-catalogs/singular.jsonld)


## Processing guidance

1) Download each Data Catalog referenced by the `hasPart` array in the Data Catalog Collection ([Data Catalog Collection data](https://www.openactive.io/data-catalogs/data-catalog-collection.jsonld)).
2) Download each Dataset Site referenced by the `dataset` array in each Data Catalog ([Data Catalog example data](https://opendata.leisurecloud.live/api/datacatalog)).
3) Extract the JSON-LD metadata from inside the HTML page of the Dataset Site ([example extraction library](https://www.npmjs.com/package/htmlmetaparser), [Dataset Site example](https://opendata.fusion-lifestyle.com/OpenActive/))
4) The feed URLs are located in the `distribution` property of the JSON-LD within the Dataset Site.

Note that the JSON-LD format is planned to be standardised as part of the [Dataset API Discovery specification](https://www.openactive.io/dataset-api-discovery/EditorsDraft/).
