//   WISHLIST ROUTER
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
      client.query("SELECT books.id AS book_id, books.title, books.series, books.author, books.languages, " +
      "books.published, books.locations, users.id AS user_id, users.email FROM books " +
      "JOIN wishlist ON books.id = wishlist.book_id " +
      "JOIN users ON wishlist.user_id = users.id WHERE users.id = $1;", [userInfo.id], function(err, result) {
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
