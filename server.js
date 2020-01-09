var express = require("express");
var expresshandles = require("express-handlebars");
var db = require("./models");
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
app.set("view engine", "handlebars");
app.use(express.static(__dirname + '/public'));
app.use(require("./controller/html-routes"));

db.sequelize.sync().then(function() {
  app.listen(port, function() {
    console.log("listening on port ", port);
  });
});
