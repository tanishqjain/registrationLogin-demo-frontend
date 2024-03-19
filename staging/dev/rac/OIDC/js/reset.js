
var cdcApiData = {
  apiKey: '',
  childApiKey: '',
  brand: '',
  language: ''
}

var loadCdcWebSDK = function (){
  const urlSearchParamsObj = getUrlParametersObj();

  cdcApiData = getCdcApiData(cdcApiData, urlSearchParamsObj);

  try {
    const language = cdcApiData.language;
    if (cdcApiData.childApiKey) {
      cdcscripturl = `https://cdc.idp-dev.electroluxgroup.us/js/gigya.js?apiKey=${cdcApiData.apiKey}&childApiKey=${cdcApiData.childApiKey}&lang=${language}`;
    } else {
      cdcscripturl =  `https://cdc.idp-dev.electroluxgroup.us/js/gigya.js?apiKey=${cdcApiData.apiKey}&lang=${language}`
    }

    var cdcApiScript = document.createElement("script");
    cdcApiScript.type = "application/javascript";
    cdcApiScript.async = true;
    cdcApiScript.src = cdcscripturl;

    document.head.appendChild(cdcApiScript);
    
  } catch (err) {
    throw new Error(`Can not create CDC API path: ${err.message}`);
  }
}

/**
 * An asynchronos function from the CDC API.
 */
var onGigyaServiceReady = function() {

  try {
    const screenSetParams = {
      screenSet: `${cdcApiData.brand}-RegistrationLogin`,
      startScreen: "gigya-reset-password-screen",
      containerID: "cdc-reset-psw-container",
      onError: errorHandler,
      onAfterScreenLoad: onAfterScreenLoadHandler
    }
    gigya.accounts.showScreenSet(screenSetParams);
  } catch (err) {
    centerErrorContent()
    showErrorContent();
    const header = 'Error when CDC screen set!';
    addErrorContentToTemplate(header, err.message);
  }
}

/**
 * The error handler.
 * Can be used in the future.
 * @param {object} eventObj 
 */
function errorHandler(eventObj) {
  console.log('An error has occurred: ', eventObj);
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
    cdcApiData.language = getLanguageFromUrl(urlSearchParamsObj);
    cdcApiData.childApiKey = getChildApiKeyFromUrl(urlSearchParamsObj);

    return cdcApiData;
  } catch (err) {
    throw new Error (err.message);
  }
}

function onAfterScreenLoadHandler(event){
  if(event.currentScreen === 'gigya-reset-password-success-screen'){
    document.getElementById('reset-password-login-link').href = 'https://dev-rac.frigidaireclaim.com/Account/Login/'
  }
}