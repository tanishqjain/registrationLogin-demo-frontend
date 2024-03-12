AssureFrameCookieAccess();

function AssureFrameCookieAccess(){
	console.log('Page is in frame: ' + PageIsInFrame());
	console.log('Cookies are enabled: ' + CookiesAreEnabled());
	if(PageIsInFrame() && !CookiesAreEnabled()){
		//Escape the iframe to allow avoid third party cookie restrictions
		window.top.location.href = window.location.href; 
	}
}

function PageIsInFrame () {
	try {
		return window.self !== window.top;
	} catch (e) {
		return true;
	}
}

function CookiesAreEnabled(){
	
	var cookiesEnabled = (navigator.cookieEnabled) ? true : false;
	
	//cookieEnabled setting not available. Run a cookie drop check.
	if (typeof navigator.cookiesEnabled == "undefined" && !cookiesEnabled){ 
		document.cookie="testcookie";
		cookiesEnabled = (document.cookie.indexOf("testcookie") != -1) ? true : false;
	}
	
	return cookiesEnabled;
}
