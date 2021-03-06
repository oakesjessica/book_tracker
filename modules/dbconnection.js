var pg = require('pg');

var connectionString;

if (process.env.DATABASE_URL){
  pg.defaults.ssl = true;
  connectionString = process.env.DATABASE_URL;
} else {
  connectionString = 'postgres://localhost:5432/minilibrary';
}

function initializeDB(){
  return new Promise(function(resolve, reject) {
    pg.connect(connectionString, function(err, client, done){
      if(err){
        console.log('Error connecting to DB', err);
        reject(Error(err));
        process.exit(1);
      } else {

        var books, users, users_books, borrowed_and_lent, wishlist, favorites, shelves, book_shelves, session;

        books = 'CREATE TABLE IF NOT EXISTS books ( ' +
          'id serial PRIMARY KEY, ' +
          'title varchar(80), ' +
          'author varchar(80), ' +
          'series varchar(80), ' +
          'languages varchar(20), ' +
          'published varchar(20), ' +
          'publisher varchar(60), ' +
          'plot varchar(900), ' +
          'isbn13 varchar(14), ' +
          'isbn10 varchar(11), ' +
          'page_count integer, ' +
          'img_src varchar(200), ' +
          'locations varchar(80));';

        users = 'CREATE TABLE IF NOT EXISTS users ( ' +
          'id serial PRIMARY KEY, ' +
          'first_name varchar(80) NOT NULL, ' +
          'last_name varchar(80) NOT NULL, ' +
          'email varchar(100) NOT NULL UNIQUE, ' +
          'password varchar(80) NOT NULL);';

        users_books = 'CREATE TABLE IF NOT EXISTS users_books ( ' +
          'id serial PRIMARY KEY, ' +
          'wishlist BOOLEAN default FALSE, ' +
          'locations varchar(100), ' +
          'favorites BOOLEAN default FALSE, ' +
          'book_id INT REFERENCES books(id), ' +
          'user_id INT REFERENCES users(id));';

        borrowed_and_lent = 'CREATE TABLE IF NOT EXISTS borrowed_and_lent ( ' +
          'id serial PRIMARY KEY, ' +
          'date_initial date, ' +
          'date_returned date, ' +
          'status boolean, ' +
          'media_owner INT REFERENCES users(id), ' +
          'borrower INT REFERENCES users(id), ' +
          'due_date date, ' +
          'book_id INT REFERENCES books(id));';

        wishlist = 'CREATE TABLE IF NOT EXISTS wishlist ( ' +
          'id serial PRIMARY KEY, ' +
          'book_id INT REFERENCES books(id), ' +
          'user_id INT REFERENCES users(id));';

        favorites = 'CREATE TABLE IF NOT EXISTS favorites ( ' +
          'id serial PRIMARY KEY, ' +
          'book_id INT REFERENCES books(id), ' +
          'user_id INT REFERENCES users(id));';

        shelves = 'CREATE TABLE IF NOT EXISTS shelves ( ' +
          'id serial PRIMARY KEY, ' +
          'shelf_name varchar(100), ' +
          'user_id INT REFERENCES users(id));';

        book_shelves = 'CREATE TABLE IF NOT EXISTS book_shelves ( ' +
          'id serial PRIMARY KEY, ' +
          'user_id INT REFERENCES users(id), ' +
          'book_id INT REFERENCES books(id), ' +
          'shelf_id INT REFERENCES shelves(id));';

        session = 'CREATE TABLE IF NOT EXISTS session ( ' +
        'sid VARCHAR NOT NULL PRIMARY KEY, ' +
        'sess JSON NOT NULL, ' +
        'expire TIMESTAMP(6) NOT NULL) WITH (OIDS=FALSE);';

        var query = client.query(books + users + users_books + borrowed_and_lent + wishlist + favorites + shelves + book_shelves + session);

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
