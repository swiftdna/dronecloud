import "../CSS/landing.css"
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { pluck } from 'underscore';
import { selectIsLoggedIn, selectUser, selectCurrency, selectRedirectionPath } from '../selectors/appSelector';
import {   Routes, Route, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearRedirectionPath } from '../actions/app-actions'
import { RiSettingsLine, RiListUnordered } from 'react-icons/ri';
import { TbReportAnalytics } from 'react-icons/tb';
import { FaUser } from 'react-icons/fa';
import {BiUserCircle} from 'react-icons/bi';
import { GrContact } from 'react-icons/gr';
import { GiDeliveryDrone } from 'react-icons/gi';
import MyBookings from './MyBookings';
import PilotTrips from './PilotTrips';
import BookDrone from './BookDrone';
import Profile from './Profile';
import ServiceReports from './ServiceReports';
import ServiceReportDetails from './ServiceReportDetails';
import { Row, Col, Form } from 'react-bootstrap';
import DroneBookingCatalog from './DroneBookingCatalog';
import DroneBookingSelected from './DroneBookingSelected';
import DroneBookingSelectedSurveillance from './DroneBookingSelectedSurveillance';

import DroneBookingReview from './DroneBookingReview';
import DroneBooking from './DroneBooking';
import DroneBookingConfirmation from './DroneBookingConfirmation';
import Wrapper from './wrappers/LandingPageWrapper';
import { TbDrone } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import main from './wrappers/drone1.svg';
import FarmLand from "./FarmLand";
import Contact from "./Contact";

//create the Navbar Component
function LandingPage() {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const userObj = useSelector(selectUser);
    const redirectionURL = useSelector(selectRedirectionPath);
    const navigate = useNavigate();
    const userLandedPage = useLocation();
 
    useEffect(() => {
        // fetchProducts(dispatch);
        if (isLoggedIn) {
            console.log('user logged in!');
            // console.log(userLandedPage.pathname);
            // console.log(userObj.status);
            // console.log(userObj.role);
            if (userObj.role === 'admin') {
                navigate('/admin')
            } else {
                if (userObj.status === null && userObj.role === null) {
                  // console.log(userObj.status);
                  // console.log(userObj.role);
                  // console.log(userObj.name);
                  navigate('/SelectRole')
                } else if (userObj.status != 'complete' && userObj.role === "farmer") {
                  navigate('/FarmerParent')
                } else if (userObj.status != 'complete' && userObj.role === "pilot") {
                  navigate('/PilotParent')
                } else {
                  home();
                }
            }
            if (redirectionURL) {
                navigate(`${redirectionURL}`);
                dispatch(clearRedirectionPath());
            }
        }
    }, [isLoggedIn]);

    const isUserPilot = () => {
        return userObj.role === 'pilot';
    }

    const isUserFarmer = () => {
        return userObj.role === 'farmer';
    }

    const home = () => {
        if (isUserPilot()) {
            navigate('/pilot-trips');
            return;
        }
        navigate('/');
    }

    const login = () => {
      navigate('/login');
    }
    
    return(
        <div className="container main-frame fill-page">
            {isLoggedIn ? 
                <Row className="fill-page" style={{width: '100%'}}>
                    <Col xs={3} className="text-center py-3 dc-default dc-leftpane">
                        <h3 className="title"><RiSettingsLine size={40} style={{marginTop: '-5px'}} /> Dashboard { isUserPilot() ? <span style={{fontSize: '14px', color: '#808080'}}>Pilot</span> : ''}</h3>
                        {
                            isUserFarmer() ? <ul className="nav flex-column dc-default dc-admin-nav">
                              <li className="nav-item">
                                <NavLink className="nav-link" activeClassName="active" to="/"><RiListUnordered style={{marginTop: '-2px'}} /> My Bookings</NavLink>
                              </li>
                              <li className="nav-item">
                                <NavLink className="nav-link" activeClassName="active" to="/book-drone"><GiDeliveryDrone size={20} style={{marginTop: '-2px'}} /> Book Drone</NavLink>
                              </li>
                              <li className="nav-item">
                                <NavLink className="nav-link" activeClassName="active" to="/service-reports"><TbReportAnalytics size={20} style={{marginTop: '-5px'}} /> Service Reports</NavLink>
                              </li>
                              <li className="nav-item">
                                <NavLink className="nav-link" activeClassName="active" to="/profile"><BiUserCircle style={{marginTop: '-3px'}}  /> Profile</NavLink>
                              </li>
                              <li className="nav-item">
                                <NavLink className="nav-link" activeClassName="active" to="/contact"><GrContact size={18} style={{marginTop: '-3px'}}  /> Contact</NavLink>
                              </li>
                            </ul> : ''
                        }
                        { isUserPilot() ? <ul className="nav flex-column dc-default dc-admin-nav">
                          <li className="nav-item">
                            <NavLink className="nav-link" activeClassName="active" to="/pilot-trips"><RiListUnordered style={{marginTop: '-2px'}} /> My Trips</NavLink>
                          </li>
                          <li className="nav-item">
                            <NavLink className="nav-link" activeClassName="active" to="/profile"><BiUserCircle style={{marginTop: '-3px'}}  /> Profile</NavLink>
                          </li>
                        </ul> : ''}
                    </Col>
                    <Col xs={9} className="text-center py-3 dc-default content_panel">
                        <Routes>
                            <Route path="/book-drone" element={<BookDrone />} />
                            <Route path="/service-reports" element={<ServiceReports />} />
                            <Route path="/service-reports/:id" element={<ServiceReportDetails />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/farmland" element={<FarmLand />} />
                            <Route path="/drone-booking-catalog" element={<DroneBookingCatalog />} />
                            <Route path="/drone-booking-selected" element={<DroneBookingSelected />} />
                            <Route path="/drone-booking-review" element={<DroneBookingReview />} />
                            <Route path="/drone-booking-confirmation" element={<DroneBookingConfirmation />} />
                            <Route path="/drone-booking-selected-surveillance" element={<DroneBookingSelectedSurveillance />} />
                            <Route path="/pilot-trips" element={<PilotTrips />} />
                            <Route path="/" element={<MyBookings />} />
                        </Routes>
                    </Col>
                </Row> : <h4>Welcome to DroneCloud. Login to see the dashboard!</h4> }
        </div>
    )
}

export default LandingPage;