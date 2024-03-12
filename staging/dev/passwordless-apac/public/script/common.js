var ACC = {};

const urlParams = new URLSearchParams(window.location.search);
ACC["eluxGigyaCountry"] = urlParams.get('country') !== null ? urlParams.get('country') : "SG";
ACC["eluxGigyaLocale"] = urlParams.get('locale') !== null ? urlParams.get('locale') : "en";
ACC["eluxGigyaSourceCode"] = urlParams.get('sourceCode') !== null ? urlParams.get('sourceCode') : "123";
//hardcoded for the time being
ACC["eluxGigyaLanguages"] = "EN";

var env = urlParams.get('env') !== null ? urlParams.get('env') : "dev";
//Load Gigya WebSDK Dynamically
createCdcApiScriptTag(gigyaApiKeys[env][ACC["eluxGigyaCountry"]]);

$(document).ready(function(){

    $('.logged-in').fadeOut();
    $('.logged-out').fadeIn();
})

let onGigyaServiceReady = function() {
    gigya.accounts.getAccountInfo({callback:function (response) {
        if (response.errorCode == 0) {
            $('.logged-out').fadeOut();
            $('.logged-in').fadeIn();
        }
    }});

    gigya.socialize.addEventHandlers({
        onLogin: loginHandler,
        onLogout: logoutHandler
    });
}

function login(){

    $("#preferenceCentre").hide();
    $("#container").show();
    var params = {
        screenSet: 'APAC-Elx-RegistrationLogin',
        startScreen: 'gigya-login-screen',
        lang: ACC["eluxGigyaLocale"]
        // containerID: "container"
    };
    gigya.accounts.showScreenSet(params);

}

function register(){

    $("#preferenceCentre").hide();
    $("#container").show();

    var params = {
        screenSet: 'APAC-Elx-RegistrationLogin',
        startScreen: 'gigya-register-screen',
        // containerID: "container",
        lang: ACC["eluxGigyaLocale"]
    };
    gigya.accounts.showScreenSet(params);
}

function preferenceCenter(){
    $("#preferenceCentre").hide();
    $("#container").show();

    var params = {
        screenSet: 'APAC-Elx-ProfileUpdate',
        startScreen: 'gigya-communication-screen',
        // containerID: "container",
        lang: ACC["eluxGigyaLocale"]
    };
    gigya.accounts.showScreenSet(params);
}

function profileUpdate(){
    $("#preferenceCentre").hide();
    $("#container").show();

    var params = {
        screenSet: 'APAC-Elx-ProfileUpdate',
        startScreen: 'gigya-update-profile-screen',
        // containerID: "container",
        lang: ACC["eluxGigyaLocale"]
    };
    gigya.accounts.showScreenSet(params);
}

function changePassword(){
    $("#preferenceCentre").hide();
    $("#container").show();

    var params = {
        screenSet: 'APAC-Elx-ProfileUpdate',
        startScreen: 'gigya-update-profile-screen',
        // containerID: "container",
        lang: ACC["eluxGigyaLocale"]
    };
    gigya.accounts.showScreenSet(params);
}

function logout(){
    gigya.accounts.logout();
}


function loginHandler(response){
    $('#container').empty();
    $('.logged-out').fadeOut();
    $('.logged-in').fadeIn();
    
}

function logoutHandler(){
    $('#container').empty();
    $('.logged-out').fadeIn()
    $('.logged-in').fadeOut()
}

function createCdcApiScriptTag(cdcApiPath) {
    try {
      var cdcApiScript = document.createElement("script");
      cdcApiScript.type = "application/javascript";
      cdcApiScript.async = true;
      cdcApiScript.src = `https://cdns.gigya.com/js/gigya.js?apiKey=${cdcApiPath}`;
      document.head.appendChild(cdcApiScript);
    } catch (err) {
      throw new Error(`Can not create CDC API script tag: ${err.message}`);
    }
  }