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
//Load CDC gigya script with IDP key to avoid Domain prefix issue
//loadCdcApiDynamically(cdcApiData, isStorageDomainOverride);

  try {
    const language = cdcApiData.language ? cdcApiData.language : DEFAULT_LANGUAGE;
    if (cdcApiData.childApiKey) {
      cdcscripturl = `https://cdc.myaccount.electroluxgroup.eu/js/gigya.js?apiKey=4_CrTrrP09zT-d7_LKFqqbIg&childApiKey=${cdcApiData.childApiKey}&lang=${language}`;
    } else {
      cdcscripturl =  `https://cdc.myaccount.electroluxgroup.eu/js/gigya.js?apiKey=4_CrTrrP09zT-d7_LKFqqbIg&lang=${language}`
    }
  } catch (err) {
    throw new Error(`Can not create CDC API path: ${err.message}`);
  }
  } catch (err) {
    centerErrorContent()
    showErrorContent();
    const header = 'Error when creating reset password page';
    addErrorContentToTemplate(header, err.message);
  }
    try {
    var cdcApiScript = document.createElement("script");
    cdcApiScript.type = "application/javascript";
    cdcApiScript.async = true;
    cdcApiScript.src = cdcscripturl;
    if (isStorageDomainOverride) {
      cdcApiScript.innerHTML = JSON.stringify({
        storageDomainOverride: "cdc.myaccount.electroluxgroup.eu",
        regSource: cdcApiData.passReturnURL
      });
    }
    document.head.appendChild(cdcApiScript);
  } catch (err) {
    throw new Error(`Can not create CDC API script tag: ${err.message}`);
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


function getCookie(cname){
              
	var name = cname + "=";
	  
	var allCookies = document.cookie;
	
	// Get all the cookies pairs in an array
	cookiearray = allCookies.split(';');
	  
	for(var i = 0; i <cookiearray.length; i++) {
	  
		var cookie = cookiearray[i];
		
		while (cookie.charAt(0) == ' ') {
				
			cookie = cookie.substring(1);
		
		}
			
		if (cookie.indexOf(name) == 0) {
				
			return cookie.substring(name.length, cookie.length);
			
		}
	  
	}
	  
	return "";
	
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
	  onAfterSubmit: afterSubmit
    }

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
  
  if (event.currentScreen == 'gigya-reset-password-success-screen') {
  
	if (!shouldReturnLinkBeAdded(cdcApiData.returnUrl, cdcApiData.country)) {
      hideSubmitButtonInResetPage();
    }
  } else {
    console.log('Another screen loaded');
  }
}

function afterSubmit(event){
	
	if((event.screen == 'gigya-reset-password-screen')&& (event.response.errorCode == 0)){     
    if(getCookie("location")){
      window.location.href = addOIDCPopupParameter(getCookie("location"));
  } else {
      window.location.href = addOIDCPopupParameter(cdcApiData.returnUrl);
  }
			
			document.cookie = "passwordResetSuccess=true"+";path=/;samesite=none;secure=true";

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
 * Add the oidcpopup parameter to url.
 * @param {string} url
 */
function addOIDCPopupParameter(url){
  const urlObject = new URL(url);
  const params = new URLSearchParams(urlObject.search);

  // Check if oidcPopup parameter is already present in the URL
  if (!params.has('oidcPopup')) {
    params.append('oidcPopup', 'True');
    urlObject.search = params.toString();
    return urlObject.toString();
  } else {
    return url; // oidcPopup parameter is already present, return the original URL
  }
}

