var router = require("express").Router();
var path = require("path");
var db = require("../models");

router.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/home.html"));
});
router.get("/signup", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/signuppage.html"));
});


router.put("/user/useraccount/:email", function(req, res) {
  var newUser = {
    password: req.body.password,
    age: req.body.age,
    name: req.body.name
  };
  user
    .update(newUser, {
      where: {
        email: req.params.email
      }
    })
    .then(function(dbUser) {
      res.json(dbUser);
    });
});

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

router.post("/api/signup", function(req, res) {
  console.log(req.body);
  db.Users.create(req.body).then(function(ih) {
    res.json(ih);
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
