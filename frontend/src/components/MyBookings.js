import React, { useEffect, useState } from 'react';
import { selectIsLoggedIn, selectUser } from '../selectors/appSelector';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import "../components/css/DroneBookingCatalog.css"
import { FaRedo } from 'react-icons/fa';
import { Row, Col, Form, Badge, Spinner } from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment';

function MyBookings() {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const userObj = useSelector(selectUser);
    const navigate = useNavigate();
    const userLandedPage = useLocation();
    const [allbookingslist,setAllBookingsList] = useState([]);
    const [loading, setLoading] = useState(false);
    const user_id = useSelector((store) => store.app.user.id);
    const username = useSelector((store) =>store.app.user.name);
    useEffect(() => {
        if (isLoggedIn && user_id) {
            getBookingsData();
        }
    }, [isLoggedIn]);

    const getBookingsData = () => {
        setLoading(true);
        axios.post(`/api/userbookings`,{
            id: user_id
        })
        .then(response => {
            setLoading(false);
            // console.log('records -> ', response.data.data);
            setAllBookingsList(response.data.data)
        });
    };

    const reload = () => {
        getBookingsData();
    }

    const readableDate = (date, short) => {
        if (short) {
            return moment(date).format('LT');    
        }
        return moment(date).format('lll');
    }
    

    return(
        <div>
            <Row style={{marginTop: '-30px'}}>
            <Col xs={6}>
                <h4 style={{marginLeft: '-250px', marginTop: '30px'}}>My Bookings <FaRedo size="15" style={{marginLeft: '10px', cursor: 'pointer'}} onClick={() => reload()} /></h4>
            </Col>
            <Col xs={6}>
                <h4>Welcome {username}! <img src="avatar.jpeg" alt="Avatar" style={{width:"100px",borderRadius: "50%"}}/></h4> 
            </Col>
            </Row>
            <div className="container main-frame">
                {loading ? <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner> : ''}
                {!loading && allbookingslist && allbookingslist.length ? 
                <table>
                    <tr>
                        <th>Booking ID</th>
                        <th>Farmland</th>
                        <th>Land Type</th>
                        <th>Service</th>
                        <th>Service Time</th>
                        <th>Status</th>
                    </tr>
                    {allbookingslist.map(booking => 
                         <tr class="border-bottom" style={{  textAlign:"center"}}>
                         <td style={{textAlign:"center"}}>{booking.id}</td>
                         <td style={{textAlign:"center"}}>{booking['Farm.name']}</td>
                         <td style={{textAlign:"center"}}>{booking['Land.type']}</td>
                         <td style={{textAlign:"center"}}>{booking.service}</td>
                         <td >{booking.start_date && readableDate(booking.start_date)} to {booking.end_date && readableDate(booking.end_date, true)}</td>
                         <td>
                            {booking.status==="booked" ? <Badge bg="primary">Booked</Badge> : booking.status==="active" ? <Badge bg="warning">Active</Badge>: booking.status==="complete" ? <Badge bg="success">Complete</Badge>:<div></div>}

                        </td>  
                         {/* <td>{booking.status}</td> */}
                        </tr>
                    )}
                </table>: ''}
                {!allbookingslist || !allbookingslist.length ? 
                    <p>No bookings found on the server. Start booking your drone today!</p> : ''
                }

            </div>
        </div>
    )
}

export default MyBookings;