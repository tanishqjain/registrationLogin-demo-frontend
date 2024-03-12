$(document).ready(function () {
    $(".protected-content").hide();
  });
  

let onGigyaServiceReady = function () {
  gigya.accounts.session.verify({
    callback: function (response) {
      if (response.errorCode !== 0) {
        login();
      }
      else{
        loginHandler();
      }
    },
  });

  gigya.socialize.addEventHandlers({
    onLogin: loginHandler,
    onLogout: logoutHandler,
  });
};

function login() {
  
  var params = {
      screenSet: 'CertificateProvisioning-RegistrationLogin',
      startScreen: 'gigya-login-screen',
      onAfterScreenLoad: onAfterScreenLoadHandler
  };
  gigya.accounts.showScreenSet(params);
}

function onAfterScreenLoadHandler(event){
    $(".gigya-screen-dialog-close").hide();
}

function logout() {
$(".protected-content").hide() 
  gigya.accounts.logout();
  stopTokenRefresh();
}

function loginHandler(response) {
  startTokenRefresh();
  $(".protected-content").show()
  populateDeveloperEmail()
}

function logoutHandler() {
  login();
}

let refreshTokenInterval;

// Function to start token refresh interval
function startTokenRefresh(callback) {
  refreshTokenInterval = setInterval(updateBearerToken, 5 * 60 * 1000);
  updateBearerToken(); // Initial token update
}

// Function to stop token refresh interval
function stopTokenRefresh() {
  clearInterval(refreshTokenInterval);
}

// Function to get JWT and update cookies
function updateBearerToken() {
  // Call gigya.accounts.getJWT() to obtain the JWT
  gigya.accounts.getJWT({
    callback: function(response) {
      if (response.errorCode === 0) {
        // JWT obtained successfully
        const jwtToken = response.id_token;

        // Set the token in cookies (you can use a cookie library or document.cookie)
        document.cookie = `BearerToken=${jwtToken}; expires=${new Date(Date.now() + 5 * 60 * 1000).toUTCString()}; path=/`;

        console.log('Bearer token updated successfully:', jwtToken);
      } else {
        console.error('Error obtaining JWT:', response.errorMessage);
      }
    }
  });
}

function readCookie(cookieName) {
  var nameEQ = cookieName + "=";
  var cookies = document.cookie.split(';');
  
  for(var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1, cookie.length);
    }
    if (cookie.indexOf(nameEQ) === 0) {
      return cookie.substring(nameEQ.length, cookie.length);
    }
  }
  
  return null;
}

function populateDeveloperEmail(){
  gigya.accounts.getAccountInfo({
    callback: function(event){
      email = event.profile.email
      $('#developerEmail').val(email)
      $('#custom-developerEmail').val(email)

    }
  })
}