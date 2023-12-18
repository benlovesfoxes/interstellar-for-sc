const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Enable sessions
app.use(session({
  secret: '72309',
  resave: false,
  saveUninitialized: true
}));

// Map codes to links
const codeLinks = {
  // Replace 'CODE1' with your desired code and 'LINK1' with the corresponding link
  'CODE1': 'https://www.algebraxyz.info/',
  // Add more codes and links as needed
  'CODE2': 'https://www.algebraxyz.com/',
  'CODE3': 'https://wisdom.educational.sciencevictory.org/',
  'CODE4': 'https://www.algebraxyz.online/',
  'CODE5': 'https://www.math-solver.info/',
  // ...
};

// Middleware to check if the user is authenticated
function requireAuth(req, res, next) {
  if (req.session.isAuthenticated) {
    next();
  } else {
    res.redirect('/login');
  }
}

// Serve the login page
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

// Handle login form submission
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'benlovesfoxes' && password === 'parkeR0420$') {
    req.session.isAuthenticated = true;
    res.redirect('/');
  } else {
    res.redirect('/login');
  }
});

// Serve the main site
app.get('/', requireAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'main.html'));
});

// Serve the dynamically generated pages
app.get('/:code', requireAuth, (req, res) => {
  const { code } = req.params;
  const link = codeLinks[code];
  if (link) {
    res.redirect(link);
  } else {
    res.sendStatus(404);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
