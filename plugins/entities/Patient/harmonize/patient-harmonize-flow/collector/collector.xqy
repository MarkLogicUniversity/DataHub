xquery version "1.0-ml";

module namespace plugin = "http://marklogic.com/data-hub/plugins";

declare option xdmp:mapping "false";

(:~
 : Collect IDs plugin
 :
 : @param $options - a map containing options. Options are sent from Java
 :
 : @return - a sequence of ids or uris
 :)
declare function plugin:collect(
  $options as map:map) as xs:string*
{
  (: Return a list of document URIs for all documents
     in the Patient collection :)
  cts:uris((), (), cts:collection-query('Patient'))
};
