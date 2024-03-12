// 2021-04-19 07:30
const isStorageDomainOverride = true; // Production
//const isStorageDomainOverride = false; // Test

var cdcApiData = {
  apiKey: '',
  childApiKey: '',
  spName: '',
  country: '',
  language: '',
  render_screen: '',
  market: '',
  sourceCode: ''
}

var ACC = {};

var pageLocation, commonUrl = "";

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
    pageLocation = window.location.href;
    pageLocation = pageLocation.toString();

		console.log(typeof(pageLocation));
		commonUrl = pageLocation.substring(0,pageLocation.lastIndexOf('/'));
    console.log("CommonURL login.js",commonUrl)
    const urlSearchParamsObj = getUrlParametersObj();
    cdcApiData = getCdcApiData(cdcApiData, urlSearchParamsObj);
	loadSpinner(cdcApiData);
    loadCdcApiDynamically(cdcApiData, isStorageDomainOverride);
    
    ACC.gigyaUserMode = 'raas';
				
		ACC.eluxGigyaSourceCode = cdcApiData.sourceCode;
				
		ACC.eluxGigyaLocale = cdcApiData.language;
			
		ACC.eluxGigyaLanguages = cdcApiData.language.toUpperCase();
				
		ACC.eluxGigyaCountry = cdcApiData.country;
  } catch (err) {
    //centerErrorContent()
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
    cdcApiData.country = getCountryFromUrl(urlSearchParamsObj);
    cdcApiData.render_screen = getRenderedScreenFromUrl(urlSearchParamsObj);
	cdcApiData.sourceCode = getSourceCodeFromUrl(urlSearchParamsObj);
    /*cdcApiData.market = getMarketFromUrl(urlSearchParamsObj);*/

    return cdcApiData;
  } catch (err) {
    console.log(`${err.message}. Create default CDC API data!`);
    throw new Error(err.message);
  }
}

function loadSpinner(cdcApiData){
	
	if(cdcApiData.spName == "ELX"){
					
		var cssId = "css/spinnerELX.css";
		var head  = document.getElementsByTagName('head')[0];
		var link  = document.createElement('link');
		link.id   = cssId;
		link.rel  = 'stylesheet';
		link.type = 'text/css';
		link.href =  cssId;
		link.media = 'all';
		head.appendChild(link);

	} else if(cdcApiData.spName == "AEG"){

		var cssId = "css/spinnerAEG.css";
		var head  = document.getElementsByTagName('head')[0];
		var link  = document.createElement('link');
		link.id   = cssId;
		link.rel  = 'stylesheet';
		link.type = 'text/css';
		link.href =  cssId;
		link.media = 'all';
		head.appendChild(link);

	} else if(cdcApiData.spName == "ZAN"){

		var cssId = "css/spinnerZAN.css";
		var head  = document.getElementsByTagName('head')[0];
		var link  = document.createElement('link');
		link.id   = cssId;
		link.rel  = 'stylesheet';
		link.type = 'text/css';
		link.href =  cssId;
		link.media = 'all';
		head.appendChild(link);

	} else {

		var cssId = "css/spinnerELX.css";
		var head  = document.getElementsByTagName('head')[0];
		var link  = document.createElement('link');
		link.id   = cssId;
		link.rel  = 'stylesheet';
		link.type = 'text/css';
		link.href =  cssId;
		link.media = 'all';
		head.appendChild(link);

	}
	
}

function redirectToProxy(cdcApiData) {

		/*var url = gigya.utils.URL.addParamsToURL("https://identity.myaccount.electroluxgroup.eu/staging/dev/proxy.html",{

			mode: 'afterLogin'

		});*/
		
		var url = gigya.utils.URL.addParamsToURL(commonUrl + "/proxy.html",{

			mode: 'afterLogin',
			spName: cdcApiData.spName,
			language: cdcApiData.language,
			render_screen: cdcApiData.render_screen,
			country: cdcApiData.country,
			sourceCode: cdcApiData.sourceCode

		});

	window.location.href = url;

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
    startScreen: `gigya-${cdcApiData.render_screen}-screen`,
    context: cdcApiData.country,
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
  //gigya.fidm.saml.continueSSO();
  redirectToProxy(cdcApiData);
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