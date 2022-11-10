import React, { useEffect, useState } from 'react';
import { selectIsLoggedIn, selectUser } from '../selectors/appSelector';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import "../components/css/DroneBookingCatalog.css"
import { Row, Col, Form } from 'react-bootstrap';
import axios from 'axios';

function MyBookings() {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const userObj = useSelector(selectUser);
    const navigate = useNavigate();
    const userLandedPage = useLocation();
    const [allbookingslist,setAllBookingsList] = useState([]);
    useEffect(() => {
        axios.post(`/api/userbookings`)
        .then(response => {
          console.log("donrappppi------------",response.data.data)
          setAllBookingsList(response.data.data)
        });
    }, [isLoggedIn]);
    

    return(
        <div className="container main-frame fill-page">
            <h4 style={{marginLeft:"350px"}}>My Bookings page</h4>
            <table style={{marginTop:"-100px"}}>
                <tr>
                    <th>Booking ID</th>
                    <th>Farmland</th>
                    <th>Service</th>
                    <th>Service Time</th>
                    <th>Status</th>

                </tr>
                {allbookingslist && allbookingslist.length&& allbookingslist.map(booking => 
                     <tr  style={{textAlign:"center"}}>
                     <td>{booking.id}</td>
                     <td>{booking.farm_id}</td>
                     <td>{booking.farm_id}</td>
                     <td>{booking.start_date.substring(0,10)}</td>
                     <td>{booking.farm_id}</td>

                     {/* <td>{booking.status}</td> */}
                 </tr>
                 
                    
                    )}
               
            </table>

        </div>
    )
}

export default MyBookings;