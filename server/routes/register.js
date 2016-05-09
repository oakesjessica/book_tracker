//  REGISTER ROUTER
var router = require("express").Router();
var passport = require("passport");
var path = require("path");
var pg = require("pg");

var encryptLib = require("../../modules/encryption");
var connectionString = "postgres://localhost:5432/book_tracker";

router.get("/", function(req, res, next) {
  res.sendFile(path.resolve(__dirname, "../public/views/register.html"));
}); //  router.get("/")

router.post("/", function(req, res, next) {

  var user = {
    password : encryptLib.encryptPassword(req.body.password),
    first_name : req.body.firstName,
    last_name : req.body.lastName,
    email : req.body.email
  };  //  user

  console.log("user", user);

  pg.connect(connectionString, function(err, client) {
    var query = client.query("INSERT INTO users (email, password, first_name, last_name) VALUES ($1, $2, $3, $4)", [user.email, user.password, user.first_name, user.last_name]);

    query.on("error", function(err) {
      console.log("Error with posting to /register", err);
      res.sendStatus(500);
    });

    query.on("end", function() {
      res.sendStatus(200);
      client.end();
    });
  });
}); //  router.post("/")

module.exports = router;
