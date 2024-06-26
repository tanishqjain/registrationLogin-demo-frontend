// function getCookie(name){
//     let cookieArr = document.cookie.split(";");
//     for (let i = 0; i < cookieArr.length; i++) {
//       let cookiePair = cookieArr[i].split("=");
//       if (name == cookiePair[0].trim()) {
//         return decodeURIComponent(cookiePair[1]);
//       }
//     }
//     return null;
// }

$(document).ready(function () {
  $("#home-page-login-heading").hide();

  var cookieValue = $.cookie("sessionToken");
  if (cookieValue) {
    $("#home-page-login-heading").show();
  }
});
