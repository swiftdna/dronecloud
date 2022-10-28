import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Badge } from 'react-bootstrap';
import { FaList, FaShoppingCart, FaUserAlt, FaHeart, FaStore } from 'react-icons/fa';
import { TbDrone } from 'react-icons/tb';
import { selectErrorFlag, selectErrorMessage, selectIsLoggedIn } from '../selectors/appSelector';
import { handleLogoutResponse } from '../actions/app-actions';

//create the Navbar Component
function Navbar() {
    const isAuthenticated = useSelector(selectIsLoggedIn);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/');
        } else {
            console.log('navbar - login success')
        }
    }, [isAuthenticated])

    const login = () => {
        navigate('/login');
    }

    const register = () => {
        navigate('/register');
    }

    const home = () => {
        navigate('/');
    }

    const profile = () => {
        navigate('/profile');
    }

    const logout = () => {
        axios.post('/logout')
            .then(response => {
                dispatch(handleLogoutResponse(response));
            });
    }

    return(
        <nav className="navbar justify-content-between dc-default">
            <div className="container">
                <div className="col-1">
                    <a className="navbar-brand" onClick={() => home()}><TbDrone size={40} /></a>
                </div>
                <div className="col-8">
                </div>
                <div className="col-3 right-contents">
                    {
                        isAuthenticated ? 
                        <button type="button" className="btn btn-light nav-buttons" title="Log out" onClick={() => logout()}>Logout</button> : 
                        <>
                            <button type="button" className="btn btn-light nav-buttons" title="Log In" onClick={() => login()}>login</button>
                            <button type="button" className="btn btn-light nav-buttons" title="Log In" onClick={() => register()}>register</button>
                        </>
                    }
                    {
                        isAuthenticated && (
                            <>
                                {/* <FaList className="nav-buttons" title="Purchases" size="3em" onClick={() => purchases()}/> 
                                <FaUserAlt className="nav-buttons" title="Profile" size="3em" onClick={() => profile()}/> */}
                            </>)
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar;