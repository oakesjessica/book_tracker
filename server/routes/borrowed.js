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
      "bl.date_initial, to_char(bl.date_initial, 'DD Mon YYYY') AS date_initial_string, " +
      "bl.date_returned, to_char(bl.date_returned, 'DD Mon YYYY') AS date_returned_string, " +
      "bl.due_date, to_char(bl.due_date, 'DD Mon YYYY') AS due_date_string, " +
      "owners.id AS owner_id, owners.first_name AS first_name, owners.last_name AS last_name, " +
      "owners.email, owners.username, " +
      "books.id AS book_id, books.title, books.series, books.author, books.languages, " +
      "to_char(books.published, 'DD Mon YYYY') AS published, books.locations " +
      "FROM borrowed_and_lent as bl " +
      "JOIN books ON bl.book_id = books.id " +
      "JOIN users AS owners ON bl.media_owner = owners.id " +
      "JOIN users AS sessionUser ON bl.borrower = sessionUser.id WHERE sessionUser.id = $1;", [userInfo.id], function(err, result) {
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
