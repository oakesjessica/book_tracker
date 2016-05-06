var router = require("express").Router();
var path = require("path");
var passport = require("passport");
var register = require("./register");
var login = require("./login");

router.use("/register", register);
router.use("/login", login);

router.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/views/index.html"));
});

router.post("/", function(req, res) {
  console.log('attempting to authenticate');
  passport.authenticate("local")(req, res, function() {
    res.sendStatus(200);
  });
}); //  router.post("/")

router.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/views/index.html"));
}); //  router.get("/*")


module.exports = router;
