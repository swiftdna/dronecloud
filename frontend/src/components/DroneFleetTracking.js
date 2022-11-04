import React, { useEffect, useState, useRef } from 'react';
import { selectIsLoggedIn, selectUser } from '../selectors/appSelector';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAdminDroneList, capitalizeFirst } from '../utils';
import { Row, Col, Form, Card, Badge, Spinner } from 'react-bootstrap';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

function DroneFleetTracking() {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const loading = useSelector((state) => state.admindronetracking.loading);
    const drones = useSelector((state) => state.admindronetracking.data);
    const userObj = useSelector(selectUser);
    const navigate = useNavigate();
    const userLandedPage = useLocation();
    const statusColors = {
        registered: "primary",
        active: "success",
        stopped: "danger",
        connected: "warning"
    }

    useEffect(() => {
        if (isLoggedIn) {
            console.log('DroneFleetTracking === user logged in!');
            getAdminDroneList(dispatch);
        }
    }, [isLoggedIn]);

    useEffect(() => {
    });

    const defaultProps = {
        center: {
          lat: 13.0827,
          lng: 80.2707
        },
        zoom: 10
    };

    return(
        <div className="container">
            <h4>Service cloud Dashboard</h4>
            <p>{drones.length} drones found</p>
            <div className="drones_list">
                {loading ? <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner> : ''}
                {!loading && drones && drones.length && drones.map(drone => 
                    <Card style={{ width: '18rem' }}>
                      <Card.Body>
                        <Card.Title>{drone.drone_maker} {drone.drone_model}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Drone #{drone.drone_id}</Card.Subtitle>
                        <Card.Text>
                          <Badge bg={drone.status ? statusColors[drone.status] : "primary"}>{capitalizeFirst(drone.status)}</Badge>
                        </Card.Text>
                      </Card.Body>
                </Card>
                )}
            </div>
            <div style={{ height: '670px', width: '100%', marginTop: '10px' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyDAY3yhqc24s5SpDcxRXTnObJXbQTBwtV4" }}
                    defaultCenter={defaultProps.center}
                    defaultZoom={defaultProps.zoom}
                  >
                  <Marker
                      lat={14.955413}
                      lng={80.337844}
                      type={'registered'}
                    />
                    <Marker
                      lat={14.965413}
                      lng={80.547844}
                      type={'active'}
                    />
                </GoogleMapReact>
            </div>
        </div>
    )
}

export default DroneFleetTracking;