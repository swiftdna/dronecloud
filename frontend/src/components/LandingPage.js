import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { pluck } from 'underscore';
import { selectIsLoggedIn, selectUser, selectCurrency, selectRedirectionPath } from '../selectors/appSelector';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearRedirectionPath } from '../actions/app-actions'

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
                <h4>User Home Page!</h4> : <h4>DroneCloud Landing Page!</h4> }
        </div>
    )
}

export default LandingPage;