//  INDEX ROUTER
var router = require("express").Router();
var path = require("path");
var passport = require("passport");

var login = require("./login");
var register = require("./register");
var library = require("./library");
var wishlist = require("./wishlist");
var favorites = require("./favorites");
var shelves = require("./shelves");
var borrowed = require("./borrowed");
var lent = require("./lent");
var locations = require("./locations");

router.use("/login", login);
router.use("/register", register);
router.use("/library", library);
router.use("/wishlist", wishlist);
router.use("/favorites", favorites);
router.use("/shelves", shelves);
router.use("/borrowed", borrowed);
router.use("/lent", lent);
router.use("/locations", locations);

router.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/views/index.html"));
});

router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

router.post("/", function(req, res) {
  console.log('attempting to authenticate');
  passport.authenticate("local")(req, res, function() {
    res.sendStatus(200);
  });
}); //  router.post("/")

router.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/views/index.html"));
});

module.exports = router;
