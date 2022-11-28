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
import { GoogleMap, useJsApiLoader, DrawingManager } from '@react-google-maps/api';

const libraries = ["drawing", "places", "geometry"];

export default function LandInfo({ formData, setFormData }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");
    const [address, setAddress] = useState("");
    const [map, setMap] = React.useState(null);
    const [markers, setMarkers] = useState([]);
    const [addFarmView, setAddFarmView] = useState(false);


    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyDAY3yhqc24s5SpDcxRXTnObJXbQTBwtV4",
        libraries
    });

    const containerStyle = {
        width: '100%',
        height: '690px'
    };

    const center = {
        lat: formData.lat,
        lng: formData.lng
    };

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map)
    }, []);

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, []);

    const confirm = () => {
        // console.log(lat, lng, address);
        // formData.lat = lat;
        // formData.lng = lng;
        // formData.farmaddress = address;
        setAddFarmView(false);
        setFormData({ ...formData, addFarmView: false })
        console.log(formData.plotlatlong)
        console.log(formData.plotlatlong[0].lat())
    }

    const setFarm = () => {
        setAddFarmView(true)
        setFormData({ ...formData, addFarmView: true })
       
    }

    const onPolygonComplete = polygon => {
   
        const vertices = polygon.getPath();

        formData.plotlatlong = [];
        
        
        for (let i = 0; i < vertices.getLength(); i++) {
            const xy = vertices.getAt(i);
            formData.plotlatlong.push(xy);
          }

        vertices.addListener("insert_at", () => {  
            formData.plotlatlong = [];      
            for (let i = 0; i < vertices.getLength(); i++) {
                const xy = vertices.getAt(i);
                formData.plotlatlong.push(xy);
              }
        });
        vertices.addListener("set_at", () => {  
            formData.plotlatlong = [];      
            for (let i = 0; i < vertices.getLength(); i++) {
                const xy = vertices.getAt(i);
                formData.plotlatlong.push(xy);
              }
        });
        vertices.addListener("remove_at", () => {  
            formData.plotlatlong = [];      
            for (let i = 0; i < vertices.getLength(); i++) {
                const xy = vertices.getAt(i);
                formData.plotlatlong.push(xy);
              }
        });
      }

      




    const onDrawingLoad = drawingManager => {
    console.log(drawingManager)
    drawingManager.setOptions({drawingControlOptions: {drawingModes: [window.google.maps.drawing.OverlayType.POLYGON]}, 
                                polygonOptions: {editable: true, strokeColor: '#000000', fillColor:'#e6e600'}} );
    }

    return (
            !addFarmView ? 
            <div>
                <h1 className='header-multistep'> Land Information</h1>
                <p className='heading-multistep'>Locate your farm plot</p>
                <div className='userDetails'>
                    <Form>
                        <Form.Group className="UserDetails">
                            <Form.Label className='DroneDetails'> Plot Name</Form.Label>
                            <Form.Control
                                type="text"
                                className='input_text'
                                aria-describedby="name"
                                value={formData.plotname}
                                onChange={(event) =>
                                setFormData({ ...formData, plotname: event.target.value })
                                }
                            />
                        </Form.Group>
                        <Form.Group className="UserDetails">
                            <Form.Label className='DroneDetails'>Choose Plot Type</Form.Label>
                            <Form.Select aria-label="Default select example" className='input_text' value={formData.plottype} onChange={(event) => setFormData({ ...formData, plottype: event.target.value })}>
                                <option>Choose...</option>
                                <option value="stock">Livestock</option>
                                <option value="crop">Crop</option>
                                <option value="fruit">Fruit</option>
                                <option value="nursery">Nursery</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="UserDetails">
                            <br></br>
                            <button className='btn_panel' onClick={() => setFarm()}>Locate Plot</button>
                        </Form.Group>
                    </Form>
                </div>
            </div> : 
            <div className="farm_add_menu">
                <h4>Locate Farm<span>
                    <button className='btn_panel' onClick={() => confirm()} style={{float:"right"}}>Confirm</button> </span></h4>
                <div style={{ height: '670px', width: '100%', marginTop: '40px' }}>
                    {isLoaded ? <GoogleMap
                        mapContainerStyle={containerStyle}
                        mapTypeId={'satellite'}
                        center={center}
                        onLoad={onLoad}
                        onUnmount={onUnmount}
                        
                    >
                    <DrawingManager
                        onLoad={onDrawingLoad}
                        onPolygonComplete={onPolygonComplete}
                        
                    />
                    </GoogleMap> : ''}
                </div>
            </div>
        
);
}
