var urlParamsArr = {};
var urlParams = document.location.search.substr(0).split("&");
for (var i = 0; i < urlParams.length; i++) {
	var ret = urlParams[i].toString().split("=");
	urlParamsArr[ret[0]] = decodeURIComponent(ret[1]);
}

var apiKey = "3_FkK8h2p1ixae9GRVi7oDMmDQLBZ5F3NzNfzWiR0MZjFqx97LqYLGnKvHczYXIinK"; // CDC IdP Stage EU API Key

if (urlParamsArr["apiKey"]) {
	apiKey = urlParamsArr["apiKey"]; // If available use API key.
}

// Include Gigya JS WebSDK
addJs(apiKey);

var brandPrefix = urlParamsArr["spName"].split(".")[0].toUpperCase(); //aeg.dev -> AEG

var onGigyaServiceReady = function() {
	gigya.accounts.showScreenSet({
		screenSet: brandPrefix + "-RegistrationLogin",
		containerID: "gigya-container",
	});
	
	gigya.socialize.addEventHandlers({
		onLogin:onLoginHandler,
		containerID: 'gigya-container',
	    onError: onErrorHandler,
	});
}

// Add Gigya Web SDK
function addJs(spApiKey) {		
	var s1 = document.createElement("script");
	s1.type = "text/javascript";
	s1.async = true;
	if (urlParamsArr["language"]) {
		s1.src = "https://cdc.myaccount.electroluxgroup.eu/js/gigya.js?apiKey=" + spApiKey + "&lang=" + urlParamsArr["language"];
	} else {
		s1.src = "https://cdc.myaccount.electroluxgroup.eu/js/gigya.js?apiKey=" + spApiKey;
	}

	s1.innerHTML = JSON.stringify({
		storageDomainOverride: "cdc.myaccount.electroluxgroup.eu"
	});
	
	document.head.appendChild(s1);
}

function onErrorHandler(eventObj){
    debugger;
    alert(eventObj);
}

// onLogin Event handler
function onLoginHandler(eventObj) {
    // continue with SAML flow
    gigya.fidm.saml.continueSSO();
}