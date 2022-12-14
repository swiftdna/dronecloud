import React, { useEffect, useState, useRef } from 'react';
import { selectIsLoggedIn, selectUser } from '../selectors/appSelector';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAdminDroneList, capitalizeFirst, getAdminDroneDetails, getAdminDroneCleanDetails } from '../utils';
import { Row, Col, Form, Card, Badge, Spinner, Image } from 'react-bootstrap';
import { MdOutlineClose } from 'react-icons/md';
import { GoogleMap, useJsApiLoader, Polyline, StandaloneSearchBox } from '@react-google-maps/api';
import Marker from './Marker';
import LiveTracking from './LiveTracking';
import moment from 'moment';

const libraries = ["drawing", "places", "geometry"];

function DroneFleetTracking() {
    const dispatch = useDispatch();
    const [indDrone, setIndDrone] = useState(null);
    const [indDronePaths, setIndDronePaths] = useState([]);
    const [expDronePaths, setExpDronePaths] = useState([]);
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const [map, setMap] = React.useState(null);
    const [searchBox, setSearchBox] = React.useState(null);
    const [searchedName, setSearchedName] = React.useState(null);
    const [withIn, setWithIn] = React.useState(20);
    const [proximityDrones, setProximityDrones] = useState([]);
    const [booking, setBooking] = useState({});
    const loading = useSelector((state) => state.admindronetracking.loading);
    const tloading = useSelector((state) => state.admindronetracking.trackingLoading);
    const drones = useSelector((state) => state.admindronetracking.data);
    const trackingMap = useSelector((state) => state.admindronetracking.tracking);
    const trackingSeveralMap = useSelector((state) => state.admindronetracking.trackingSeveral);
    const trackingTrips = useSelector((state) => state.admindronetracking.trips);
    const bookingsMap = useSelector((state) => state.admindronetracking.bookingsMap);
    const userObj = useSelector(selectUser);
    const navigate = useNavigate();
    const userLandedPage = useLocation();
    const statusColors = {
        available: "primary",
        active: "success",
        stopped: "danger",
        connected: "warning"
    }

    useEffect(() => {
        if (isLoggedIn) {
            getAdminDroneList(dispatch);
        }
    }, [isLoggedIn]);

    useEffect(() => {
        if (indDrone && indDrone.id) {
            if (trackingMap[indDrone.id] && trackingMap[indDrone.id].length) {
                setIndDronePaths(trackingMap[indDrone.id]);
            } else {
                setIndDronePaths([]);
            }
        }
    }, [indDrone, tloading]);

    useEffect(() => {
        if (map) {
            fixMapDefaultPosition();            
        }
    }, [drones, map]);

    const containerStyle = {
      width: '100%',
      height: '600px'
    };

    const center = {
      lat: 37,
      lng: -122
    };

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyDAY3yhqc24s5SpDcxRXTnObJXbQTBwtV4",
        libraries
    });

    const onLoad = React.useCallback(function callback(map) {
        // console.log('onLoad');
        const bounds = new window.google.maps.LatLngBounds();
        for (let i = 0; i < drones.length; i++) {
            if (!drones[i].last_seen || !drones[i].last_seen.lat) {
                continue;
            }
            const path = {
                lat: drones[i].last_seen.lat,
                lng: drones[i].last_seen.lng
            };
            bounds.extend(path);
        }
        // map.setOptions({ maxZoom: 8 });
        map.fitBounds(bounds);
        // map.setOptions({ maxZoom: null });
        setMap(map);
    }, []);

    const fixMapDefaultPosition = () => {
        const bounds = new window.google.maps.LatLngBounds();
        const tmpdrones = searchedName ? proximityDrones.slice() : drones.slice();
        for (let i = 0; i < tmpdrones.length; i++) {
            if (!tmpdrones[i].last_seen || !tmpdrones[i].last_seen.lat) {
                continue;
            }
            const path = {
                lat: tmpdrones[i].last_seen.lat,
                lng: tmpdrones[i].last_seen.lng
            };
            bounds.extend(path);
        }
        map.setOptions({ maxZoom: 8 });
        map.fitBounds(bounds);
        map.setOptions({ maxZoom: null });
        setMap(map);
    }

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    const selectDrone = (drone) => {
        setIndDrone(drone);
        // getAdminDroneDetails(dispatch, drone.id);
        getAdminDroneCleanDetails(dispatch, drone.id);
    }

    const closeDetailedDroneView = () => {
        setIndDrone();
        setBooking();
        // onLoad();
        // fixMapDefaultPosition();
    }

    const onSBLoad = ref => {
        setSearchBox(ref);
    };

    const filterDronesByProximity = center => {
        const tempDrones = drones.slice();
        const filtered = tempDrones
            .filter(dr => dr.last_seen && dr.last_seen.lat)
            .filter(dr => {
                const dist_mts = window.google.maps.geometry.spherical.computeDistanceBetween({
                  lat: center.lat,
                  lng: center.lng
                }, {
                  lat: dr.last_seen.lat,
                  lng: dr.last_seen.lng
                });
                return dist_mts > 0 && (dist_mts/1609 <= withIn);
            });
        setProximityDrones(filtered);
    }

    const onPlacesChanged = () => {
        let results = searchBox.getPlaces();
        const placeName = results && results.length ? results[0].name : '';
        setSearchedName(placeName);
        const bounds = new window.google.maps.LatLngBounds();
        for (let i = 0; i < results.length; i++) {
            let place = results[i].geometry.location;
            const path = {
                lat: place.lat(),
                lng: place.lng()
            };
            filterDronesByProximity(path);
            bounds.extend(path);
        }
        map.setOptions({ maxZoom: 8 });
        map.fitBounds(bounds);
        map.setOptions({ maxZoom: null });
        setMap(map);
    };

    const handleSearchChange = (e) => {
        const {target: {value}} = e;
        setSearchedName(value);
    }

    const setTripRoutes = (e) => {
        // console.log('setting active trip - ', e.target.value);
        const tripID = e.target.value;
        const droneSpecificPaths = trackingSeveralMap[indDrone.id];
        const bkMap = bookingsMap[indDrone.id];
        const booking = bkMap[tripID];
        setBooking(booking);
        if (!droneSpecificPaths || !Object.keys(droneSpecificPaths).length) {
            console.log('droneSpecificPaths not available');
            return;
        }
        const tripSpecificPaths = droneSpecificPaths[tripID];
        if (indDrone && indDrone.id && tripSpecificPaths && tripSpecificPaths.length) {
            setIndDronePaths(tripSpecificPaths);
        } else {
            setIndDronePaths([]);
        }
        // console.log(booking);
        if (indDrone && indDrone.id  && booking && booking.id && booking.expectedCoords) {
            const tripExpectedPaths = [...booking.expectedCoords];
            setExpDronePaths(tripExpectedPaths);
        } else {
            setExpDronePaths([]);
        }
        // if (indDrone && indDrone.id && tripSpecificPaths && tripSpecificPaths.length) {
        //     setIndDronePaths(tripSpecificPaths);
        // } else {
        //     setIndDronePaths([]);
        // }
    }

    const readableDate = (date, short) => {
        if (short) {
            return moment(date).format('LT');    
        }
        return moment(date).format('lll');
    }

    return(
        <div className="container">
            <h2>Service cloud Dashboard</h2>
            <p style={{color: '#7c7c7c'}}>Track deployed drones on this screen</p>
            {!loading && searchedName && proximityDrones ? proximityDrones.length ? <p>{proximityDrones.length} drones found</p> : <p>No drones found</p> : ''}
            {!loading && !searchedName && drones && drones.length? <p>{drones.length} drones found</p> : ''}
            {!loading && !searchedName && drones && !drones.length? <p>No drones found. A drone must be registered and used through bookings to be show up here.</p> : ''}
            <div className="drones_list">
                {loading ? <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner> : ''}
                {!loading && searchedName && proximityDrones && proximityDrones.length ? proximityDrones.map(drone => 
                    <Card style={{ width: '13rem' }} className={indDrone && (drone.id === indDrone.id) ? 'selected' : ''} onClick={() => selectDrone(drone)}>
                      <Card.Body>
                        <Card.Title>{drone.manufacturer} {drone.model}</Card.Title>
                        <Row>
                        <Col xs={drone.image_url ? 7 : 12}>
                            <Card.Subtitle className="mb-2 text-muted">Drone #{drone.id}</Card.Subtitle>
                            <Card.Text>
                              <Badge bg={drone.status ? statusColors[drone.status] : "primary"}>{capitalizeFirst(drone.status)}</Badge>
                            </Card.Text>
                        </Col>
                        {drone.image_url ? <Col xs={5}>
                            <Image src={drone.image_url} style={{marginLeft: '-20px', marginTop: '-5px'}} width="80" height="60" />
                        </Col> : ''}
                        </Row>
                      </Card.Body>
                    </Card>
                ) : ''}
                {!loading && !searchedName && drones && drones.length ? drones.map(drone => 
                    <Card style={{ width: '13rem' }} className={indDrone && (drone.id === indDrone.id) ? 'selected' : ''} onClick={() => selectDrone(drone)}>
                      <Card.Body>
                        <Card.Title>{drone.manufacturer} {drone.model}</Card.Title>
                        <Row>
                        <Col xs={drone.image_url ? 7 : 12}>
                            <Card.Subtitle className="mb-2 text-muted">Drone #{drone.id}</Card.Subtitle>
                            <Card.Text>
                              <Badge bg={drone.status ? statusColors[drone.status] : "primary"}>{capitalizeFirst(drone.status)}</Badge>
                            </Card.Text>
                        </Col>
                        {drone.image_url ? <Col xs={5}>
                            <Image src={drone.image_url} style={{marginLeft: '-20px', marginTop: '-5px'}} width="80" height="60" />
                        </Col> : ''}
                        </Row>
                      </Card.Body>
                </Card>
                ) : ''}
            </div>
            {indDrone && indDrone.id ? '' : !loading && ((proximityDrones && proximityDrones.length) || (drones && drones.length)) ? <Row>
            <Col xs={6} className="search_helper">Showing drones within <span className="dist">{withIn}</span> miles {searchedName ? `of ${searchedName}` : ''}</Col>
            <Col xs={3} className="search_helper"></Col>
            <Col xs={3}>
                {!loading && drones && drones.length ? 
                    <div id="searchbox">
                    <StandaloneSearchBox
                      onLoad={onSBLoad}
                      onPlacesChanged={
                        onPlacesChanged
                      }
                    >
                      <input
                        type="search"
                        placeholder="Search by region"
                        onChange={handleSearchChange}
                        style={{
                          boxSizing: `border-box`,
                          border: `1px solid transparent`,
                          width: `200px`,
                          height: `40px`,
                          padding: `0 12px`,
                          borderRadius: `3px`,
                          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                          fontSize: `14px`,
                          outline: `none`,
                          textOverflow: `ellipses`,
                          position: "absolute",
                        }}
                        value={searchedName}
                      />
                    </StandaloneSearchBox>
                    </div> : ''
                }
            </Col>
            </Row> : ''}
            {indDrone && indDrone.id ? <div className="drone_details">
                    <div style={{float: 'right'}}><MdOutlineClose size={40} style={{cursor: 'pointer'}} onClick={() => closeDetailedDroneView()} /></div>
                    <h4>Drone ID #{indDrone.id}</h4>
                    <Row>
                        <Col className="drone_chars">
                            <p className="title">Tracking details</p>
                            <p>Status: {indDrone.status}</p>
                            <p>Location (lat, lng, alt):  {indDrone.last_seen ? `${indDrone.last_seen.lat},${indDrone.last_seen.lng},${indDrone.last_seen.alt}` : 'Not available'}</p>
                            <p>Trips Taken: {tloading ? 'Loading..' : (trackingTrips && trackingTrips[indDrone.id] && trackingTrips[indDrone.id].length) ? `${trackingTrips[indDrone.id].length}` : 'None'}</p>
                            {tloading ? <p>Loading trips..</p> : ''}
                            <Row>
                                {!tloading && trackingTrips && trackingTrips[indDrone.id] && trackingTrips[indDrone.id].length ? 
                                    <Form.Select aria-label="Select a trip" style={{margin: '10px', width: '50%'}} onChange={setTripRoutes}>
                                        <option value="">Select a trip</option>
                                      {
                                        trackingTrips[indDrone.id].map(opt => 
                                            <option value={opt}>Trip #{opt}</option>
                                        )}
                                    </Form.Select> : !tloading && !trackingTrips.length ? <p>No trips found</p> : ''}
                            </Row>
                            {tloading ? <p>Loading paths..</p> : <p>{indDronePaths && indDronePaths.length ? `${indDronePaths.length} paths found for the trip` : ''} </p>}
                            <p>Actual path: <span style={{color: '#D10000'}}>Red line</span></p>
                            <p>Expected path: <span style={{color: '#0070BA'}}>Blue line</span></p>
                        </Col>
                        <Col className="drone_chars">
                            <p className="title">Drone details</p>
                            <p>ID: {indDrone.id}</p>
                            <p>Model: {indDrone.manufacturer} {indDrone.model}</p>
                            <p>Service Type: {indDrone.service_type}</p>

                            {booking && booking.id ? 
                                <>
                                <p className="title" style={{marginTop: '10px'}}>Trip details</p>
                                <p>ID: {booking.id} (Status: {booking.status})</p>
                                <p>Farm: {booking['Farm.name']}</p>
                                <p>Land: {booking['Land.name']}</p>
                                <p>Service: {booking.service}</p>
                                <p></p>
                                <p>Time: {readableDate(booking.start_date)} to {readableDate(booking.end_date)}</p>
                                </> : ''}

                        </Col>
                        {!tloading && indDronePaths && indDronePaths.length  ? <LiveTracking 
                            paths={indDronePaths} routepaths={expDronePaths}
                        /> : <p>No drone paths to display in the map</p>}
                    </Row>
                </div> : <div style={{ height: '670px', width: '100%', marginTop: '10px' }}>
                {isLoaded && !loading && ((proximityDrones && proximityDrones.length) || (drones && drones.length)) ? <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                  >
                  {searchedName && proximityDrones && proximityDrones.length && proximityDrones.map(drone => 
                    drone.last_seen && drone.last_seen.lat ? <Marker
                      lat={drone.last_seen.lat}
                      lng={drone.last_seen.lng}
                      type={drone.status}
                    /> : ''
                    )
                  }
                  {!searchedName && drones && drones.length && drones.map(drone => 
                    drone.last_seen && drone.last_seen.lat ? <Marker
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