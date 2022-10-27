const express = require('express');
const passport = require('passport');
const router = express.Router();
const { getUserDetails, updateUserDetails} = require('./modules/UserProfile');

router.get('/', isLoggedIn, (req, res) => {
	res.json({success: true, message: 'Welcome to API page!'});
});

router.get('/session', isLoggedIn, async (req, res, next) => {
  if (req.user) {
    const {user} = req;
    res.json({ success: true, isAuthenticated: true, user: {email: user.email, id: user._id, username: user.username} });
  } else {
    res.status(401).json({message: "Not authorized", success: false});
  }
});

async function isLoggedIn(req, res, next) {
  const {dc_token} = req.cookies;
  req.headers.authorization = `Bearer ${dc_token}`;
  return passport.authenticate('jwt', {session: false}, async (err, user) => {
    if (process.env.NODE_ENV === 'test') {
      // for testing only
      return next();
    }
    if (user && user.id) {
      req.user = user;
      return next();
    }
    res.status(401).json({message: "Not authorized to see this page. Please login!", status: 401});
  })(req, res, next);
}

module.exports = router;