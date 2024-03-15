const isStorageDomainOverride = true; 
const CDC_PATH = 'https://cdns.gigya.com/js/gigya.js';
var cdcApiData = {
  apiKey: '4_gHm0DRWOrvDGpkArRMRUxg',
  childApiKey: '4_PcPPDZQeaqk-rl92MzyF5Q',
  country: 'US',
  language: 'EN',
  render_screen: 'login',
  sourceCode: '832',
  brand: 'FRIGIDAIRE'
}

var onGigyaServiceReady = function() {
		
  try {
	gigya.accounts.session.verify({callback: function(event){
		
		if(event.errorCode == 0){
			gigya.accounts.logout();
		}
    debugger;
		queryString = window.location.search;
    	urlSearchParamsObj = new URLSearchParams(queryString);

		if (urlSearchParamsObj && urlSearchParamsObj.has('gig_login_hint')){
			var login_hint = urlSearchParamsObj.get('gig_login_hint');
			cdcApiData.render_screen = login_hint.split('|')[0];
      cdcApiData.country = login_hint.split('|')[1];
      cdcApiData.sourceCode = login_hint.split('|')[2];
      cdcApiData.childApiKey = login_hint.split('|')[3];
		}

    // if(urlSearchParamsObj && urlSearchParamsObj.has('gig_ui_locales')){
    //   var ui_locales = urlSearchParamsObj.get('gig_ui_locales');
    //   cdcApiData.brand = ui_locales.split('|')[0];
    //   cdcApiData.language = ui_locales.split('|')[1];
    // }
	
		const screenSetParams = createScreenSetParameters(cdcApiData);
		gigya.accounts.showScreenSet(screenSetParams);

		gigya.socialize.addEventHandlers({
			onLogin: onLoginHandler,
			containerID: 'cdc-login-container',
			onError: onErrorHandler,
		});
	
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

	const screenSetParams = {
			screenSet: `${cdcApiData.brand}-RegistrationLogin`,
			startScreen: `gigya-${cdcApiData.render_screen}-screen`,
			lang: cdcApiData.language.toLowerCase(),
			containerID: "cdc-login-container",
			onAfterScreenLoad: onAfterScreenLoadHandler,
      onSubmit: onSubmitEventHandler
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
   gigya.sso.continue();
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


function switchscreen(screenSet, screen){
  var params={
    screenSet: screenSet,
    screen: screen,
    lang: cdcApiData.language.toLowerCase(),
		containerID: "cdc-login-container",
		onAfterScreenLoad: onAfterScreenLoadHandler
   }
   gigya.accounts.switchScreen(params);
}
