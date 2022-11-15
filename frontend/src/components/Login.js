import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../utils';
import { selectIsLoggedIn } from '../selectors/appSelector';

//Define a Login Component
export function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/');
        }
    }, [isLoggedIn]);

    const usernameChangeHandler = (e) => {
        const inputValue = e.target.value;
        setUsername(inputValue);
    }

    const passwordChangeHandler = (e) => {
        const inputValue = e.target.value;
        setPassword(inputValue);
    }

    //submit Login handler to send a request to the node backend
    const submitLogin = () => {
        const data = {
            username,
            password
        };
        login(dispatch, data)
    }

    return (
        <div className="container dc-default">
            <div className="video-background">
              <div className="video-foreground">
                <iframe src="https://player.vimeo.com/video/724732130?background=1" frameBorder="0"></iframe>
              </div>
            </div>
            <div className="login-form dc-login">
                <div className="main-div">
                    <div className="login-panel">
                        <h2>Login</h2>
                        <p>Please enter your username and password</p>
                        <div className="form-group">
                            <input onChange = {usernameChangeHandler} type="text" className="form-control" name="username" value={username} placeholder="Username"/>
                        </div>
                        <div className="form-group">
                            <input onChange = {passwordChangeHandler} type="password" className="form-control" name="password" value={password} placeholder="Password"/>
                        </div>
                        <div className="form-group">
                            <button onClick = {() => submitLogin()} className="btn btn-primary">Log In</button>                 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login;