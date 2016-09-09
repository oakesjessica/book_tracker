var pg = require('pg');

var connectionString;

if (process.env.DATABASE_URL){
  pg.defaults.ssl = true;
  connectionString = process.env.DATABASE_URL;
} else {
  connectionString = 'postgres://localhost:5432/book_tracker';
}

function initializeDB(){
  return new Promise(function(resolve, reject) {
    pg.connect(connectionString, function(err, client, done){
      if(err){
        console.log('Error connecting to DB!', err);
        reject(Error(err));
        process.exit(1);

      } else {

        var books, users, users_books, borrowed_and_lent, wishlist, favorites, shelves, book_shelves;

        books = 'CREATE TABLE books IF NOT EXISTS ( ' +
          'id serial PRIMARY KEY, ' +
          'title varchar(80), ' +
          'author varchar(80), ' +
          'series varchar(80), ' +
          'language varchar(20), ' +
          'published DATE, ' +
          'location varchar(80));';

        users = 'CREATE TABLE users IF NOT EXISTS ( ' +
          'id serial PRIMARY KEY, ' +
          'first_name varchar(80) NOT NULL, ' +
          'last_name varchar(80) NOT NULL, ' +
          'email varchar(100) NOT NULL UNIQUE, ' +
          'username varchar(20) NOT NULL UNIQUE, ' +
          'password varchar(80) NOT NULL);';

        users_books = 'CREATE TABLE users_books IF NOT EXISTS ( ' +
          'id serial PRIMARY KEY, ' +
          'wishlist BOOLEAN ' +
          'book_id INT REFERENCES books(id), ' +
          'user_id INT REFERENCES users(id));';

        borrowed_and_lent = 'CREATE TABLE borrowed_and_lent IF NOT EXISTS ( ' +
          'id serial PRIMARY KEY, ' +
          'date_initial date, ' +
          'date_returned date, ' +
          'status boolean, ' +
          'lent_to INT REFERENCES users(id), ' +
          'borrowed_from INT REFERENCES users(id), ' +
          'book_id INT REFERENCES books(id));';

        wishlist = 'CREATE TABLE wishlist IF NOT EXISTS ( ' +
          'id serial PRIMARY KEY, ' +
          'book_id INT REFERENCES books(id), ' +
          'user_id INT REFERENCES users(id));';

        favorites = 'CREATE TABLE favorites IF NOT EXISTS ( ' +
          'id serial PRIMARY KEY, ' +
          'book_id INT REFERENCES books(id), ' +
          'user_id INT REFERENCES users(id));';

        shelves = 'CREATE TABLE shelves IF NOT EXISTS ( ' +
          'id serial PRIMARY KEY, ' +
          'shelf_name varchar(100), ' +
          'user_id INT REFERENCES users(id));';

        book_shelves = 'CREATE TABLE book_shelves IF NOT EXISTS ( ' +
          'id serial PRIMARY KEY, ' +
          'user_id INT REFERENCES users(id), ' +
          'book_id INT REFERENCES books(id), ' +
          'shelf_id INT REFERENCES shelves(id));';

        var query = client.query(books + users + users_books + borrowed_and_lent + wishlist + favorites + shelves + book_shelves);

        query.on('end', function(){
          console.log('Schema creation successful');
          resolve();
          done();
        });

        query.on('error', function(err) {
          console.log('Schema creation unsuccessful', err);
          reject(Error(err));
        });
      }

    });
  });
}

module.exports.connectionString = connectionString;
module.exports.initializeDB = initializeDB;
