
$(document).ready(function() {
    // Getting references to our form and inputs
    const userNameBox = $("#username");
    const passwordBox = $("#createpwd");
    // When the form is submitted, we validate there's an email and password entered
    $(".btn").on("click", function(event) {
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
          window.location.replace("/chatroom");
          // If there's an error, log the error
        })
        .catch(function(err) {
          alert("wrong password or username");
          console.log(err);
        });
    }
  });
  