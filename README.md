# OpenActive Data Catalogs

OpenActive Data Catalogs provide a mechanism for registering [OpenActive Datasite Sites](https://developer.openactive.io/publishing-data/dataset-sites) so that they can be discovered and harvested by data users.


## Structure

The JSON-LD [OpenActive Data Catalog Collection](https://openactive.io/data-catalogs/data-catalog-collection.jsonld) contains a list of JSON-LD Data Catalogs, which each contain a list of HTML Dataset Sites. Each HTML Dataset Site references OpenActive feed URLs within its JSON-LD metadata.


## Processing guidance

1. Download the OpenActive Data Catalog Collection JSON-LD file using a GET request to the canonical URL [`https://openactive.io/data-catalogs/data-catalog-collection.jsonld`](https://openactive.io/data-catalogs/data-catalog-collection.jsonld) (or [`https://openactive.io/data-catalogs/data-catalog-collection-preview.jsonld`](https://openactive.io/data-catalogs/data-catalog-collection-preview.jsonld) for datasets in ["preview"](#dataset-previews)).

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

### Dataset Previews
Datasets with work in progress are available in the Preview Data Catalog Collection which references the corresponding Data Catalog for Preview Singular Datasets. These are not yet recognised as compliant by OpenActive, but may be of interest to data users for exploratory use.

[`https://openactive.io/data-catalogs/data-catalog-collection-preview.jsonld`](https://openactive.io/data-catalogs/data-catalog-collection-preview.jsonld)

[`https://openactive.io/data-catalogs/singular-preview.jsonld`](https://openactive.io/data-catalogs/singular-preview.jsonld)

### Test Datasets
Datasets that contain data from test, staging or UAT environments are available in the Test Data Catalog Collection which references the corresponding Data Catalog for Test Singular Datasets. These may be useful during deeper integrations such as with the Open Booking API.

[`https://openactive.io/data-catalogs/data-catalog-collection-test.jsonld`](https://openactive.io/data-catalogs/data-catalog-collection-test.jsonld)

[`https://openactive.io/data-catalogs/singular-test.jsonld`](https://openactive.io/data-catalogs/singular-test.jsonld)

## Adding a new dataset or data catalog

### For booking systems or bespoke websites with a single database
If you have created a new Dataset Site, simply create a [Pull Request for the OpenActive Data Catalog for Singular Datasets](https://github.com/openactive/data-catalogs/edit/master/singular.jsonld) and add your Dataset Site's production URL to the `dataset` array.

The pull request will trigger GitHub Actions to run the OpenActive Test Suite to validate the live feeds within dataset. OpenActive Test Suite validation must pass before the PR can be merged.

To force the validation to re-run, please submit an empty commit to the PR:

```bash
git commit --allow-empty -m "trigger GitHub actions"
git push
```

### For large booking systems with multiple databases
If you have created a new Data Catalog, simply create a [Pull Request for the OpenActive Data Catalog Collection](https://github.com/openactive/data-catalogs/edit/master/data-catalog-collection.jsonld) and add your Data Catalog's production URL to the `hasPart` array.

## Reviewing PRs for a new dataset or data catalog

Reviewers must verify that that all criteria in the checklist found in the [pull_request_template.md](./pull_request_template.md) have been met.

This can be achieved by:
- Checking that CI passes (CI will run the [OpenActive Test Suite](https://developer.openactive.io/publishing-data/data-feeds/testing-feeds#openactive-test-suite)) to validate feeds
- Checking that the dataset site references a valid GitHub Issues Board

In cases where the data is likely to be valuable to data users while the data publisher is fixing bugs in their feeds, it may be added as a "preview" (either to `data-catalog-collection-preview.jsonld` or `singular-preview.jsonld`). This preview state will be reflected within the OpenActive Status Dashboard.

Once a Data Catalogue or Dataset has been accepted into the OpenActive Data Catalogue Collection, any corresponding test Data Catalogue or Dataset may be added to either `data-catalog-collection-test.jsonld` or `singular-test.jsonld`. Such test data will be reflected within the OpenActive Status Dashboard.

## Tests
The repository includes basic tests to check the validity of the JSON-LD `@id` references included within it.

## Related specifications

The Dataset Site JSON-LD metadata format, Data Catalog format, and Data Catalog Collection format are planned to be standardised as part of the [Dataset API Discovery specification](https://www.openactive.io/dataset-api-discovery/EditorsDraft/).
