import React, { useEffect, useState } from 'react';
import { selectIsLoggedIn, selectUser } from '../selectors/appSelector';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import "../components/css/DroneBookingCatalog.css"
import { Row, Col, Form, Badge, Card, Image } from 'react-bootstrap';
import { FaEye } from 'react-icons/fa';
import axios from 'axios';

function ServiceReportDetails() {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const userObj = useSelector(selectUser);
    const navigate = useNavigate();
    const userLandedPage = useLocation();
    const [allbookingslist,setAllBookingsList] = useState([]);
    const user_id = useSelector((store) => store.app.user.id);
    const username = useSelector((store) =>store.app.user.name);
    let { id } = useParams();

    const imageSet = [
        'https://c8.alamy.com/comp/2FNR774/aerial-photo-of-ponds-and-lakes-in-florida-taken-by-drone-in-4k-2FNR774.jpg',
        'https://media.istockphoto.com/id/910370864/photo/birds-eye-view-of-lake-and-forest-taken-by-drone.jpg?s=1024x1024&w=is&k=20&c=KE_GP7tk1Sg7HB2wxZZHnDYF-RGjhNQnUvBnxEQdlL8=',
        'https://thumbs.dreamstime.com/b/birds-eye-view-24256239.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThjJpwjP16SiXWKxPzClxxcJFeCIdEmrM6UA&usqp=CAU',
        'https://www.escapemonthly.com/wp-content/uploads/Best-Drone-Locations-for-Photos.jpg',
        'https://static.vecteezy.com/system/resources/previews/003/817/539/large_2x/aerial-view-of-beautiful-tropical-forest-with-the-river-shot-from-drone-photo.jpg'
    ];

    return(
        <div>
            <Row>
            <h4 style={{textAlign: 'center'}}>Service Report Detail for the trip #{id}</h4>
            <p style={{textAlign: 'center', marginTop: '-7px', color: '#808080'}}>View the insights of the trip</p>
            </Row>
            <Row>
                <Col xs={6}>
                    <div style={{textAlign: 'left'}}>
                        <p style={{fontWeight: 'bold'}}>Service Details</p>
                        <p className="srv_dtl">ID #{id}</p>
                        <p className="srv_dtl">Status: Finished</p>
                        <p className="srv_dtl">Service Type: Rental - Data Collection</p>
                        <p className="srv_dtl">Time Start: 6th Dec 2022, 05:00PM</p>
                        <p className="srv_dtl">Time End: 6th Dec 2022, 03:00PM</p>
                        <p className="srv_dtl">Land: West Plot A - Crop</p>
                        <p className="srv_dtl">Drone ID: 14563</p>
                        <p className="srv_dtl">Price: $130</p>
                    </div>
                </Col>
                <Col xs={6}>
                    <div style={{textAlign: 'left'}}>
                        <p></p>
                        <p style={{fontWeight: 'bold', marginBottom: 0}}>Farmer's signature</p>
                        <p className="srv_dtl" style={{marginBottom: 10}}>Not Signed</p>
                        <p style={{fontWeight: 'bold', marginBottom: 0}}>Pilot's signature</p>
                        <p className="srv_dtl" style={{marginBottom: 10}}>Not Signed</p>
                    </div>
                </Col>
            </Row>
            <h5 style={{textAlign: 'center'}}>Service Results</h5>
            <Row>
                <p style={{textAlign: 'left', fontWeight: 'bold'}}>Images</p>
                <div style={{display: 'inline-block'}}>
                    {Array(6).fill(6).map((dt, i) =>
                        <Card style={{ width: '18rem', display: 'inline-block', margin: '10px' }}>
                          <Card.Body style={{ padding: '2px' }}>
                            <Image src={imageSet[i]} style={{textAlign: 'center'}} width="280" height="200" />
                            <Card.Text style={{marginTop: '2px', marginBottom: '2px'}}>
                              Image {i+1}: Captured at 7:0{i}pm
                            </Card.Text>
                          </Card.Body>
                        </Card>
                    )}
                </div>
            </Row>
        </div>
    )
}

export default ServiceReportDetails;