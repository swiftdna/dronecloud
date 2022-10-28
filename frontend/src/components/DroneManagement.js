import React, { useEffect, useState } from 'react';
import { selectIsLoggedIn, selectUser } from '../selectors/appSelector';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Row, Col, Form } from 'react-bootstrap';

function DroneManagement() {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const userObj = useSelector(selectUser);
    const navigate = useNavigate();
    const userLandedPage = useLocation();

    useEffect(() => {
        if (isLoggedIn) {
            console.log('DroneManagement === user logged in!');
        }
    }, [isLoggedIn]);
    
    return(
        <div className="container main-frame fill-page">
            <h4>Drone Management page</h4>
        </div>
    )
}

export default DroneManagement;