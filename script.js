require("dotenv").config(); // Load .env
const express = require('express');
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const path = require('path');
const bcrypt = require('bcryptjs');
const Message = require("./models/contact");

const User = require('./models/database'); // Import your user schema

const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));  // req.body CAN ACCESS THE FORM DETAILS ONLY IF THIS IS USED
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { // process.env.xyz  it means you are using your secret information from env not directly putting here
  tls: true, // Enforce TLS
}) 
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Setup session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
}));
 
// Make session user available in all views
app.use((req, res, next) => {
  res.locals.currentUser = req.session.user;
  next();
});



// Home
app.get('/', (req, res) => {
  res.render('homepage', {req});
});

// Subject Pages (we’ll protect them later)
app.get('/computerscience', requireLogin, (req, res) => {
  res.render('cn', { body: "jai" });
});

app.get('/dsa', requireLogin, (req, res) => {
  res.render('dsa', { body: "jai" });
});

app.get('/fullstack', requireLogin, (req, res) => {
  res.render('fullstack', { body: "jai" });
});

// Signup Page
app.get('/signup', (req, res) => {
  res.render('signup');
});

function requireLogin(req, res, next) {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  next();
}

// app.get('/fullstack', (req, res) => {  this is also a way to include  if statement 
//   if(!req.session.user){
//     res.redirect('/login')
//   }
//   res.render('fullstack', { body: "jai" });
// });


// Signup POST Handler
app.post('/signup', async (req, res) => {
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{7,}$/;
  const { username, email, password } = req.body;
  if (!passwordRegex.test(password)) {
    return res.send("Password must be at least 7 characters long and contain at least one letter, one number, and one special character.");
  } 
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, email, password: hashedPassword });
    res.redirect('/login');
  } catch (err) {
    res.send('Error at backend: ' + err.message);
  }
});

// Login Page
app.get('/login', (req, res) => {
  res.render('login');
});

// Login POST Handler
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.send('User not found');

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.send('Incorrect password');
 
    req.session.user = user;
    res.redirect('/');
  } catch (err) {
    res.send('Error: ' + err.message);
  }
});

// Logout
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});


app.post('/contact',async (req,res)=>{
  const{name,email,subject,message}=req.body;
try{
  await Message.create({name,email,subject,message});
  res.redirect('/?message=sent');
  // alert("Your message has been received. Thank you!") 
}
catch(err){
  console.log(err);
    res.status(500).send("Something went wrong. Please try again later.");
}
});

// Run Server
app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
