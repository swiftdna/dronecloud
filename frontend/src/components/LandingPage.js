import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { pluck } from 'underscore';
import { selectIsLoggedIn, selectUser, selectCurrency, selectRedirectionPath } from '../selectors/appSelector';
import {   Routes, Route, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearRedirectionPath } from '../actions/app-actions'
import MyBookings from './MyBookings';
import BookDrone from './BookDrone';
import Profile from './Profile';
import ServiceReports from './ServiceReports';
import { Row, Col, Form } from 'react-bootstrap';
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
            console.log(userLandedPage.pathname);
            if (redirectionURL) {
                navigate(`${redirectionURL}`);
                dispatch(clearRedirectionPath());
            }
        }
    }, [isLoggedIn]);
    
    return(
        <div className="container main-frame fill-page">
            {isLoggedIn ? 
                <Row className="fill-page" style={{width: '100%'}}>
                    <Col xs={3} className="text-center py-3">
                        <ul className="nav flex-column dc-default dc-admin-nav">
                          <li className="nav-item">
                            <NavLink className="nav-link" activeClassName="active" to="/">My Bookings</NavLink>
                          </li>
                          <li className="nav-item">
                            <NavLink className="nav-link" activeClassName="active" to="/book-drone">Book Drone</NavLink>
                          </li>
                          <li className="nav-item">
                            <NavLink className="nav-link" activeClassName="active" to="/service-reports">Service Reports</NavLink>
                          </li>
                          <li className="nav-item">
                            <NavLink className="nav-link" activeClassName="active" to="/profile">Profile</NavLink>
                          </li>
                        </ul>
                    </Col>
                    <Col xs={9} className="text-center py-3 dc-default content_panel">
                        <Routes>
                            <Route path="/book-drone" element={<BookDrone />} />
                            <Route path="/service-reports" element={<ServiceReports />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/" element={<MyBookings />} />
                        </Routes>
                    </Col>
                </Row> : <h4>Welcome to DroneCloud. Login to see the dashboard!</h4> }
        </div>
    )
}

export default LandingPage;