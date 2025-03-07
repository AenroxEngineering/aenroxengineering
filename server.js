const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Home route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Services route
app.get('/services', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/services.html'));
});

// Team route
app.get('/team', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/team.html'));
});

// Contact route
app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/contact.html'));
});

// Handle contact form submission
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;

  // Configure Nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-email-password'
    }
  });

  const mailOptions = {
    from: email,
    to: 'info@aenroxengineering.com',
    subject: `Contact Form Submission from ${name}`,
    text: message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    res.send('Message sent: ' + info.response);
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
