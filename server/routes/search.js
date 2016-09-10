// server/routes/search.js
var router = require("express").Router();
var pg = require("pg");
var Client = require("pg").Client;

var connectionString = require('../../modules/dbconnection').connectionString;

router.post("/", function(req, res) {
  var userInfo = req.user;
  var newItem = {
    title: req.body.title,
    author: req.body.authors,
    published: req.body.published_date,
    publisher: req.body.publisher,
    page_count: req.body.page_count,
    languages: req.body.languages,
    plot: req.body.plot,
    isbn13: req.body.isbn13,
    isbn10: req.body.isbn10,
    img_src: req.body.img_src
  };
  console.log(newItem);

  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      client.query("INSERT INTO books (title, author, published, publisher, languages, plot, page_count, img_src, isbn13, isbn10) " +
      "VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) " +
      "ON CONFLICT DO NOTHING " +
      "RETURNING id;", [newItem.title, newItem.author, newItem.published, newItem.publisher, newItem.languages, newItem.plot, newItem.page_count, newItem.img_src, newItem.isbn13, newItem.isbn10], function(err, result) {
        if (err) {
          console.log("Inserting into books error", err);
          res.status(500).send(err);
          process.exit(1);
        } else {
          if (result.rows.length === 0) {
            client.query("SELECT id FROM books WHERE books.title = $1 AND books.isbn13 = $2 AND isbn10 = $3;", [newItem.title, newItem.isbn13, newItem.isbn10], function(err, result) {
              if (err) {
                console.log("Returning Error", err);
                res.status(500).send(err);
                process.exit(1);
              } else {
                client.query("INSERT INTO " + req.body.table + " (user_id, book_id) " +
                "VALUES ($1, $2);", [userInfo.id, result.rows[0].id], function(err) {
                  if (err) {
                    console.log("Inserting into users_books error", err);
                    res.status(500).send(err);
                    process.exit(1);
                  } else {
                    done();
                  }
                });
              }
            });
          } else {
            client.query("INSERT INTO " + req.body.table + " (user_id, book_id) " +
            "VALUES ($1, $2);", [userInfo.id, result.rows[0].id], function(err) {
              if (err) {
                console.log(err);
                res.status(500).send(err);
                process.exit(1);
              } else {
                res.sendStatus(200);
                done();
              }
            });
          } //  else
        } //  else
      });
    } //  else if no pg.connect err
  }); //  pg.connect
}); //  router.post


module.exports = router;
