--  SQL CREATION
-- DATABASE : book_tracker
-- Copy/paste queries
-- Press CMD-OPT-RTRN to run

--
--	TABLE: book information (title, author, author, language, published date, location)
--
CREATE TABLE books (
  id serial PRIMARY KEY,
  title varchar(80),
  author varchar(80),
  series varchar(80),
  language varchar(20),
  published DATE,
  location varchar(80));

--
--	TABLE: user's information
--	First/Last Name
--	Email Address (track users by unique email addresses)
--	Password (password encrypted by bcrypt)
--	Username (option to pick a different username after registration in their profile settings, otherwise default to email address)
--
CREATE TABLE users (
id serial PRIMARY KEY,
first_name varchar(80) NOT NULL,
last_name varchar(80) NOT NULL,
email varchar(100) NOT NULL UNIQUE,
username varchar(20) NOT NULL UNIQUE,
password varchar(80) NOT NULL);

--
--	TABLE: relational table between book id's and user id's
--
CREATE TABLE users_books (
id serial PRIMARY KEY,
wishlist BOOLEANm
book_id INT REFERENCES books(id),
user_id INT REFERENCES users(id));

--
--	TABLE: books borrowed and lent
--	date_initial, date_returned: Track date initially lent/borrowed and dates returned
--	status: TRUE if book is currently lent/borrowed, FALSE if book has been lent/borrowed and has been returned
--
--
CREATE TABLE borrowed_and_lent (
  id serial PRIMARY KEY,
  date_initial date,
  date_returned date,
  status boolean,
  lent_to INT REFERENCES users(id),
  borrowed_from INT REFERENCES users(id),
  book_id INT REFERENCES books(id));

--
--	TABLE: wishlist
--	link user id to book id if particular book is on their wishlist
--
CREATE TABLE wishlist (
id serial PRIMARY KEY,
book_id INT REFERENCES books(id),
user_id INT REFERENCES users(id));

--
--	TABLE: favorites
--	link user id to book id if particular book is favorite
--
CREATE TABLE favorites (
id serial PRIMARY KEY,
book_id INT REFERENCES books(id),
user_id INT REFERENCES users(id));

--
--	TABLE: shelves
--	User can create "shelves" (tags) to categorize their books
--	Book can be categorized on many shelves
--	Shelf can have many books
--
CREATE TABLE shelves (
id serial PRIMARY KEY,
shelf_name varchar(100),
user_id INT REFERENCES users(id));

--
--	TABLE: book shelves
--	Link user's created shelf categories to the specified books
--
CREATE TABLE book_shelves (
id serial PRIMARY KEY,
user_id INT REFERENCES users(id),
book_id INT REFERENCES books(id),
shelf_id INT REFERENCES shelves(id));
