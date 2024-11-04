const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to check working hours
function workingHours(req, res, next) {
  const currentDate = new Date();
  const day = currentDate.getDay(); // 0 (Sun) to 6 (Sat)
  const hour = currentDate.getHours();

  // Check if it's Monday to Friday and between 9 and 17
  if (day >= 1 && day <= 5 && hour >= 0 && hour < 17) {
    next();
  } else {
    res.render('error'); // Render the error page
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

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
