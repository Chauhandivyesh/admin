const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const app = express();
const bodyParser = require("body-parser");
const hbs = require('hbs')
const connectDB = require("./database/db");
require('dotenv').config();
connectDB();

app.use(session({
  secret: process.env.SESSIONKEY,
  resave: false,
  saveUninitialized: true
}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload());
app.set('view engine', 'hbs')
app.use(express.static('public'))


// Middleware
app.use(express.json());
hbs.registerPartials(__dirname + "/../views/partials")

hbs.registerHelper('ifeq', function (a, b, options) {
    if (a == b) { return options.fn(this); }
    return options.inverse(this);
});

hbs.registerHelper('json', function(context) {
    return JSON.stringify(context);
});



// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
