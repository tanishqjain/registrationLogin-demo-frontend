$(document).ready(function () {
  $("#register-page-error-alert").hide();

  $("#register-page-email").keypress(function () {
    $("#register-page-error-alert").hide();
  });

  $("#registerForm").on("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting normally
    var user = {};

    user.username = $("#register-page-username").val();
    user.email = $("#register-page-email").val();
    user.password = $("#register-page-password").val();

    $.ajax({
      type: "POST",
      url: "http://localhost:5000/api/users/register",
      data: JSON.stringify(user),
      contentType: "application/json",
      dataType: "json",
      success: function (response) {
        setSessionCookie(response.token);
        document.href = "../index.html";
      },
      error: function (response) {
        $("#register-page-error-alert").show();
      },
    });
  });
});

function setSessionCookie(token) {
  $.cookie("sessionToken", token, { expires: 7, path: "/" });
}


