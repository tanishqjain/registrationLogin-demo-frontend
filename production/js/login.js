// 2021-05-05 12:50
const isStorageDomainOverride = true; // Production
// const isStorageDomainOverride = false; // Test

var cdcApiData = {
  apiKey: '',
  childApiKey: '',
  spName: '',
  country: '',
  language: ''
}

var urlSearchParamsObj;

/**
 * Start function to get a login frame
 * 
 * Gets a login CDC frame (I-frame) from the CDC API.
 * 
 * Mandatory parameters are:
 *  * API key
 * 
 * If the mandatory parameters are not present or an error
 * occures, an error message is shown to the user.
 */
function getCdcLoginFrame() {
  try {
    const urlSearchParamsObj = getUrlParametersObj();
    cdcApiData = getCdcApiData(cdcApiData, urlSearchParamsObj);
    loadCdcApiDynamically(cdcApiData, isStorageDomainOverride);
  } catch (err) {
    centerErrorContent()
    showErrorContent();
    const header = 'Error when creating login page';
    addErrorContentToTemplate(header, err.message);
  }
}

/**
 * Get the CDC API data from the query in the URL
 * 
 * Gets the query parameters from the URL and adds
 * the value to the CDC API data object.
 * 
 * @param {object} cdcApiData - The CDC API data object
 * @param {object} urlSearchParamsObj - The URL search parameter object.
 * @throws {error} - If an error occures when fetching query parameters.
 * @returns {object} - The CDC API data object with query parameters
 */
function getCdcApiData(cdcApiData, urlSearchParamsObj) {
  try {

    cdcApiData.apiKey = getApiKeyAsMandatory(urlSearchParamsObj);
    cdcApiData.childApiKey = getChildApiKeyFromUrl(urlSearchParamsObj);
    cdcApiData.spName = getSpNameFromUrl(urlSearchParamsObj);
    cdcApiData.language = getLanguageForLoginFromUrl(urlSearchParamsObj);

    return cdcApiData;
  } catch (err) {
    console.log(`${err.message}. Create default CDC API data!`);
    throw new Error(err.message);
  }
}

/**
 * An asynchronos function from the CDC API.
 *
 * Waits for the CDC API should be loaded before it
 * starts to excecute the code inside the function.
 * Gets an reset password i-frame from the CDC API and
 * add it the HTML tag with the id of
 * cdc-login-container
 */
var onGigyaServiceReady = function() {
  try {
    const screenSetParams = createScreenSetParameters(cdcApiData);
    console.log('Login screen parameters: ', screenSetParams);
    gigya.accounts.showScreenSet(screenSetParams);

    gigya.socialize.addEventHandlers({
      onLogin: onLoginHandler,
      containerID: 'cdc-login-container',
      onError: onErrorHandler,
    });
  } catch (err) {
    centerErrorContent()
    showErrorContent();
    const header = 'Error when CDC screen set!';
    addErrorContentToTemplate(header, err.message);
  }
}

/**
 * Creates the screen set parameters for the login frame.
 *
 * @param {object} cdcApiData - The data for the login frame.
 * @returns {object} - The screen set parameters.
 */
function createScreenSetParameters(cdcApiData) {
  const screenSetParams = {
    screenSet: `${cdcApiData.spName}-RegistrationLogin`,
    containerID: "cdc-login-container"
  }

  return screenSetParams;
}

/**
 * Listen at Gigya login events.
 *
 * Listen to a login event and continue the SAML flow.
 * @param {object} eventObj - The event object.
 */
 function onLoginHandler(eventObj) {
  gigya.fidm.saml.continueSSO();
}

/**
 * Listen at a Gigya error event.
 * 
 * Listen at a Gigya error event and creates an alert.
 * @param {object} eventObj - The event object.
 */
function onErrorHandler(eventObj){
  console.log('Error from Gigya: ', eventObj.context + ' ' + eventObj.eventName);
  centerErrorContent()
  showErrorContent();
  const header = 'CDC error';
  const errorMessage = `Context: ${eventObj.context}. Event name: ${eventObj.eventName}`;
  addErrorContentToTemplate(header, errorMessage);
}
