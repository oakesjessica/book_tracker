var router = require("express").Router();
var path = require("path");

router.get("/", function(req, res, next) {
  res.sendFile(path.resolve(__dirname, "../public/views/login.html"));
}); //  router.get("/")

module.exports = router;
