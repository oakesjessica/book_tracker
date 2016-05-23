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
      client.query("SELECT users_books.id, books.id AS book_id, books.title, books.series, books.author, books.languages, " +
      "books.published, books.publisher, books.plot, books.img_src, books.isbn13, books.isbn10, " + 
      "users_books.locations, users_books.favorites, " +
      "users.first_name, users.last_name, users.id AS user_id " +
      "FROM books " +
      "JOIN users_books ON books.id = users_books.book_id " +
      "JOIN users ON users_books.user_id = users.id WHERE users.id = $1 " +
      "ORDER BY title ASC;", [userInfo.id], function(err, result) {
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

router.put("/fav/", function(req, res) {
  var book_id = req.body.book_id;
  var status = req.body.change;
  var userInfo = req.user.id;
  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      client.query("UPDATE users_books AS ub " +
      "SET favorites = $2 " +
      "WHERE ub.book_id = $1 AND ub.user_id = $3 " +
      "", [book_id, status, userInfo], function(err, results) {
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
}); //  router.put

module.exports = router;
