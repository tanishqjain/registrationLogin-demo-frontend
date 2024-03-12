
var loadCdcWebSDK = function (){
  const urlSearchParamsObj = getUrlParametersObj();

  //All default values are hardcoded to RAC Claim channel
  // var cdcApiData = {
  //   apiKey: '4_gHm0DRWOrvDGpkArRMRUxg',
  //   childApiKey: '4_PcPPDZQeaqk-rl92MzyF5Q',
  //   brand: 'FRIGIDAIRE',
  //   language: 'EN'
  // }
  var cdcApiData = {
    apiKey: '',
    childApiKey: '',
    brand: '',
    language: ''
  }
  cdcApiData = getCdcApiData(cdcApiData, urlSearchParamsObj);

  try {
    const language = cdcApiData.language;
    if (cdcApiData.childApiKey) {
      cdcscripturl = `https://cdns.gigya.com/js/gigya.js?apiKey=4_TySGM90Uf7f7GGLgX4HX-w&childApiKey=${cdcApiData.childApiKey}&lang=${language}`;
    } else {
      cdcscripturl =  `https://cdns.gigya.com/js/gigya.js?apiKey=4_TySGM90Uf7f7GGLgX4HX-w&lang=${language}`
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
  if (cdcApiData.brand && cdcApiData.brand === 'fgd'){
    var screenSetName = 'FRIGIDAIRE'
  }
  try {
    const screenSetParams = {
      screenSet: `${screenSetName}-RegistrationLogin`,
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