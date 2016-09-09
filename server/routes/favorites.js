//  FAVORITES Router
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
      client.query("SELECT * " +
      "FROM books " +
      "JOIN users_books ON books.id = users_books.book_id " +
      "WHERE users_books.favorites = TRUE AND users_books.user_id = $1;", [userInfo], function(err, results) {
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
}); //  router.get

// router.get("/", function(req, res) {
//   var userInfo = req.user.id;
//
//   pg.connect(connectionString, function(err, client, done) {
//     if (err) {
//       console.log(err);
//       res.status(500).send(err);
//     } else {
//       client.query("SELECT users.id AS user_id, users.email, books.id AS book_id, books.title, " +
//       "books.series, books.author, books.languages, books.published, users_books.locations FROM books " +
//       "JOIN favorites ON books.id = favorites.book_id " +
//       "JOIN users ON favorites.user_id = users.id WHERE users.id = $1;", [userInfo], function(err, results) {
//         if (err) {
//           console.log(err);
//           res.status(500).send(err);
//           process.exit(1);
//         } else {
//           res.send(results.rows);
//           done();
//         }
//       }); //  client.query
//     } //  else
//   }); //  pg.connect
// }); //  router.get


router.put("/:book", function(req, res) {
  var book_id = req.params.book;
  var userInfo = req.user.id;
  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      client.query("UPDATE users_books AS ub " +
      "SET favorites = FALSE " +
      "WHERE ub.book_id = $1 AND ub.user_id = $2", [book_id, userInfo], function(err, results) {
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

// router.delete("/:book", function(req, res) {
//   var book_id = req.params.book;
//   var userInfo = req.user.id;
//   pg.connect(connectionString, function(err, client, done) {
//     if (err) {
//       console.log(err);
//       res.status(500).send(err);
//     } else {
//       client.query("DELETE FROM favorites WHERE book_id = $1 AND user_id = $2", [book_id, userInfo], function(err, results) {
//         if (err) {
//           console.log(err);
//           res.status(500).send(err);
//           process.exit(1);
//         } else {
//           res.send(results.rows);
//           done();
//         }
//       }); //  client.query
//     } //  else
//   }); //  pg.connect
// }); //  router.delete

module.exports = router;
