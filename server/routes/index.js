//  INDEX ROUTER
var router = require("express").Router();
var path = require("path");
var passport = require("passport");

router.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/views/index.html"));
});

router.get("/logout", function(req, res) {
  console.log("Logging Out");
  req.logout();
  res.redirect("/");
});

router.post("/", function(req, res) {
  console.log('attempting to authenticate');
  passport.authenticate("local")(req, res, function() {
    res.sendStatus(200);
  });
}); //  router.post("/")

module.exports = router;
