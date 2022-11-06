const express = require('express');
const passport = require('passport');
const router = express.Router();
const { getUserDetails, updateUserDetails} = require('./modules/UserProfile');
const { getDronePaths, registerDrone, deleteDrone, getDrones,getDroneLastSeenLocations } = require('./modules/SimulatorInteraction');
const { getDroneDetails,filterDroneDetails } = require('./modules/Drones');
const pusher = (req, res, next) => {
  let {model, model: {data: response}} = req;
  if (model && response) {
    if (response.data && typeof response.data === 'string') {
      console.log(response.data);
      response.data = JSON.parse(response.data);
    }
    res.json(response);
    return;
  }
  return next();
};

router.get('/', isLoggedIn, (req, res) => {
	res.json({success: true, message: 'Welcome to API page!'});
});

router.get('/drone', isLoggedIn, getDroneDetails, pusher);
router.post('/drone/filter', isLoggedIn, filterDroneDetails, pusher);
router.get('/users/:user_id', isLoggedIn, getUserDetails);
router.put('/users/profile', isLoggedIn, updateUserDetails);

router.get('/tracking/drones/:id', isLoggedIn, getDronePaths, pusher);

router.get('/ext/drones', isLoggedIn, getDrones, getDroneLastSeenLocations, pusher);
router.post('/ext/drone', isLoggedIn, registerDrone, pusher);
router.delete('/ext/drone/:id', isLoggedIn, deleteDrone, pusher);

router.get('/session', isLoggedIn, async (req, res, next) => {
  if (req.user) {
    const {user} = req;
    res.json({ success: true, isAuthenticated: true, user: {email: user.email, id: user.id, username: user.username} });
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