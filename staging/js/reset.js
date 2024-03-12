// 2021-04-21 11:30
const isStorageDomainOverride = true; // Production
// const isStorageDomainOverride = false; // Test

var cdcApiData = {
  apiKey: '',
  brand: '',
  country: '',
  language: '',
  returnUrl: ''
}

var urlSearchParamsObj;

/**
 * Start function to get a reset password frame
 * 
 * Gets a reset password CDC frame (I-frame) from the 
 * CDC API.
 * 
 * Mandatory parameters are:
 *  * API key
 * 
 * If the mandatory parameters are not present or an error
 * occures, an error message is shown to the user.
 * 
 * If language is missing in the query or the language is not
 * supported, the fallback language is set based on the country.
 * 
 * The password reset token is automatically fetch by the
 * reset password CDC frame.
 */
function getCdcResetPasswordFrame() {
  try {
    const urlSearchParamsObj = getUrlParametersObj();
    cdcApiData = getCdcApiData(cdcApiData, urlSearchParamsObj);
    if (shouldReturnLinkBeAdded(cdcApiData.returnUrl, cdcApiData.country)) {
      const linkLanguage = getLanguageWithFallback(cdcApiData.country, cdcApiData.language);
      cdcApiData.returnUrl = createReturnLink(cdcApiData.returnUrl, cdcApiData.country, linkLanguage);
    }

    loadCdcApiDynamically(cdcApiData, isStorageDomainOverride);
  } catch (err) {
    centerErrorContent()
    showErrorContent();
    const header = 'Error when creating reset password page';
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
    cdcApiData.brand = getBrandFromUrl(urlSearchParamsObj);
    cdcApiData.country = getCountryFromUrl(urlSearchParamsObj);
    cdcApiData.language = getLanguageFromUrl(urlSearchParamsObj);
    cdcApiData.returnUrl = getReturnUrlFromUrl(urlSearchParamsObj);

    return cdcApiData;
  } catch (err) {
    throw new Error (err.message);
  }
}

/**
 * Checks if return link should be added.
 * 
 * The condition to add a return link, is that both
 * return URL and country from the query should be
 * present.
 * 
 * @param {string} returnUrl - The return URL from query
 * @param {string} country - The country from query.
 * @returns 
 */
function shouldReturnLinkBeAdded(returnUrl, country) {
  var shouldAddLink = false;
  try {
    shouldAddLink = returnUrl && country;
  } catch (err) {
    console.log('Could not check if return link should be added!');
  } finally {
    return shouldAddLink;
  }
}

/**
 * An asynchronos function from the CDC API.
 * 
 * Waits for the CDC API should be loaded before it
 * starts to excecute the code inside the function.
 * Gets an reset password i-frame from the CDC API and
 * add it the HTML tag with the id of
 * cdc-reset-psw-container
 */
var onGigyaServiceReady = function() {
  try {
    const screenSetParams = createScreenSetParameters(cdcApiData);
    gigya.accounts.showScreenSet(screenSetParams);
  } catch (err) {
    centerErrorContent()
    showErrorContent();
    const header = 'Error when CDC screen set!';
    addErrorContentToTemplate(header, err.message);
  }
}

/**
 * Sets the parameter for the screen set.
 *
 * @param {object} cdcApiData - The data for the screen set.
 * @throws {Error} - The error of the setting of screen set fails.
 * @returns {object} - The screen set object.
 */
function createScreenSetParameters(cdcApiData) {
  try {
    const screenSetParams = {
      screenSet: `${cdcApiData.brand}-RegistrationLogin`,
      startScreen: "gigya-reset-password-screen",
      containerID: "cdc-reset-psw-container",
      onError: errorHandler,
      onAfterScreenLoad: afterScreenLoad,
      onAfterSubmit:afterformsubmit
    }

    console.log('Screen Set: ', screenSetParams);
    console.log('Return URL: ', cdcApiData.returnUrl);
  
    return screenSetParams;
  } catch (err) {
    throw new Error(`Can not set screen set parameters: ${err.message}`);
  }
}

/**
 * The error handler.
 * 
 * Can be used in the future.
 * @param {object} eventObj 
 */
function errorHandler(eventObj) {
  console.log('An error has occurred: ', eventObj);
}

function afterScreenLoad(event) {
  console.log('CALLING AFTER SCREEN LOAD: ', event);
  if (event.currentScreen == 'gigya-reset-password-success-screen') {
    console.log('CALLING AFTER SCREEN LOAD FOR SUCCESS SCREEN');
    if (!shouldReturnLinkBeAdded(cdcApiData.returnUrl, cdcApiData.country)) {
      hideSubmitButtonInResetPage();
    }
  } else {
    console.log('Another screen loaded');
  }
}

/**
 * Hides the submit button in the screen set.
 */
 function hideSubmitButtonInResetPage() {
  const buttonElement = document.getElementsByClassName('gigya-composite-control-link');
  for (var i = 0; i <  buttonElement.length; i++) {
    buttonElement[i].style.display = 'none';
  }
}

/**
 * Adds the return URL to the submit button, if the URL is present.
 * If not the submit button is hidden.
 */
function forwardToReturlURL() {
  if (cdcApiData.returnUrl) {
    window.location.replace(cdcApiData.returnUrl);
  } else {
    console.log('URL is missing!')
  }
}
/**
 * Adds the return URL to the submit button, if the URL is present.
 * If not the submit button is hidden.
 */
function afterformsubmit(event) {
  if(event.response.errorCode == 0)
  {
      gigya.accounts.showScreenSet({
      screenSet: `${cdcApiData.brand}-RegistrationLogin`,
      startScreen: "gigya-reset-password-success-screen",
      containerID: "cdc-reset-psw-container",
      onError: errorHandler,
      onAfterScreenLoad: afterScreenLoad
      //onAfterSubmit:afterformsubmit
    });
  }
}

