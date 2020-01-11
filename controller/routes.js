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
// check if login
router.get("/chatroom", isAuthenticated, function(req, res) {
  res.sendFile(path.join(__dirname, "../public/chat.html"));
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

router.get("/api/allusers", function(req, res) {
  db.Users.findAll({}).then(function(data) {
    var usernames = [];
    for (i = 0; i < data.length; i++) {
      usernames.push(data[i].username);
    }
    console.log(usernames);
    res.json(usernames);
  });
});

router.get("/api/allmessages", function(req, res) {
  db.Chat.findAll({ include: [db.Users] }).then(function(data) {
    var messages = [];
    for (i = 0; i < data.length; i++) {
      let newData = { message: data[i].message, user: data[i].User.username };
      messages.push(newData);
    }
    console.log(messages);
    res.json(messages);
  });
});

router.post("/chats/create", function(req, res) {
  var id = req.user.id;
  //TODO: username and message text
  console.log(req.body.message);
  db.Chat.create({
    message: req.body.message,
    UserId: id
  }).then(function(data) {});
});

router.get("/api/thisuser", function(req, res) {
  var name = req.user.username;
  res.json(name);
});

module.exports = router;
