/*
* This function make UI changes once screens are loaded for RAC Claim
*/
function onAfterScreenLoadHandler(event){
	
    debugger;
    if (event.currentScreen === 'gigya-login-screen'){
      var createaccountLink = document.getElementById('login-create-account-link');
      var forgotPasswordLink = document.getElementById('login-forgot-password-link');
  
      createaccountLink.addEventListener('click', function (event) {
        event.preventDefault();
        switchscreen('FRIGIDAIRE-RegistrationLogin','gigya-register-screen')
      });
  
      forgotPasswordLink.addEventListener('click', function (event) {
        event.preventDefault();
        switchscreen('FRIGIDAIRE-RegistrationLogin','gigya-forgot-password-screen')
      });
  
    }
  
    if(event.currentScreen === 'gigya-register-screen'){
      var loginLink = document.getElementById('register-already-have-act-link');
  
      loginLink.addEventListener('click', function (event) {
        event.preventDefault();
        switchscreen('FRIGIDAIRE-RegistrationLogin','gigya-login-screen')
      });

      document.getElementById("register-terms-link").href = "https://www.frigidaire.com/en/terms-and-conditions"
      document.getElementById("register-privacy-link").href = "https://www.frigidaire.com/en/privacy-policy"
  
    }
  
    if(event.currentScreen === 'gigya-forgot-password-screen'){
      var loginLink = document.getElementById('forgot-password-back-link');
  
      loginLink.addEventListener('click', function (event) {
        event.preventDefault();
        switchscreen('FRIGIDAIRE-RegistrationLogin','gigya-login-screen')
      });
  
    }
}

/*
* This function make changes to data that is submitted
*/
function onSubmitEventHandler(event){

if(event.screen === 'gigya-register-screen'){
    if(event.formModel && event.formModel.data){
    event.formModel.data.sourceCode = cdcApiData.sourceCode;
    }
    else{
    event.formModel.data = {
        'sourceCode': cdcApiData.sourceCode
    }
    }

    if(event.formModel && event.formModel.profile){
    event.formModel.profile.country = cdcApiData.country;
    event.formModel.profile.languages = cdcApiData.language.toUpperCase();
    event.formModel.profile.locale = cdcApiData.language.toLocaleLowerCase();
    }
    else{
    event.formModel.profile = {
        'country': cdcApiData.country,
        'languages': cdcApiData.language.toUpperCase(),
        'locale': cdcApiData.language.toLowerCase()
    }
    }
}
}