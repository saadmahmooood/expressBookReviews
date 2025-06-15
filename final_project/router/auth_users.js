const express = require('express');
const jwt = require('jsonwebtoken');
let books = require('./booksdb.js');
const regd_users = express.Router();

let users = [];

// Check if a username is valid (not already registered)
const isValid = (username) => {
  return !users.some(user => user.username === username);
};

// Check if provided credentials match a registered user
const authenticatedUser = (username, password) => {
  return users.some(user => user.username === username && user.password === password);
};

// Task 6: Register a new user
regd_users.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }
  if (!isValid(username)) {
    return res.status(409).json({ message: "Username already exists" });
  }
  users.push({ username, password });
  return res.status(201).json({ message: "User registered successfully" });
});

// Task 7: Login a registered user
regd_users.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }
  if (!authenticatedUser(username, password)) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const accessToken = jwt.sign({ username }, 'access', { expiresIn: 60 * 60 });
  req.session.authorization = { username, accessToken };
  return res.json({ message: "User successfully logged in", accessToken });
});

// Task 8: Add or modify a book review
regd_users.put('/auth/review/:isbn', (req, res) => {
  const isbn = req.params.isbn;
  const review = req.query.review;
  const username = req.session.authorization.username;
  const book = books[isbn];
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }
  if (!review) {
    return res.status(400).json({ message: "Review text is required" });
  }
  // Add or update review for this user
  book.reviews[username] = review;
  return res.json({ message: "Review added/updated", reviews: book.reviews });
});

// Task 9: Delete a book review
regd_users.delete('/auth/review/:isbn', (req, res) => {
  const isbn = req.params.isbn;
  const username = req.session.authorization.username;
  const book = books[isbn];
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }
  if (book.reviews[username]) {
    delete book.reviews[username];
    return res.json({ message: "Review deleted", reviews: book.reviews });
  } else {
    return res.status(404).json({ message: "Review by user not found" });
  }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;