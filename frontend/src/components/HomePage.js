import React from 'react';
import Navbar from './Navbar';
import { useNavigate, useLocation } from 'react-router-dom';
import '../App.css';
import './css/LandingPageHome.css';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn, selectUser } from '../selectors/appSelector';
import {Button} from 'react-bootstrap';

function HomePage() {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const userObj = useSelector(selectUser);

    const navigate = useNavigate();

    const login = () => {
        navigate('/login');
    }

    const register = () => {
        navigate('/register');
    }
    
    return(
        <div className="landing-page">
          <div className="container dc-default">
            <div className="info">
              <h1>Drone Cloud for your agriculture!</h1>
              <p>Precision Agriculture Throughout the Year</p>
              <div style={{marginTop: '30px'}}>
              <Button variant="primary" onClick={() => login()}>
                Login
              </Button> 
              <Button variant="primary" style={{marginLeft: '12px'}} onClick={() => register()}>
                Register
              </Button> 
              </div>
            </div>
            <div class="image">
              <img src="https://thumbs.dreamstime.com/b/flying-drone-air-100755092.jpg" />
            </div>
            <div class="clearfix"></div>
          </div>
        </div>
    )
}

export default HomePage;