// const userNameBox = $("#username");
// const passwordBox = $("#password");
// $("#loginBtn").on("click", function (event) {
//     event.preventDefault();
//     console.log("hi");
//     var userName = userNameBox.val().trim();
//     var password = passwordBox.val().trim();
//     $.get("/api/signin/" + userName, function(data) {
//         console.log(data);
//       });
// })
$(document).ready(function() {
    // Getting references to our form and inputs
    const userNameBox = $("#username");
    const passwordBox = $("#password");
    // When the form is submitted, we validate there's an email and password entered
    $("#loginBtn").on("click", function(event) {
      event.preventDefault();
      var userData = {
        username : userNameBox.val().trim(),
        password : passwordBox.val().trim()
      };
  
      if (!userData.username || !userData.password) {
        return;
      }
  
      // If we have an email and password we run the loginUser function and clear the form
      loginUser(userData.username, userData.password);
      userNameBox.val("");
      passwordBox.val("");
    });
  
    // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
    function loginUser(username, password) {
      $.post("/api/login", {
        username: username,
        password: password
      })
        .then(function() {
            // right password
            console.log("works");
            // change this to chatroom route
          window.location.replace("/");
          // If there's an error, log the error
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  });
  