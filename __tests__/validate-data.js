const fs = require('fs');
const path = require('path');
const { validateJsonLdId } = require('@openactive/dataset-utils');

const jsonldSourceUrls = [
  'data-catalog-collection.jsonld',
  'singular.jsonld',
  'data-catalog-collection-preview.jsonld',
  'singular-preview.jsonld',
  'data-catalog-collection-test.jsonld',
  'singular-test.jsonld',
]

for (const jsonldSourceUrl of jsonldSourceUrls) {
  const jsonld = JSON.parse(fs.readFileSync(path.resolve(__dirname, `../${jsonldSourceUrl}`), 'utf8'));

  // Check that the values of all `@id`s used within this repository exactly match the `@id` within the dereferenced JSON-LD
  describe(jsonldSourceUrl, () => {
    test.concurrent.each(jsonld.hasPart ?? jsonld.dataset)('has valid JSON-LD @id "%s"', async (id) => {
      const result = await validateJsonLdId(id, !!jsonld.dataset);
      expect(result.error).toBeNull();
    }, 20000);
  });
}
