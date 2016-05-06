var router = require("express").Router();
var pg = require("pg");

var connectionString = "postgres://localhost:5432/book_tracker";

router.get("/", function(req, res) {
  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      var results = [];
      var query = client.query("SELECT * FROM users " +
      "JOIN wishlist on users.id = wishlist.user_id " +
      "JOIN books ON wishlist.book_id = books.id;");

      query.on("error", function(err) {
        console.log("Error retrieving wishlist", err);
        res.status(500).send(err);
        process.exit(1);
      }); //  query on error

      query.on("row", function(row) {
        results.push(row);
      }); //  query on row

      query.on("end", function() {
        console.log("Successfully retrieved wishlist");
        res.send(results);
        done();
      }); //  query on end
    } //  else
  }); //  pg.connect
}); //  router.get

module.exports = router;
