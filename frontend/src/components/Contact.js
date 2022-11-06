import React from 'react';
import Navbar from './Navbar';
import '../App.css';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn, selectUser } from '../selectors/appSelector';

function Contact() {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const userObj = useSelector(selectUser);

    return(
        <div className="container pull-down">
            {isLoggedIn ?
                <h2>Please email to dronecloud@gmail.com for any drone related queries!!</h2>:
                <h5>Hello, login or register to access the page!</h5>}
        </div>
    )
}

export default Contact;