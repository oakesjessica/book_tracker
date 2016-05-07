var router = require("express").Router();
var path = require("path");
var passport = require("passport");
var wishlist = require("./wishlist");
var login = require("./login");
var register = require("./register");
var library = require("./library");
var borrowed = require("./borrowed");
var shelves = require("./shelves");

router.use("/login", login);
router.use("/register", register);
router.use("/library", library);
router.use("/borrowed", borrowed);
router.use("/wishlist", wishlist);
router.use("/shelves", shelves);

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
