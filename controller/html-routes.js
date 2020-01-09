var router = require("express").Router();
router.get("/", function(req, res) {
  res.sendfile("./public/home.html");
});
router.get("/signup", function(req, res) {
  res.sendfile("./public/signuppage.html");
});
module.exports = router;
