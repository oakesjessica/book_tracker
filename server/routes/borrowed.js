//  BORROWED ROUTER
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
      //  Query list of books session user (the borrower) is/has borrowed from others
      client.query("SELECT sessionUser.id AS sessionuser_id, bl.status, " +
      "bl.date_initial, bl.date_returned, bl.due_date, " +
      "owners.id AS owner_id, owners.first_name AS owner_first_name, owners.last_name AS owner_last_name, owners.email, owners.username, " +
      "books.id AS book_id, books.title, books.series, books.author, books.languages, books.published, books.publisher, books.plot, " +
      "ub.locations, ub.favorites, books.isbn13, books.isbn10 " +
      "FROM borrowed_and_lent AS bl " +
      "JOIN books ON bl.book_id = books.id " +
      "JOIN users_books AS ub ON books.id = ub.book_id " +
      "JOIN users AS owners ON bl.media_owner = owners.id " +
      "JOIN users AS sessionUser ON bl.borrower = sessionUser.id WHERE sessionUser.id = $1" +
      "ORDER BY bl.due_date ASC;", [userInfo.id], function(err, result) {
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
