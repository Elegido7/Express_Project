const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to check the day and working hours
function workingHours(req, res, next) {
  const currentDate = new Date();
  const day = currentDate.getDay();
  const hour = currentDate.getHours();

  // Check if it's Monday to Friday and between 9 and 17
  if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    next();
  } else {
    res.render('error'); // Render the error page under views
  }
}

// Set Pug as the templating engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Apply working hours middleware to all routes
app.use(workingHours);

// Routes
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/services', (req, res) => {
  res.render('services');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

// Starting the server under port 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
