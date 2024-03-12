// 2021-04-20 18:00
//const isStorageDomainOverride = true; // Production
const isStorageDomainOverride = false; // Test

var cdcApiData = {
  apiKey: '',
  brand: '',
  language: '',
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
 * The password reset token is automatically fetch by the
 * reset password CDC frame.
 */
function getCdcResetPasswordFrame() {
  try {
    const urlSearchParamsObj = getUrlParametersObj();
    cdcApiData = getCdcApiData(cdcApiData, urlSearchParamsObj);
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
    cdcApiData.language = getLanguageFromUrl(urlSearchParamsObj);
    return cdcApiData;
  } catch (err) {
    throw new Error (err.message);
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
      screenSet: `${cdcApiData.brand}-RegistrationLogin`,//${cdcApiData.brand} (Value updated to toUpperCase so Default name added)
      startScreen: "oneapp-gigya-reset-password-screen",
      containerID: "cdc-reset-psw-container",
      onError: errorHandler,
      onAfterScreenLoad: afterScreenLoad
    }

    console.log('Screen Set: ', screenSetParams);
  
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
  return{
    nextScreen: 'reset-password-link-expire'
  };
}

function afterScreenLoad(event) {
  console.log('CALLING AFTER SCREEN LOAD: ', event);
  if (event.currentScreen == 'oneapp-gigya-reset-password-success-screen') {
    console.log('CALLING AFTER SCREEN LOAD FOR SUCCESS SCREEN');
    hideSubmitButtonInResetPage();
  } else {
    console.log('Another screen loaded');
  }
  if(event.currentScreen == 'oneapp-gigya-reset-password-screen'){
    passwordEyeIcon();
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
function passwordEyeIcon(){
  var passwordfield=document.querySelector("#gigya-password-newPassword");
// if(passwordfield!==null) {
var eyeImage = document.createElement("img");
eyeImage.setAttribute("data-src", "/-/media/Feature/Gigya/eyeIcon");
eyeImage.setAttribute("class", "lazyload");
eyeImage.src = " https://cdn.sanity.io/images/asthuuoj/prod-env/9c636ad42f8e574ee67f36d43f3a2fb7446e773e-24x24.png";
eyeImage.alt = "eye Icon";
  var pwDiv = document.createElement('div');
  pwDiv.appendChild(eyeImage);
  pwDiv.setAttribute('style', 'float: right !important; color: red !important; z-index: 9999999999999999999 !important; display: inline-block !important; position: relative;  cursor: pointer !important; text-align: center;margin-top: -3rem;margin-bottom: 3.5rem;margin-right: 0.5rem;');

        // add eventListener
        pwDiv.addEventListener("click", function() {
        //debugger;
            var pwdCurrentValue = passwordfield.type;
            if (pwdCurrentValue === 'password') {
                passwordfield.type = "text";
                pwDiv.removeAttribute('style', 'float: right !important; color: red !important; z-index: 9999999999999999999 !important; display: inline-block !important; position: relative;  cursor: pointer !important; text-align: center;margin-top:-3rem;margin-bottom: 3.5rem;margin-right: 0.5rem;');
                eyeImage.src ="https://cdn.sanity.io/images/asthuuoj/prod-env/747098eb0fe469c93d5cf4857846953de3161c3e-24x24.png";
                pwDiv.setAttribute('style', 'float: right !important; color: red !important; z-index: 9999999999999999999 !important; display: inline-block !important; position: relative;  cursor: pointer !important; text-align: center;margin-top: -3rem;margin-bottom: 3.5rem;margin-right: 0.5rem;');
                
            } else {
                passwordfield.type = "password";
                  eyeImage.src ="https://cdn.sanity.io/images/asthuuoj/prod-env/9c636ad42f8e574ee67f36d43f3a2fb7446e773e-24x24.png";
                
            }
             });
        // attach to password field
        passwordfield.parentElement.appendChild(pwDiv);
      // }
      //End Password eye icon for Reset Password screen  Password field

  // Confirm Password
  var newpasswordfield=document.querySelector("#gigya-password-passwordRetype");

// if(event.currentScreen == 'gigya-reset-password-screen')
// {

var eyeImage1 = document.createElement("img");
eyeImage1.setAttribute("data-src", "/-/media/Feature/Gigya/eyeIcon");
eyeImage1.setAttribute("class", "lazyload");
eyeImage1.src = " https://cdn.sanity.io/images/asthuuoj/prod-env/9c636ad42f8e574ee67f36d43f3a2fb7446e773e-24x24.png";
eyeImage1.alt = "eye Icon";
    var newPwDiv = document.createElement('div');
    newPwDiv.appendChild(eyeImage1);
    newPwDiv.setAttribute('style', 'float: right !important; color: red !important; z-index: 9999999999999999999 !important; display: inline-block !important; position: relative;  cursor: pointer !important; text-align: center;margin-top: -3rem;margin-bottom: 3.5rem;margin-right: 0.5rem;');

        // add eventListener
        newPwDiv.addEventListener("click", function() {
        //debugger;
            var newPwdCurrentValue = newpasswordfield.type;
            if (newPwdCurrentValue === 'password') {
                newpasswordfield.type = "text";
                newPwDiv.removeAttribute('style', 'float: right !important; color: red !important; z-index: 9999999999999999999 !important; display: inline-block !important; position: relative;  cursor: pointer !important; text-align: center;margin-top:-3rem;margin-bottom: 3.5rem;margin-right: 0.5rem;');
                eyeImage1.src ="https://cdn.sanity.io/images/asthuuoj/prod-env/747098eb0fe469c93d5cf4857846953de3161c3e-24x24.png";
                newPwDiv.setAttribute('style', 'float: right !important; color: red !important; z-index: 9999999999999999999 !important; display: inline-block !important; position: relative;  cursor: pointer !important; text-align: center;margin-top: -3rem;margin-bottom: 3.5rem;margin-right: 0.5rem;');
                
            } else {
                newpasswordfield.type = "password";
                  eyeImage1.src =" https://cdn.sanity.io/images/asthuuoj/prod-env/9c636ad42f8e574ee67f36d43f3a2fb7446e773e-24x24.png";
                
            }
             });
        // attach to password field
        newpasswordfield.parentElement.appendChild(newPwDiv);
      // }
        //End Password eye icon for Reset Password screen  Confirm Password field
        
}
