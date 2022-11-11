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
    const user_id = useSelector((store) =>store.app.user.id);

    useEffect(() => {
        axios.post(`/api/userbookings`,{
            id:1
        })
        .then(response => {
          console.log("donrappppi------------",response.data.data)
          setAllBookingsList(response.data.data)
        });
    }, [isLoggedIn]);
    

    return(
        <div className="container main-frame fill-page">
            <h4  style={{marginLeft:"350px"}}>My Bookings page</h4>
            <div style={{width:"960px",marginTop:"50px"}}>
            <table >
                <tr>
                    <th>Booking ID</th>
                    <th>Farmland</th>
                    <th>Service</th>
                    <th>Service Time</th>
                    <th>Status</th>

                </tr>
                {allbookingslist && allbookingslist.length&& allbookingslist.map(booking => 
                     <tr class="border-bottom">
                     <td>{booking.id}</td>
                     <td>{booking.farm_id}</td>
                     <td>{booking.farm_id}</td>
                     <td>{booking.start_date&&booking.start_date.substring(0,10)} to {booking.end_date&&booking.end_date.substring(0,10)}</td>
                     <td>
                        {booking.status==="booked" ? <button class="button-booked buttonbooked1">Booked</button> : booking.status==="deleted" ? <button class="button-deleted buttondeleted1">Deleted</button>: booking.status==="finished" ? <button class="button-finished buttonfinished1">Finished</button>:<div></div>}

</td>  
                     {/* <td>{booking.status}</td> */}
                 </tr>
                 
                    
                    )}
               
            </table>
            </div>
           

        </div>
    )
}

export default MyBookings;