// server/routes/login.js
var router = require("express").Router();
var path = require("path");

router.get("/", function(req, res, next) {
  res.sendFile(path.resolve(__dirname, "../public/views/partials/login.html"));
}); //  router.get("/")

module.exports = router;
