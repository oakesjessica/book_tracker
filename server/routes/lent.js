//  LENT ROUTER
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
      //  Query list of books session user (the lender/media owner) is/has lent out
      client.query("SELECT sessionUser.id AS sessionuser_id, bl.status, " +
      "bl.date_initial, to_char(bl.date_initial, 'DD Mon YYYY') AS date_initial_string, " +
      "bl.date_returned, to_char(bl.date_returned, 'DD Mon YYYY') AS date_returned_string, " +
      "bl.due_date, to_char(bl.due_date, 'DD Mon YYYY') AS due_date_string, " +
      "borrowers.id AS borrower_id, borrowers.first_name AS first_name, borrowers.last_name AS last_name, " +
      "borrowers.email, borrowers.username, " +
      "books.id AS book_id, books.title, books.series, books.author, books.languages, " +
      "to_char(books.published, 'DD Mon YYYY') AS published, books.locations " +
      "FROM borrowed_and_lent as bl " +
      "JOIN books ON bl.book_id = books.id " +
      "JOIN users AS borrowers ON bl.borrower = borrowers.id " +
      "JOIN users AS sessionUser ON bl.media_owner = sessionUser.id WHERE sessionUser.id = $1;", [userInfo.id], function(err, result) {
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
