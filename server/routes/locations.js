// server/routes/locations.js
var router = require("express").Router();
var pg = require("pg");

var connectionString = require('../../modules/dbconnection').connectionString;

router.get("/", function(req, res) {
  var userInfo = req.user;

  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      console.log("Error connecting to PG locations file", err);
      res.status(500).send(err);
    } else {
      var results = [];
      client.query("SELECT books.id AS book_id, users.id AS user_id, " +
      "books.title, books.series, books.author, books.languages, books.published, " +
      "books.publisher, books.plot, ub.locations, ub.favorites, books.isbn13, books.isbn10 " +
      "FROM books " +
      "JOIN users_books AS ub ON books.id = ub.book_id " +
      "JOIN users ON ub.user_id = users.id WHERE users.id = $1;", [userInfo.id], function(err, result) {
        if (err) {
          console.log(err);
          res.status(500).send(err);
          process.exit(1);
        } else {
          res.send(result.rows);
          done();
        }
      });
    } //  else
  }); //  pg.connect
}); //  router.get

module.exports = router;
