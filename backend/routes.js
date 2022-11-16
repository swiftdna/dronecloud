const express = require('express');
const passport = require('passport');
const router = express.Router();
const { getUserDetails, updateUserDetails } = require('./modules/UserProfile');
const { handleBookingSchedule } = require('./modules/Scheduler');
const { getDronePaths, registerDrone, deleteDrone, getAllDrones, getDroneLastSeenLocations, getDroneLastSeenLocationsOld } = require('./modules/SimulatorInteraction');
const { getFarms, addFarm, addOwner } = require('./modules/Farms');
const {addDrone,getDrone,getSingleDrone,updateDrone} =require('./modules/DroneCatalog');
const { getDrones, filterDroneDetails, registerUAV, deregisterUAV, getAvailableDrones, FarmUserDroneDetails,PilotAvailability, getFarmLands } = require('./modules/Drones');
const { BookingDroneDetails, getUserBookings } = require('./modules/Booking');
const { addPayment } = require('./modules/Payment');
const { addPilotInfo } = require('./modules/Pilot');
const { updateFarmDetails, getFarmDetails } = require('./modules/Farms');

const pusher = (req, res, next) => {
  let {model, model: {data: response}} = req;
  if (model && response) {
    if (response.data && typeof response.data === 'string') {
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

// Bootstrap Scheduler
handleBookingSchedule();

router.post('/drone/booking', BookingDroneDetails, pusher);
router.post('/farmuser', isLoggedIn, FarmUserDroneDetails, pusher);

router.get('/users/:user_id', isLoggedIn, getUserDetails);
router.put('/users/profile', isLoggedIn, updateUserDetails);

router.post('/farms', isLoggedIn, addFarm, pusher);
router.get('/farms', isLoggedIn, getFarms, pusher);
router.put('/farms/profile', isLoggedIn, updateFarmDetails, pusher);
router.get('/farms/profile', isLoggedIn, getFarmDetails, pusher);
router.post('/farms/owner', isLoggedIn, addOwner, pusher);

// Pilot cert info
router.post('/pilot', isLoggedIn, addPilotInfo, pusher);

router.post('/payment', isLoggedIn, addPayment, pusher);

router.post('/pilotfilter', isLoggedIn, PilotAvailability, pusher);

router.get('/drones', isLoggedIn, getDrones, pusher);
router.post('/drone/filter', isLoggedIn, filterDroneDetails, pusher);
router.post('/drones/:id/register', isLoggedIn, registerUAV, pusher);
router.post('/drones/:id/deregister', isLoggedIn, deregisterUAV, pusher);
router.get('/drones/availability', isLoggedIn, getAvailableDrones, pusher);
router.post('/userbookings', isLoggedIn,getUserBookings, pusher);
router.post('/farmlands', isLoggedIn,getFarmLands, pusher);


router.get('/tracking/drones/:id', isLoggedIn, getDronePaths, pusher);
router.get('/tracking/drones', isLoggedIn, getDrones, getDroneLastSeenLocations, pusher);

router.get('/ext/drones', isLoggedIn, getAllDrones, getDroneLastSeenLocationsOld, pusher);
router.post('/ext/drone', isLoggedIn, registerDrone, pusher);
router.delete('/ext/drone/:id', isLoggedIn, deleteDrone, pusher);

router.post('/droneCatalog/add',addDrone);
router.get('/droneCatalog/getDrones',getDrone);

router.get('/droneCatalog/getDrone/:id',getSingleDrone);
router.post('/droneCatalog/updateDrone/:id',updateDrone);

router.get('/session', isLoggedIn, async (req, res, next) => {
  if (req.user) {
    const {user} = req;
    res.json({ success: true, isAuthenticated: true, user: {email: user.email, id: user.id, username: user.username, role: user.role, status: user.status} });
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