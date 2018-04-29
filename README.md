# Book Tracker
This application was created as a two week individual project at Prime Digital Academy as part of its curriculum. Book Tracker utilizes the Google Books API to allow the user to search for books in a myriad of languages to add to their own personal library or mark it as a wishlist item. They can view the book's information in a table on their library dashboard where they can star a book as 'favorite'. They can also view their favorite books or wishlist books separately. This app utilizes REST architecture where users can get, add, edit, and delete books.


## Tech Used
* AngularJS
* Express
* Node.js
* PostgreSQL
* Bootstrap
* Passport
* Google Books API

## Getting started

### Prerequisites
* Node.js
* PostgreSQL
* Google Books API account and API key

### Install
1) Clone the repository
2) Download the dependencies with `npm install`
3) Run `book_tracker.sql` in Postico to create the necessary tables for the project and make sure postgreSQL is running.
4) Start application with `npm start`

##  Features
* Users can search the Google Books API and add a book to their own library or mark it as a wish list item
* A list of all added books can be seen in "My Library"
* Users can view all favorite and wishlist books in their own separate pages
* Users can add a book from the wishlist table to their library if they got the book
* Users can star a book as favorite
* Users can delete a book from their library

##  Stretch Goals
* Add location attribute to books
* Set status to a book as 'borrowed' or 'lent'
* Show a table of borrowed and lent books
