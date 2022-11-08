const express = require('express');
const cors = require('cors');
const passport = require('passport');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
const formidable = require('express-formidable');
app.use(formidable());
const routes = require('./routes');
const {injectModel} = require('./modules/utils');
require('dotenv').config();
const port = process.env.NODE_LOCAL_PORT || 4000;
const connect = require('./config/connect');
const mysqlConnect = require('./config/mysql_connect');
const jwtSecret = require('./config/jwtConfig');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
app.use(express.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 1000000}));
//For BodyParser
// app.use(bodyParser.urlencoded({
//     extended: true
// }));
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
app.use((req, res, next) => {
res.header('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 
  'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
});
  app.use('/api', routes);
COREAPP = {};
//Sync Database

connect().then(() => {
  console.log('MongoDB setup complete!');
});

// mysqlConnect().then(() => {
const models = require("./models");
COREAPP.models = models;
//load passport strategies
require('./config/passport.js')(passport, models.user);
models.sequelize.sync().then(function() {
  console.log('MySQL setup complete!')
}).catch(function(err) {
  console.log(err, "Something went wrong with the MySQL Database Update!")
});
// });

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
        const userObj = {email: user.email, id: user._id, username: user.username};
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