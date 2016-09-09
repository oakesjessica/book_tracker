//   WISHLIST ROUTER
var router = require("express").Router();
var pg = require("pg");

var connectionString = require('../../modules/dbconnection').connectionString;

router.get("/", function(req, res) {
  var userInfo = req.user.id;

  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      var results = [];
      client.query("SELECT books.id AS book_id, books.title, books.series, books.author, books.languages, " +
      "books.published, books.publisher, books.plot, users.id AS user_id, users.email " +
      "FROM books " +
      "JOIN wishlist ON books.id = wishlist.book_id " +
      "JOIN users ON wishlist.user_id = users.id WHERE users.id = $1;", [userInfo], function(err, result) {
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

router.delete("/:book", function(req, res) {
  var book_id = req.params.book;
  var userInfo = req.user.id;

  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      client.query("DELETE FROM wishlist WHERE book_id = $1 AND user_id = $2", [book_id, userInfo], function(err, results) {
        if (err) {
          console.log(err);
          res.status(500).send(err);
          process.exit(1);
        } else {
          res.send(results.rows);
          done();
        }
      }); //  client.query
    } //  else
  }); //  pg.connect






}); //  router.delete


module.exports = router;
