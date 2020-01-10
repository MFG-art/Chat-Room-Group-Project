var userNameBox = $("#username");
var passwordBox = $("#createpwd");
var passwordConfBox = $("#confirmpwd");
$(".btn").on("click", function(event) {
    event.preventDefault();
    var userName = userNameBox.val().trim();
    var password = passwordBox.val().trim();
    var passwordCon = passwordConfBox.val().trim();
    if(password === passwordCon && userName !== "" && password !== ""){
        $.ajax({
            method: "POST",
            url: "/api/signup",
            data: {
                username: userName,
                password: password
            }
          }).then(function(data) {
            console.log("success");
          });

    }
    else{
        
    }
});