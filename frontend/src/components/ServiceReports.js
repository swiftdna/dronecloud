import React, { useEffect, useState } from 'react';
import { selectIsLoggedIn, selectUser } from '../selectors/appSelector';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import "../components/css/DroneBookingCatalog.css"
import { Row, Col, Form, Badge } from 'react-bootstrap';
import { FaEye } from 'react-icons/fa';
import axios from 'axios';

function ServiceReports() {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const userObj = useSelector(selectUser);
    const navigate = useNavigate();
    const userLandedPage = useLocation();
    const [allbookingslist,setAllBookingsList] = useState([]);
    const user_id = useSelector((store) => store.app.user.id);
    const username = useSelector((store) =>store.app.user.name);
    useEffect(() => {
        if (isLoggedIn && user_id) {
            axios.post(`/api/userbookings`,{
                id: user_id,
                status: 'complete'
            })
            .then(response => {
              setAllBookingsList(response.data.data)
            });
        }
    }, [isLoggedIn]);


    const openReport = (id) => {
        navigate(`/service-reports/${id}`);
    }

    return(
        <div>
            <Row style={{marginTop: '-30px'}}>
            <Col xs={6}>
                <h4 style={{marginLeft: '-250px', marginTop: '30px'}}>Service Reports</h4>
                <p style={{marginLeft: '-140px', marginTop: '10px', color: '#808080'}}>View your reports for finished services</p>
            </Col>
            <Col xs={6}>
            </Col>
            </Row>
            <div className="container main-frame">
                {allbookingslist && allbookingslist.length ? 
                <table >
                    <tr>
                        <th>Booking ID</th>
                        <th>Farmland</th>
                        <th>Land Type</th>
                        <th>Service</th>
                        <th>Service Time</th>
                        <th>Status</th>
                        <th>Report</th>
                    </tr>
                    {allbookingslist.map(booking => 
                         <tr class="border-bottom" style={{textAlign:"center"}}>
                         <td style={{  textAlign:"center"}}>{booking.id}</td>
                         <td style={{  textAlign:"center"}}>{booking['Farm.name']}</td>
                         <td style={{  textAlign:"center"}}>{booking['Land.type']}</td>
                         <td style={{  textAlign:"center"}}>{booking.service}</td>

                         <td >{booking.start_date&&booking.start_date.substring(0,10)} to {booking.end_date&&booking.end_date.substring(0,10)}</td>
                         <td>
                            {booking.status==="booked" ? <Badge bg="primary">Booked</Badge> : booking.status==="active" ? <Badge bg="warning">Active</Badge>: booking.status==="complete" ? <Badge bg="success">Complete</Badge>:<div></div>}

                        </td>
                            <FaEye size="23" onClick={() => openReport(booking.id)} style={{marginTop: "11px", color: '#0070BA', cursor: 'pointer'}} />
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

export default ServiceReports;