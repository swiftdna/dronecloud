import React, {useState, useEffect} from 'react';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.css';
import {register} from "../utils";
import {setAlert} from "../actions/app-actions";
import {useNavigate} from "react-router-dom";
import "../CSS/UserRegistration.css"
import { useDispatch } from "react-redux";
import 'bootstrap/dist/css/bootstrap.css';
import {addFarm} from "../utils";
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { GoogleMap, useJsApiLoader, Polyline, StandaloneSearchBox, Marker } from '@react-google-maps/api';

const libraries = ["drawing", "places", "geometry"];

export default function FarmInfo({ formData, setFormData }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const submitRegister = () => {
    //      // Make an API call
    //      addFarm(dispatch, {
    //         name,
    //         lat,
    //         lng,
    //         address,
    //     }, (err, success) => {
    //         if (success) {
    //             navigate("/FarmPlotInfo");
    //         } else {
    //             // Failure
    //             console.log('Saving profile info failed!');
    //         }
    //     });
    // }
    // const goBack = () => {
    //     navigate('/FarmerInfo1');
    // };
    // const [name, setName] = useState("");
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");
    const [address, setAddress] = useState("");
    const [map, setMap] = React.useState(null);
    const [searchBox, setSearchBox] = React.useState(null);
    const [searchedName, setSearchedName] = React.useState(null);
    const [markers, setMarkers] = useState([]);
    const [addFarmView, setAddFarmView] = useState(false);


    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyDAY3yhqc24s5SpDcxRXTnObJXbQTBwtV4",
        libraries
    });

    useEffect(() => {
        if (isLoaded && lat && lng) {
            console.log('updating recent location');
            updateMapWithRecentLocation(parseFloat(lat), parseFloat(lng));
            // console.log(lat,lng);
        }
    }, [markers, address, lat, lng]);

    const containerStyle = {
        width: '100%',
        height: '690px'
    };

    const center = {
        lat: 37,
        lng: -122
    };

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map)
    }, []);

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, []);

    const onSBLoad = ref => {
        setSearchBox(ref);
    };

    const updateMapWithRecentLocation = (lt, lg) => {
        const bounds = new window.google.maps.LatLngBounds();
        const path = {
            lat: lt,
            lng: lg
        };
        bounds.extend(path);
        map.setOptions({ maxZoom: 16 });
        map.fitBounds(bounds);
        map.setOptions({ maxZoom: null });
        setMap(map);
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
            bounds.extend(path);
        }
        map.setOptions({ maxZoom: 16 });
        map.fitBounds(bounds);
        map.setOptions({ maxZoom: null });
        setMap(map);
    };

    const placeClicked = (e) => {
        // console.log(e);
        const geocoder = new window.google.maps.Geocoder();
        const {latLng} = e;
        const lat = latLng.lat();
        const lng = latLng.lng();
        const tempMarkers = [];
        tempMarkers.push({
            title: "Farm Location",
            name: "empty",
            position: { lat, lng }
          });
        setLat(lat);
        setLng(lng);
        geocoder.geocode({location: {lat, lng}}).then(
          response => {
            const address = response.results[0].formatted_address;
            setAddress(address);
          },
          error => {
            console.error(error);
          }
        );
        setMarkers(tempMarkers);
        console.log('completed recent location');
    }

    const handleSearchChange = (e) => {
        const {target: {value}} = e;
        if (!value) {
            setSearchedName('');
        }
    }

    const confirm = () => {
        console.log(lat, lng, address);
        formData.lat = lat;
        formData.lng = lng;
        formData.farmaddress = address;
        setAddFarmView(false);
        setFormData({ ...formData, addFarmView: false })
        
    }

    const setFarm = () => {
        setAddFarmView(true)
        setFormData({ ...formData, addFarmView: true })
       
    }

    return (
            !addFarmView ? 
            <div>
                <h1 className='header-multistep'> Farmer's Farm Details</h1>
                <p className='heading-multistep'>Add your farm information</p>
                <div className='userDetails'>
                    <Form>
                        <Form.Group className="UserDetails">
                            <Form.Label className='DroneDetails'> Farm Name</Form.Label>
                            <Form.Control
                                type="text"
                                className='input_text'
                                aria-describedby="name"
                                value={formData.farmname}
                                onChange={(event) =>
                                setFormData({ ...formData, farmname: event.target.value })
                                }
                            />
                        </Form.Group>
                        <Form.Group className="UserDetails">
                            <Form.Label className='DroneDetails'>Address</Form.Label>
                            <Form.Control
                                placeholder="enter or select below"
                                type="text"
                                className='input_text'
                                aria-describedby="name"
                                value={formData.farmaddress}
                                onChange={(event) =>
                                    setFormData({ ...formData, farmaddress: event.target.value })
                                    }
                            />
                            
                            <button className='btn_panel' onClick={() => setFarm()}>Locate farm</button>
                        </Form.Group>
                    </Form>
                </div>
            </div> : 
            <div className="farm_add_menu">
                <h4>Locate Farm<span>
                    <button className='btn_panel' onClick={() => confirm()} style={{float:"right", margin:"10px"}}>Confirm</button> </span></h4>
                {isLoaded ?
                <div id="searchbox">
                    <br></br>
                    <StandaloneSearchBox
                        onLoad={onSBLoad}
                        onPlacesChanged={
                            onPlacesChanged
                        }
                    >
                        <input
                            type="search"
                            placeholder="Enter place name"
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
                                position: "absolute"
                            }}
                        />
                    </StandaloneSearchBox>
                </div> : ''}
                <div style={{ height: '670px', width: '100%', marginTop: '10px' }}>
                    {isLoaded ? <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        onLoad={onLoad}
                        onUnmount={onUnmount}
                        onClick={placeClicked}
                    >
                    {markers.map((marker, index) => (
                        <Marker
                        key={index}
                        title={marker.title}
                        name={marker.name}
                        position={marker.position}
                        />
                    ))}
                    </GoogleMap> : ''}
                </div>
            </div>
        
);
}
