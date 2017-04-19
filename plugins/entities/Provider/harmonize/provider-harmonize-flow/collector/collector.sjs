/*
 * Collect IDs plugin
 *
 * @param options - a map containing options. Options are sent from Java
 *
 * @return - an array of ids or uris
 */
function collect(options) {
  // Return a list of document URIs for all documents
  // in the Provider collection 
  return cts.uris(null, null, cts.collectionQuery('Provider'));
}

module.exports = {
  collect: collect
};
