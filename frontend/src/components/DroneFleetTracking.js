import React, { useEffect, useState, useRef } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { selectIsLoggedIn, selectUser } from '../selectors/appSelector';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAdminDroneList, capitalizeFirst } from '../utils';
import { Row, Col, Form, Card, Badge } from 'react-bootstrap';

mapboxgl.accessToken = 'pk.eyJ1IjoiY21wZTI4MS11YXYiLCJhIjoiY2w4Z2k0bmQ4MDBtcTQwbWtyc2o2MmEzNCJ9._iLFdHOPj9f8k5lekXN2HA';

function DroneFleetTracking() {
    const dispatch = useDispatch();
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-87.49);
    const [lat, setLat] = useState(41.89);
    const [zoom, setZoom] = useState(3);
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
        if (map.current) return; // initialize map only once
            map.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [lng, lat],
                zoom: zoom
            });
            // const marker = new mapboxgl.Marker()
            //  .setLngLat([-70.9, 42.35])
            //  .addTo(map.current);
      });
    
    return(
        <div className="container">
            <h4>Service cloud Dashboard</h4>
            <p>{drones.length} drones found</p>
            <div className="drones_list">
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
            <div ref={mapContainer} className="map-container" />
        </div>
    )
}

export default DroneFleetTracking;