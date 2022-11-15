import React, {useEffect} from 'react';
import Navbar from './Navbar';
import '../App.css';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn, selectUser } from '../selectors/appSelector';

export default function Contact() {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const userObj = useSelector(selectUser);



    return(
        <div className="container pull-down fill-page dc-default">
            <h3><span><br></br></span>Hi, Thanks for registering to drone cloud. We value our customers.</h3><br/>
            {isLoggedIn ?
                
                <h5>Please send an email to dronecloud@gmail.com for any drone related queries!!</h5>:
                <h5>Hello, login or register to access the page!</h5>}
        </div>
    )
}

