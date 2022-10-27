import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { pluck } from 'underscore';
import { fetchProducts, fetchFavourites, favourite, unfavourite, addItemToCart, updatedItemInCart } from '../utils';
import { selectIsLoggedIn, selectUser, selectCurrency } from '../selectors/appSelector';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Form } from 'react-bootstrap';

//create the Navbar Component
function LandingPage() {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const userObj = useSelector(selectUser);
    const navigate = useNavigate();

    useEffect(() => {
        // fetchProducts(dispatch);
        if (isLoggedIn) {
            console.log('user logged in!');
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