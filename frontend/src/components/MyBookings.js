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
    const user_id = useSelector((store) => store.app.user.id);

    useEffect(() => {
        axios.post(`/api/userbookings`,{
            id:user_id
        })
        .then(response => {
          console.log("donrappppi------------",response.data.data)
          setAllBookingsList(response.data.data)
        });
    }, [isLoggedIn]);
    

    return(
        <div>
          <h3>Welcome Sravya!</h3><img src="avatar.jpeg" alt="Avatar" style={{width:"200px",borderRadius: "50%",marginLeft:"628px",marginTop:"-77"}}/>

        <div className="container main-frame fill-page">    

       
            
            <h4  style={{marginTop:"-146px",marginLeft:"349px"}}>My Bookings page</h4>
            <div style={{width:"960px",marginTop:"-350px",marginLeft:"149px"}}>
            <table >
                <tr>
                    <th>Booking ID</th>
                    <th>Farmland</th>
                    <th>Land Type</th>
                    <th>Service</th>
                    <th>Service Time</th>
                    <th>Status</th>

                </tr>
                {allbookingslist && allbookingslist.length&& allbookingslist.map(booking => 
                     <tr class="border-bottom" style={{  textAlign:"center"
                     }}>
                     <td style={{  textAlign:"center"
                     }}>{booking.id}</td>
                     <td style={{  textAlign:"center"
                     }}>{booking.farmland}</td>
                     <td style={{  textAlign:"center"
                     }}>{booking.landtype}</td>
                     <td style={{  textAlign:"center"
                     }}>{booking.service}</td>

                     <td >{booking.start_date&&booking.start_date.substring(0,10)} to {booking.end_date&&booking.end_date.substring(0,10)}</td>
                     <td>
                        {booking.status==="booked" ? <button class="button-booked buttonbooked1">Booked</button> : booking.status==="active" ? <button class="button-deleted buttondeleted1">Active</button>: booking.status==="finished" ? <button class="button-finished buttonfinished1">Finished</button>:<div></div>}

</td>  
                     {/* <td>{booking.status}</td> */}
                 </tr>
                 
                    
                    )}
               
            </table>
            </div>
           

        </div>
        </div>
    )
}

export default MyBookings;