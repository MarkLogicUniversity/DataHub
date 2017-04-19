/*
 * Create Headers Plugin
 *
 * @param id       - the identifier returned by the collector
 * @param content  - the output of your content plugin
 * @param options  - an object containing options. Options are sent from Java
 *
 * @return - an object of headers
 */
function createHeaders(id, content, options) {

  var NPID = content.NPI;

  // HealthCare Provider Name info
  var providerName = {}
  var firstName = content['Provider First Name'];
  var middleName = content['Provider Middle Name'];
  if (middleName.length === 0) middleName = 'None';
  var lastName = content['Provider Last Name (Legal Name)'];
  var prefix = content['Provider Name Prefix Text'];
  if (prefix.length === 0) prefix = 'None';
  var suffix = content['Provider Name Suffix Text'];
  if (suffix.length === 0) suffix = 'None';
  var title = content['Provider Credential Text'];
  if (title.length === 0) title = 'None';
  var providerName = {first: firstName, middle: middleName, last: lastName, prefix: prefix, suffix: suffix, title: title};

  // HealthCare Provider Business info
  var soleProprietorFlag = content['Is Sole Proprietor'];

  // Provider Mailing Address info
  var addressLine1 = content['Provider First Line Business Mailing Address'];
  var addressLine2 = content['Provider Second Line Business Mailing Address'];
  var city = content['Provider Business Mailing Address City Name'];
  var state = content['Provider Business Mailing Address State Name'];
  var postalCode = content['Provider Business Mailing Address Postal Code'];
  var countryCode = content['Provider Business Mailing Address Country Code (If outside U.S.)'];

  // standardize phone numbers in nnn-nnn-nnnn format
  var telephoneNumber = content['Provider Business Mailing Address Telephone Number'];
  telephoneNumber = String(telephoneNumber).replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');

  // standardize phone numbers in nnn-nnn-nnnn format
  var faxNumber = content['Provider Business Mailing Address Fax Number'];
  faxNumber = String(faxNumber).replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');

  var mailingAddress = {addressLine1: addressLine1, addressLine2: addressLine2, city: city, state: state, postalCode: postalCode, countryCode: countryCode, phone: telephoneNumber, fax: faxNumber};

  // Provider Practice Address info
  addressLine1 = content['Provider First Line Business Practice Location Address'];
  addressLine2 = content['Provider Second Line Business Practice Location Address'];
  city = content['Provider Business Practice Location Address City Name'];
  state = content['Provider Business Practice Location Address State Name'];
  postalCode = content['Provider Business Practice Location Address Postal Code'];
  countryCode = content['Provider Business Practice Location Address Country Code (If outside U.S.)'];

  // standardize phone numbers in nnn-nnn-nnnn format
  telephoneNumber = content['Provider Business Practice Location Address Telephone Number'];
  telephoneNumber = String(telephoneNumber).replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');

  // standardize phone numbers in nnn-nnn-nnnn format
  faxNumber = content['Provider Business Practice Location Address Fax Number'];
  faxNumber = String(faxNumber).replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');

  var practiceAddress = {addressLine1: addressLine1, addressLine2: addressLine2, city: city, state: state, postalCode: postalCode, countryCode: countryCode, phone: telephoneNumber, fax: faxNumber};

  // HealthCare Provider taxonomy and license info
  var licenseInfo = [];
  var taxonomyCode;
  var licenseNumber;
  var licenseState;
  for (var i = 1; i < 16; i++) {
    taxonomyCode = content['Healthcare Provider Taxonomy Code_'+i];
    if (taxonomyCode.length > 0) {
      licenseNumber = content['Provider License Number_'+i];
      licenseState = content['Provider License Number State Code_'+i];
      licenseInfo.push({taxonomyCode: taxonomyCode, licenseNumber: licenseNumber, licenseState: licenseState});
    }
  }

  var providerNode = {provider: {id: NPID, name: providerName, soleProprietorFlag: soleProprietorFlag, address: {mailing: mailingAddress, practice: practiceAddress}, licenseInfo: licenseInfo}};
  return providerNode;
}

module.exports = {
  createHeaders: createHeaders
};
