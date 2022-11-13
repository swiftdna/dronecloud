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
import { GiDeliveryDrone } from 'react-icons/gi';
import MyBookings from './MyBookings';
import BookDrone from './BookDrone';
import Profile from './Profile';
import FarmLand from './FarmLand';
import ServiceReports from './ServiceReports';
import { Row, Col, Form } from 'react-bootstrap';
import DroneBookingCatalog from './DroneBookingCatalog';
import DroneBookingSelected from './DroneBookingSelected';
import DroneBookingReview from './DroneBookingReview';
import DroneBooking from './DroneBooking';
import DroneBookingConfirmation from './DroneBookingConfirmation';
//create the Navbar Component
function LandingPage() {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const userObj = useSelector(selectUser);
    // const farmObj = useSelector(selectFarm);
    const redirectionURL = useSelector(selectRedirectionPath);
    const navigate = useNavigate();
    const userLandedPage = useLocation();

    // useEffect(() => {
    //     // fetchProducts(dispatch);
    //     if (isLoggedIn) {
    //         console.log('user logged in!');
    //         console.log(userLandedPage.pathname);
    //         if (userObj.role === 'admin') {
    //             navigate('/admin')
    //         } else {
    //             // farmer
    //             if (userObj.status === 'complete') {
    //                 navigate('/FarmInfo')
    //             } 
    //             else {
    //                 // incomplete profile
    //                 navigate('/SelectRole')
    //             }
    //         }
    //         if (redirectionURL) {
    //             navigate(`${redirectionURL}`);
    //             dispatch(clearRedirectionPath());
    //         }
    //     }
    // }, [isLoggedIn]);
    
    return(
        <div className="container main-frame fill-page">
            {isLoggedIn ? 
                <Row className="fill-page" style={{width: '100%'}}>
                    <Col xs={3} className="text-center py-3 dc-default dc-leftpane">
                        <h3 className="title"><RiSettingsLine size={40} style={{marginTop: '-5px'}} /> Dashboard</h3>
                        <ul className="nav flex-column dc-default dc-admin-nav">
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
                            <NavLink className="nav-link" activeClassName="active" to="/profile"><FaUser style={{marginTop: '-3px'}}  /> Profile</NavLink>
                          </li>
                      
                        </ul>
                    </Col>
                    <Col xs={9} className="text-center py-3 dc-default content_panel">
                        <Routes>
                            <Route path="/book-drone" element={<BookDrone />} />
                            <Route path="/service-reports" element={<ServiceReports />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/FarmLand" element={<FarmLand />} />
                            <Route path="/drone-booking-catalog" element={<DroneBookingCatalog />} />
                            <Route path="/drone-booking-selected" element={<DroneBookingSelected />} />
                            <Route path="/drone-booking-review" element={<DroneBookingReview />} />
                            <Route path="/drone-booking-confirmation" element={<DroneBookingConfirmation />} />
                            <Route path="/" element={<MyBookings />} />
                        </Routes>
                    </Col>
                </Row> : <h4>Welcome to DroneCloud. Login to see the dashboard!</h4> }
        </div>
    )
}

export default LandingPage;