// 2021-04-19 07:30
const isStorageDomainOverride = true; // Production
  //const isStorageDomainOverride = false; // Test
const CDC_PATH = 'https://cdc.myaccount.electroluxgroup.eu/js/gigya.js';
var cdcApiData = {
  apiKey: '4_TySGM90Uf7f7GGLgX4HX-w',
  childApiKey: '',
  spName: '',
  country: '',
  language: '',
  render_screen: '',
  market: '',
  sourceCode: '',
  optanonConsent: '',
  UAID: '',
  passReturnURL: '',
  _gl: '',
  copyUpdateParam: '',
  brandname: 'Electrolux'
}

//SAPCDC-100 | Support for multilingual countries
const localeLookup = {
	'IE': {
	  'en': 'en-IE'
	},
	'AT': {
	  'de': 'de-AT'
	},
	'CH': {
	  'de': 'de-CH',
	  'fr': 'fr-CH',
	  'it': 'it-CH'
	},
	'BE': {
	  'nl': 'nl-BE',
	  'fr': 'fr-BE'
	},
	'LU':{
		'fr': 'fr-LU'
	}
  };

var ACC = {};

var pageLocation, commonUrl = "";
var urlParamsArr = {};
var urlSearchParamsObj;
var queryString;

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

		commonUrl = pageLocation.substring(0,pageLocation.lastIndexOf('/'));	
		queryString = window.location.search;
    	urlSearchParamsObj = new URLSearchParams(queryString);

					if (urlSearchParamsObj && urlSearchParamsObj.has('gig_ui_locales')) {

						ui_locales = urlSearchParamsObj.get('gig_ui_locales');

						cdcApiData.spName = ui_locales.split('|')[0];

						cdcApiData.language =  ui_locales.split('|')[1];

						cdcApiData.passReturnURL = ui_locales.split('|')[2];

					} else if(urlSearchParamsObj && (urlSearchParamsObj.has('spName') && urlSearchParamsObj.has('language') &&  urlSearchParamsObj.has('passReturnURL'))){

						cdcApiData.spName = urlSearchParamsObj.get('spName');

						cdcApiData.language =  urlSearchParamsObj.get('language').toLowerCase();

						cdcApiData.passReturnURL =  urlSearchParamsObj.get('passReturnURL');

					} else{

						cdcApiData.language = "EN";

						cdcApiData.spName = "ELX";

						cdcApiData.passReturnURL = "https://t1-electrolux-qa-b.eluxmkt.com/en-gb/";

					}

					if (urlSearchParamsObj && urlSearchParamsObj.has('gig_login_hint')) {

						login_hint = urlSearchParamsObj.get('gig_login_hint');

						cdcApiData.render_screen = login_hint.split('|')[0];

						cdcApiData.country =  login_hint.split('|')[1].toUpperCase();
						
						cdcApiData.sourceCode =  login_hint.split('|')[2];	
						
						cdcApiData.childApiKey =  login_hint.split('|')[3]; //.slice(3).join('-');
						
						cdcApiData.optanonConsent = login_hint.split('|')[4];
						
						cdcApiData.UAID = login_hint.split('|')[5];
						
						cdcApiData.copyUpdateParam = login_hint.split('|')[6];

						cdcApiData._gl = login_hint.split('|')[7];
					
					}  else if(urlSearchParamsObj && (urlSearchParamsObj.has('render_screen') && urlSearchParamsObj.has('country') && urlSearchParamsObj.has('sourceCode') && urlSearchParamsObj.has('childApiKey'))){

						cdcApiData.render_screen = urlSearchParamsObj.get('render_screen');

						cdcApiData.country =  urlSearchParamsObj.get('country');
						
						cdcApiData.sourceCode =  urlSearchParamsObj.get('sourceCode');
						
						cdcApiData.childApiKey =  urlSearchParamsObj.get('childApiKey');
						
						cdcApiData.optanonConsent = urlSearchParamsObj.get('optanonConsent');
						
						cdcApiData.UAID = urlSearchParamsObj.get('UAID');

						cdcApiData.copyUpdateParam = urlSearchParamsObj.get('copyUpdateParam');
						
						cdcApiData._gl = urlSearchParamsObj.get('_gl');


					}else{

						cdcApiData.render_screen = "login";

						cdcApiData.country = "UK";

						cdcApiData.sourceCode = "150";
						
						cdcApiData.childApiKey = "3_XlyFBe0-7kGWpiu4ooVsC1Xdeqcxfh5wdKpu-1IHA_qEnyPYbnWw7Z5TadCoidcs";
						
					}

					if (urlSearchParamsObj && urlSearchParamsObj.has('mode') && urlSearchParamsObj.get('mode') === 'error'){
						const errMessage = urlSearchParamsObj.get('errorMessage');
						const errCode = urlSearchParamsObj.get('errorCode');
						console.log(`OIDC Error | ${errCode} | ${errMessage}`)

						if (window.self === window.top) {
							// The error page is loaded as a standalone page in redirect flow
							const returnUrl = cdcApiData.passReturnURL;
							const localeCountry = `${cdcApiData.language}-${cdcApiData.country}`.toLowerCase();
							var redirectUrl = returnUrl ? truncateURL(returnUrl, localeCountry) : "https://t1-electrolux-qa-b.eluxcdn.com/en-gb";
							
							window.location.href = redirectUrl+"/errors/application-error/";
						
						} else {
							// The error page is loaded inside an iframe in pop-up flow
							var message = {
								dataName: 'OIDC error, please redirect to error page',
								dataType: 'Error',
								dataID: 'ERROIDCTokenExpiry02'
							};	
							window.top.postMessage(message, '*');
						}

					}

			if(cdcApiData.language == "sq"){

				cdcApiData.language = "en";

			}
//********end of Reading and decrypting parameter from URL
		ACC.gigyaUserMode = 'raas';
					
		ACC.eluxGigyaSourceCode = cdcApiData.sourceCode;

		// Changes for SAPCDC-100 | Enable support for multilingual countries
		const country = cdcApiData.country;
		const language = cdcApiData.language;

		if (localeLookup[country] && localeLookup[country][language]) {
		ACC.eluxGigyaLocale = localeLookup[country][language];
		} else {
		ACC.eluxGigyaLocale = language;
		}
		//SAPCDC-100 | Changes Ends Here
				
		ACC.eluxGigyaLanguages = cdcApiData.language.toUpperCase();
					
		ACC.eluxGigyaCountry = cdcApiData.country;
      	if(cdcApiData.spName == "ZAN")
		{
			cdcApiData.brandname = "Zanussi";
		}
		if(cdcApiData.spName == "AEG")
		{
			cdcApiData.brandname = "AEG";
		}
		addGTMScript(cdcApiData);
		//addCryptoJS();
		addIframeResizerJS();
	} catch (err) {
		//centerErrorContent()
		showErrorContent();
		const header = 'Error when creating login page';
		addErrorContentToTemplate(header, err.message);
	}

}

/*function loadSpinner(cdcApiData){
	
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
	
}*/


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
							//Check Cookie issue		
						//Checking Cookies issue and return to Source 
						debugger;						
						if(document.cookie === "" || gigya.localInfo.isFF) {						
							var message = {
								dataName: 'Cookies Issue,Please redirect from Proxy Page',
								dataType: 'Error',
								dataID: 'ERRProxyCookie01'
							};
							window.top.postMessage(message, '*');
						}
  try {
	gigya.accounts.session.verify({callback: function(event){
		if(event.errorCode == 0){
			//gigya.sso.continue();
			gigya.fidm.oidc.op.redirectToContinue({
				opKey: gigya.apiKey,
				context: gigya.getUrlParam("context"),
				login_token: gigya.getLoginToken(),
				mode:'afterLogin'
			});
		}
		else{
			const screenSetParams = createScreenSetParameters(cdcApiData);
			gigya.accounts.showScreenSet(screenSetParams);

			gigya.socialize.addEventHandlers({
			  onLogin: onLoginHandler,
			  containerID: 'cdc-login-container',
			  onError: onErrorHandler,
			});
		}
	}});
	
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
function createScreenSetParameters(cdcApiData){
	
	const country = cdcApiData.country;
	var language = cdcApiData.language;

	if (localeLookup[country] && localeLookup[country][language]) {
	 language = localeLookup[country][language];
	}

	const screenSetParams = {
			screenSet: `${cdcApiData.spName}-RegistrationLogin`,
			startScreen: `gigya-${cdcApiData.render_screen}-screen-new`,
			context: cdcApiData.passReturnURL,
			lang: language,
			containerID: "cdc-login-container"
		}
	 
	return screenSetParams;
}

function addGTMScript(cdcApiData)
{
		var pageLanguage = cdcApiData.language + "-" + cdcApiData.country;
		window.dataLayer = window.dataLayer || [];
		window.dataLayer.push({'pageType':'IDPPage', 'pageLanguage': pageLanguage});

						var s2 = document.createElement("script");
						
						s2.type = "text/javascript";
						
						s2.async = true;
						
						s2.src = "https://www.googletagmanager.com/gtm.js?id=GTM-W6ZPFVJ";
						
						document.head.appendChild(s2);
}
/**
 * Listen at Gigya login events.
 *
 * Listen to a login event and continue the SAML flow.
 * @param {object} eventObj - The event object.
 */
 function onLoginHandler(eventObj) {
   //gigya.sso.continue();
   gigya.fidm.oidc.op.redirectToContinue({
    opKey: gigya.apiKey,
    context: gigya.getUrlParam("context"),
    login_token: gigya.getLoginToken(),
	mode:'afterLogin'
})
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

/**
 * Centers the error content.
 *
 * Centers the error content horizontally by adding a class with flex to
 * the page wrapper.
 * Used for pages which contains CDC screen set.
 *
 * @throws {error} - If an error occures when centering the error content.
 */
function centerErrorContent() {
  try {
    const  pageWrapperElement = document.getElementById('page-wrapper');
    if (!pageWrapperElement.classList.contains('center-error-content')) {
      pageWrapperElement.classList.add('center-error-content');
    }
  } catch (err) {
    throw new Error('Failed to center error content!');
  }
}
/**
 * Shows the error content
 * 
 * Shows the error conent by cleraring the dispaly none style.
 */
 function showErrorContent() {
  const errorContentElement = document.getElementById('error-wrapper');
  errorContentElement.style.display = '';
}
/**
 * Add error content to the screen.
 * 
 * @param {string} header - The header error text.
 * @param {string} message - The error message text.
 */
 function addErrorContentToTemplate(header, message) {
  addErrorHeader(header);
  addErrorMessage(message);
}
function addGTMScript(cdcApiData)
{
		var pageLanguage = cdcApiData.language + "-" + cdcApiData.country;
		window.dataLayer = window.dataLayer || [];
		window.dataLayer.push({'pageType':'IDPPage', 'pageLanguage': pageLanguage});

						var s2 = document.createElement("script");
						
						s2.type = "text/javascript";
						
						s2.async = true;
						
						s2.src = "https://www.googletagmanager.com/gtm.js?id=GTM-W6ZPFVJ";
						
						document.head.appendChild(s2);
}
/*function addCryptoJS()
{
						var s3 = document.createElement("script");
						
						s3.type = "text/javascript";
						
						s3.async = true;
						
						s3.src = "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/crypto-js.min.js";
						
						document.head.appendChild(s3);
}*/
function addIframeResizerJS()
{
						var s4 = document.createElement("script");
						
						s4.type = "text/javascript";
						
						s4.async = true;
						
						s4.src = "/staging/OIDC/js/iframeResizer.contentWindow.min.js";
						
						document.head.appendChild(s4);
}
/**
 * Adds the text to the error header.
 * 
 * Adds a text to the error header tag.
 * 
 * @param {string} text - The text to be added to the error header.
 * @throws {error} - If an error occures when adding the text.
 */
 function addErrorHeader(text) {
  try {
    const headerElement = document.getElementById('error-header');
    headerElement.textContent = text;
  } catch (err) {
    throw new Error(`Header text could not be set. Error: ${err.message}`);
  }
}

/**
 * Adds the text to the error message.
 * 
 * Adds a text to the message error text tag.
 * 
 * @param {string} text - The text to be added to the error message.
 * @throws {error} - If an error occures when adding the text.
 */
 function addErrorMessage(text) {
  try {
    const messageTextElement = document.getElementById('error-message-text');
    messageTextElement.textContent = text;
  } catch (err) {
    throw new Error(`Message text could not be set. Error: ${err.message}`);
  }
}

/**
 * sanitize the redirect URL for error rediraction.
 * 
 * @param {string} url - The text to be added to the error message.
 * @param {string} localeCountry - The text to be added to the error message.
 */
function truncateURL(url, localeCountry) {
	// In case root domain of current website contains market details
	const localeCountryIndex = url.indexOf(localeCountry);
	if (localeCountryIndex !== -1) {
		return url.substring(0, localeCountryIndex + 5);
	}

	// In case root domain of current website doe not contains market details
	const slashIndex = url.indexOf('/', url.indexOf('//') + 2);
	if (slashIndex !== -1) {
		return url.substring(0, slashIndex);
	}
}