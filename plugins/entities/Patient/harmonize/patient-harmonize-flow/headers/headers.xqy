xquery version "1.0-ml";

module namespace plugin = "http://marklogic.com/data-hub/plugins";

declare namespace envelope = "http://marklogic.com/data-hub/envelope";

declare namespace hl7 = "urn:hl7-org:v3";

declare option xdmp:mapping "false";

(:~
 : Create Headers Plugin
 :
 : @param $id      - the identifier returned by the collector
 : @param $content - the output of your content plugin
 : @param $options - a map containing options. Options are sent from Java
 :
 : @return - zero or more header nodes
 :)
declare function plugin:create-headers(
  $id as xs:string,
  $content as node()?,
  $options as map:map) as node()*
{
  (
    <patient xmlns="http://marklogic.com/data-hub/envelope">
      <id>
      {fn:string($content//hl7:recordTarget/hl7:patientRole/hl7:id/@extension)}
      </id>
      <name>
        {
          let $given := $content//hl7:recordTarget/hl7:patientRole/hl7:patient/hl7:name/hl7:given
          return
            if (fn:count($given) gt 1)
            then (<first>{$content//hl7:recordTarget/hl7:patientRole/hl7:patient/hl7:name/hl7:given[1]/string()}</first>,
                 <middle>{$content//hl7:recordTarget/hl7:patientRole/hl7:patient/hl7:name/hl7:given[2]/string()}</middle>)
            else (<first>{$content//hl7:recordTarget/hl7:patientRole/hl7:patient/hl7:name/hl7:given/string()}</first>,
                 <middle>None</middle>)
        }
        <last>
          {$content//hl7:recordTarget/hl7:patientRole/hl7:patient/hl7:name/hl7:family/string()}
        </last>
      </name>
      <address>
        <addressLine1>
        {$content//hl7:recordTarget/hl7:patientRole/hl7:addr/hl7:streetAddressLine/string()}
        </addressLine1>
        <city>
        {$content//hl7:recordTarget/hl7:patientRole/hl7:addr/hl7:city/string()}
        </city>
        <state>
        {$content//hl7:recordTarget/hl7:patientRole/hl7:addr/hl7:state/string()}
        </state>
        <postalCode>
        {$content//hl7:recordTarget/hl7:patientRole/hl7:addr/hl7:postalCode/string()}
        </postalCode>
      </address>
    </patient>
  )
};
