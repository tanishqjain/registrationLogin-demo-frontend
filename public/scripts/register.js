$(document).ready(function () {
  $("#register-page-error-alert").hide();
  $("#registerForm").on("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting normally
    var user = {};

    user.username = $("#register-page-username").val();
    user.email = $("#register-page-email").val();
    user.password = $("#register-page-password").val();

    console.log(user);

    $.ajax({
      type: "POST",
      url: "http://localhost:5000/api/users/register",
      data: JSON.stringify(user),
      contentType: "application/json",
      dataType: "json",
      success: function (response) {
        console.log(response);
      },
    });
  });
});


