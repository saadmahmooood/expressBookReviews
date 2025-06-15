const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();
app.use(express.json());

// Initialize session for protected routes
app.use('/customer', session({ secret: 'fingerprint_customer', resave: true, saveUninitialized: true }));

// Authentication middleware for routes under /customer/auth
app.use('/customer/auth/*', (req, res, next) => {
  const auth = req.session.authorization;
  if (!auth) {
    return res.status(403).json({ message: 'User not logged in' });
  }
  const token = auth.accessToken;
  jwt.verify(token, 'access', (err, user) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.user = user.username;
    next();
  });
});

// Route mounting
app.use('/customer', customer_routes);
app.use('/', genl_routes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));