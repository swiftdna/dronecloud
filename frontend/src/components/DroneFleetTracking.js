import React, { useEffect, useState, useRef } from 'react';
import { selectIsLoggedIn, selectUser } from '../selectors/appSelector';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAdminDroneList, capitalizeFirst, getAdminDroneDetails } from '../utils';
import { Row, Col, Form, Card, Badge, Spinner } from 'react-bootstrap';
import { MdOutlineClose } from 'react-icons/md';
import { GoogleMap, useJsApiLoader, Polyline } from '@react-google-maps/api';
import Marker from './Marker';
import LiveTracking from './LiveTracking';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

function DroneFleetTracking() {
    const dispatch = useDispatch();
    const [indDrone, setIndDrone] = useState(null);
    const [indDronePaths, setIndDronePaths] = useState([]);
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const [map, setMap] = React.useState(null);
    const loading = useSelector((state) => state.admindronetracking.loading);
    const tloading = useSelector((state) => state.admindronetracking.trackingLoading);
    const drones = useSelector((state) => state.admindronetracking.data);
    const trackingMap = useSelector((state) => state.admindronetracking.tracking);
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
        if (indDrone && indDrone.drone_id) {
            if (trackingMap[indDrone.drone_id] && trackingMap[indDrone.drone_id].length) {
                setIndDronePaths(trackingMap[indDrone.drone_id]);
            } else {
                setIndDronePaths([]);
            }
        }
    }, [indDrone, tloading]);

    const containerStyle = {
      width: '100%',
      height: '690px'
    };

    const center = {
      lat: 37,
      lng: -122,
      zoom: 10
    };

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyDAY3yhqc24s5SpDcxRXTnObJXbQTBwtV4"
    });

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        for (let i = 0; i < drones.length; i++) {
            const path = {
                lat: drones[i].last_seen.lat,
                lng: drones[i].last_seen.lng
            };
            bounds.extend(path);
        }
        map.fitBounds(bounds);
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    const selectDrone = (drone) => {
        setIndDrone(drone);
        getAdminDroneDetails(dispatch, drone.drone_id);
    }

    return(
        <div className="container">
            <h4>Service cloud Dashboard</h4>
            <p>{drones.length} drones found</p>
            <div className="drones_list">
                {loading ? <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner> : ''}
                {!loading && drones && drones.length && drones.map(drone => 
                    <Card style={{ width: '13rem' }} className={indDrone && (drone.drone_id === indDrone.drone_id) ? 'selected' : ''} onClick={() => selectDrone(drone)}>
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
            {indDrone && indDrone.drone_id ? <div className="drone_details">
                    <div style={{float: 'right'}}><MdOutlineClose size={40} style={{cursor: 'pointer'}} onClick={() => setIndDrone()} /></div>
                    <h4>Drone ID #{indDrone.drone_id}</h4>
                    <Row>
                        <Col className="drone_chars">
                            <p className="title">Tracking details</p>
                            <p>Status: {indDrone.status}</p>
                            <p>Location (lat, lng, alt):  {indDrone.last_seen ? `${indDrone.last_seen.lat},${indDrone.last_seen.lng},${indDrone.last_seen.alt}` : 'Not available'}</p>
                            {tloading ? <p>Loading paths..</p> : <p>{indDronePaths && indDronePaths.length ? `${indDronePaths.length} paths found` : 'No paths found'} </p>}
                        </Col>
                        <Col className="drone_chars">
                            <p className="title">Drone details</p>
                            <p>ID: {indDrone.drone_id}</p>
                            <p>Model: {indDrone.drone_maker} {indDrone.drone_model}</p>
                            <p>Service Type: {indDrone.service_type}</p>
                        </Col>
                        {!tloading && indDronePaths && indDronePaths.length  ? <LiveTracking 
                            paths={indDronePaths}
                        /> : <p>No drone paths to display in the map</p>}
                    </Row>
                </div> : <div style={{ height: '670px', width: '100%', marginTop: '10px' }}>
                {isLoaded ? <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                  >
                  {!loading && drones && drones.length && drones.map(drone => 
                    drone.last_seen ? <Marker
                      lat={drone.last_seen.lat}
                      lng={drone.last_seen.lng}
                      type={drone.status}
                    /> : ''
                    )
                  }
                </GoogleMap> : ''}
            </div>}
        </div>
    )
}

export default DroneFleetTracking;