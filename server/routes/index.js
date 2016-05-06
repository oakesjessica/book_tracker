var router = require("express").Router();
var path = require("path");
var wishlist = require("./wishlist");
var login = require("./login");
var register = require("./register");

router.use("/login", login);
router.use("/register", register);
router.use("/wishlist", wishlist);

router.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/views/index.html"));
});

router.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/views/index.html"));
});

module.exports = router;
