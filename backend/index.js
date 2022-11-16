const express = require('express');
const cors = require('cors');
const passport = require('passport');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
const routes = require('./routes');
const {injectModel} = require('./modules/utils');
require('dotenv').config();
const port = process.env.NODE_LOCAL_PORT || 4000;
const connect = require('./config/connect');
const mysqlConnect = require('./config/mysql_connect');
const jwtSecret = require('./config/jwtConfig');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

//For BodyParser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));
app.use(morgan('combined'));
app.use(injectModel);
app.use(cors());
// For Passport
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use('/api', routes);
COREAPP = {};
//Sync Database

// connect().then(() => {
//   console.log('MongoDB setup complete!');
// });

// mysqlConnect().then(() => {
const models = require("./models");
COREAPP.models = models;
//load passport strategies
require('./config/passport.js')(passport, models.user);
models.sequelize.sync().then(function() {
  console.log('MySQL setup complete!');
}).catch(function(err) {
  console.log(err, "Something went wrong with the MySQL Database Update!")
});

app.post('/signin', (req, res, next) => {
  passport.authenticate('local-signin', {session: false}, (err, user, info) => {
    if (err) {
      console.log('err -> ', err);
      res.json({success: false, message: err});
      next();
      return;
    }
    if (!user) {
      res.json({ success: false, isAuthenticated: false, ...info });
    } else {
      req.login(user, error => {
        if (error) return next(error);
        const userObj = {email: user.email, id: user.id, username: user.username, role: user.role, status: user.status};
        const token = jwt.sign(userObj, jwtSecret.secret);
        res.cookie('dc_token', token, { httpOnly: true });
        res.json({ info, success: true, isAuthenticated: true, user: userObj, token });
        return;
      });
    }
    next();
  })(req, res, next);
});

app.post('/signup', (req, res, next) => {
  passport.authenticate('local-signup', (err, user, info) => {
    if (err) {
      console.log('err -> ', err);
      res.json({success: false, message: err});
      next();
      return;
    }
    if (!user) {
      res.json({ success: false, isAuthenticated: false, data: info });
      return next();
    }
    res.json({ success: true, isAuthenticated: true, user: {email: user.email, id: user._id, username: user.username} });
    next();
  })(req, res, next);
});

app.post('/logout', (req, res) => {
  // req.logOut();
  req.session.destroy(()=>{
    // destroy session data
    req.session = null;
    res.clearCookie("dc_token");
    res.json({success: true});
  });
});

app.get('*', function (req, res) {
  res.sendFile(`${__dirname}/public/index.html`, (err) => {
    if (err) {
      console.log(err);
      res.end(err.message);
    }
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});

module.exports = app;