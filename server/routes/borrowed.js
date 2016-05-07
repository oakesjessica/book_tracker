var router = require("express").Router();
var pg = require("pg");

var connectionString = "postgres://localhost:5432/book_tracker";

router.get("/", function(req, res) {
  var userInfo = req.user;

  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      var results = [];
      client.query("SELECT * FROM users " +
      "JOIN borrowed_and_lent ON users.id = borrowed_and_lent.user_id AND users.id = $1;", [userInfo.id], function(err, result) {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        } else {
          res.send(result.rows);
        }
      });
    } //  else
  }); //  pg.connect
}); //  router.get

module.exports = router;
