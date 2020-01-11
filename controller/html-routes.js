var router = require("express").Router();
var path = require("path");
var db = require("../models");
var passport = require("../config/passport");
var isAuthenticated = require("../config/middleware/isAuthenticated");
// homepage route
router.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/home.html"));
});
// sign up page route
router.get("/signup", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/signuppage.html"));
});
// api routes
// making a new account sign up.
router.post("/api/signup", function(req, res) {
  console.log(req.body);
  db.Users.create(req.body).then(function(ih) {
    res.json(ih);
  });
});
// checks if it username and password is right in database
router.post("/api/login", passport.authenticate("local"), function(req, res) {
  res.json(req.user);
});
// router.get("/signup", isAuthenticated, function(req, res) {
//   res.sendFile(path.join(__dirname, "../public/signuppage.html"));
// });
// router.get("/api/signin/:username", function(req, res) {
//   var user = req.params.username;
//   console.log(user);
//   db.Users.findOne({
//     where:{
//       username : user
//     }
//   }).then(function(result){
//     res.json(result);
//   })
// });

router.delete("/user/delete/:email", function(req, res) {
  user
    .destroy({
      where: {
        email: req.params.email
      }
    })
    .then(function(dbUser) {
      res.redirect("/");
    });
});

router.post("/user/signup", function(req, res) {
  user
    .findOne({
      email: req.body.email
    })
    .then(function(dbuser) {
      if (dbUser.password === req.body.password) {
        res.render("user", {
          user: dbUser
        });
      } else {
        res.render("user", {
          user: "invalid credentials"
        });
      }
    });
});

router.get("/users/all", function(req, res) {
  users.all(function(data) {
    res.render("user", {
      users: data
    });
  });
});



router.post("/chats/create", function(req, res) {
  chats.create(req.body.chats_name, function(data) {
    res.redirect("/");
  });
});

router.put("/chats/:id", function(req, res) {
  chats.update(req.params.id, function(data) {
    res.redirect("/");
  });
});
module.exports = router;
