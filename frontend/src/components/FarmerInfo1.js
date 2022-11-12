import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.css';
import {register} from "../utils";
import {setAlert} from "../actions/app-actions";
import {useNavigate} from "react-router-dom";
import "../CSS/UserRegistration.css"
import { useDispatch } from "react-redux";
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-country-select/dist/react-bootstrap-country-select.css';
import {updateProfile} from "../utils";
import CountrySelect from 'react-bootstrap-country-select';
import axios from 'axios';

export default function FarmerInfo1() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const submitRegister = () => {
         // Make an API call
        updateProfile(dispatch, {
            name:name,
            phone:phone,
            address:address,
            city:city,
            state:state,
            country:country,
            zipcode:zipcode
        }, (err, success) => {
            if (success) {
                navigate("/FarmInfo1");
            } else {
                // Failure
                console.log('Saving profile info failed!');
            }
        });
    }
    const goBack = () => {
        navigate('/SelectRole');
    };
    const [zipcode, setZipcode] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");

    return (
        <div className="container main-frame">
            <div className="div1-drone-catalog">
                <h1 className='header-dronecatalog' style={{marginLeft:"100px"}}> Farmer Information</h1>

                <p className='heading-dronecatalog' style={{marginTop:"10px",marginLeft:"100px"}}>Fill in the data for your profile. It will only take a couple of minutes</p>
            </div>
            <div className='userDetails'>
                <Form><br/>
                    <p className="userInfo">Farmer Information</p>
                    <Form.Group className="UserDetails">
                        <Form.Label className='DroneDetails'>Name</Form.Label>
                        <Form.Control
                            type="text"
                            className='input_text'
                            aria-describedby="name"
                            onChange={(event) => {setName(event.target.value)}}
                        />
                    </Form.Group>
                    <Form.Group className="UserDetails">
                        <Form.Label className='DroneDetails'>Phone</Form.Label>
                        <Form.Control
                            type="text"
                            className='input_text'
                            aria-describedby="phone"
                            onChange={(event) => {setPhone(event.target.value)}}
                        />
                    </Form.Group>
                    <Form.Group className="UserDetails">
                        <Form.Label className='DroneDetails'>Address</Form.Label>
                        <Form.Control
                            type="text"
                            className='input_text'
                            aria-describedby="address"
                            onChange={(event) => {setAddress(event.target.value)}}
                        />
                    </Form.Group>
                    <Form.Group className="UserDetails">
                        <Form.Label className='DroneDetails'>City</Form.Label>
                        <Form.Control
                            type="text"
                            className='input_text'
                            aria-describedby="city"
                            onChange={(event) => {setCity(event.target.value)}}
                        />
                    </Form.Group>
                    <Form.Group className="UserDetails">
                        <Form.Label className='DroneDetails'>Country</Form.Label>
                        <Form.Select aria-label="Default select example" className='input_text' onChange={(event) => {setCountry(event.target.value)}}>
                            <option>Choose</option>
                            <option value="India">India</option>
                            <option value="United States">United States</option>
                            <option value="United Kingdom">United Kingdom</option>
                            <option value="South Africa">South Africa</option>
                        </Form.Select>
                        </Form.Group>
                        <Form.Group className="UserDetails">
                            <Form.Label className='DroneDetails'>State</Form.Label>
                            <Form.Select defaultValue="Choose..." className='input_text' onChange={(event) => {setState(event.target.value)}}>
                                <option>Choose</option>
                                <option value="California">California</option>
                                <option value="Arizona">Arizona</option>
                                <option value="Colorado">Colorado</option>
                                <option value="Texas">Texas</option>
                                <option value="Florida">Florida</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="UserDetails">
                            <Form.Label className='DroneDetails'>Zipcode</Form.Label>
                                <Form.Control
                                    type="text"
                                    className='input_text'
                                    aria-describedby="zipcode"
                                    onChange={(event) => {setZipcode(event.target.value)}}
                                    />
                        </Form.Group>
                        <button variant="secondary" className='dc-default btn btn-secondary m20' onClick={goBack}>Back</button>
                        <button variant="primary" className='dc-default btn btn-primary m20'
                                style={{float:"right",margin:"20px",}}
                                onClick={() => submitRegister()}>Next</button>
                </Form>
            </div>
        </div>
);
}
