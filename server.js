var express = require("express");
var expresshandles = require("express-handlebars");
var db = require("./models");
var passport = require("./config/passport");
var session = require("express-session");
var app = express();
var port = process.env.PORT || 3000;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);
app.engine(
  "handlebars",
  expresshandles({
    defaultLayout: "main"
  })
);
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.set("view engine", "handlebars");
app.use(express.static(__dirname + '/public'));
app.use(require("./controller/routes"));


db.sequelize.sync().then(function() {
  app.listen(port, function() {
    console.log("listening on port ", port);
  });
});
