const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  const books = require('./booksdb.js');
  return res.json(books);
});

// Task 2: Get book by ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  const book = books[isbn];
  if (book) {
    return res.json(book);
  } else {
    return res.status(404).json({ message: "Book not found" });
  }
});
  
// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;
  const filtered = Object.values(books).filter(b => b.author.toLowerCase() === author.toLowerCase());
  if (filtered.length) {
    return res.json(filtered);
  } else {
    return res.status(404).json({ message: "No books by that author" });
  }
});

// Task 4: Get books by title
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title;
  const filtered = Object.values(books).filter(b => b.title.toLowerCase() === title.toLowerCase());
  if (filtered.length) {
    return res.json(filtered);
  } else {
    return res.status(404).json({ message: "No books with that title" });
  }
});

// Task 5: Get book reviews by ISBN
public_users.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    const book = books[isbn];
    if (book) {
      return res.json(book.reviews);
    } else {
      return res.status(404).json({ message: "Book not found" });
    }
  });

module.exports.general = public_users;
