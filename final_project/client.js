const axios = require('axios');
const BASE_URL = 'https://saadmhmoood-5000.theianext-1-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai';

// Task 10 (Async/Await) – List all books
async function task10_getAllBooks() {
  try {
    const response = await axios.get(`${BASE_URL}/`);
    console.log('Task 10 - All books:', response.data);
  } catch (err) {
    console.error('Task 10 error:', err.message);
  }
}

// Task 11 (Promises) – Get book by ISBN
function task11_getBookByISBN(isbn) {
  axios.get(`${BASE_URL}/isbn/${isbn}`)
    .then(res => console.log(`Task 11 - Book ${isbn}:`, res.data))
    .catch(err => console.error('Task 11 error:', err.message));
}

// Task 12 (Async/Await) – Get books by author
async function task12_getBooksByAuthor(author) {
  try {
    const res = await axios.get(`${BASE_URL}/author/${encodeURIComponent(author)}`);
    console.log(`Task 12 - Books by ${author}:`, res.data);
  } catch (err) {
    console.error('Task 12 error:', err.message);
  }
}

// Task 13 (Promises) – Get books by title
function task13_getBooksByTitle(title) {
  axios.get(`${BASE_URL}/title/${encodeURIComponent(title)}`)
    .then(res => console.log(`Task 13 - Books titled ${title}:`, res.data))
    .catch(err => console.error('Task 13 error:', err.message));
}

// Execute the tasks in sequence
(async () => {
  await task10_getAllBooks();
  task11_getBookByISBN(1);
  await task12_getBooksByAuthor('Jane Austen');
  task13_getBooksByTitle('Pride and Prejudice');
})();