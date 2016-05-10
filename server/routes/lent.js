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
      "bl.date_initial, bl.date_returned, bl.due_date, " +
      "borrowers.id AS borrower_id, borrowers.first_name AS first_name, borrowers.last_name AS last_name, " +
      "borrowers.email, borrowers.username, " +
      "books.id AS book_id, books.title, books.series, books.author, books.languages, " +
      "books.published, books.locations " +
      "FROM borrowed_and_lent as bl " +
      "JOIN books ON bl.book_id = books.id " +
      "JOIN users AS borrowers ON bl.borrower = borrowers.id " +
      "JOIN users AS sessionUser ON bl.media_owner = sessionUser.id WHERE sessionUser.id = $1 " +
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
