import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {register} from "../utils";
import {setAlert} from "../actions/app-actions";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import '../App.css';
// import 'react-bootstrap-country-select/dist/react-bootstrap-country-select.css';
// import CountrySelect from 'react-bootstrap-country-select';

export default function PilotInfo1() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const submitRegister = () => {
        console.log('Pilot details updated, click next')
        navigate('/PilotCertificate');

    };
    const goBack = () => {
        navigate('/SelectRole');
    };
    return (
        <div className="container main-frame">
            <div className="div1-drone-catalog">
                <h1 className='header-dronecatalog' style={{marginLeft:"100px"}}> Pilot Information</h1>

                <p className='heading-dronecatalog' style={{marginTop:"10px",marginLeft:"100px"}}>Fill in the data for your profile,
                    It will only take a couple of minutes</p>
            </div>
            <div className='userDetails'>
                <Form><br/>
                    {/*<img src="Step1.png"width="300" height="50" />*/}
                    <Form.Group className="UserDetails" controlId="name">
                        <Form.Label className='DroneDetails'>Name</Form.Label>
                        <Form.Control
                            type="text"
                            className='input_text'
                            aria-describedby="name"
                        />
                    </Form.Group>
                    <Form.Group className="UserDetails" controlId="phone">
                        <Form.Label className='DroneDetails'>Phone</Form.Label>
                        <Form.Control
                            type="text"
                            className='input_text'
                            aria-describedby="phone"
                        />
                    </Form.Group>
                    <Form.Group className="UserDetails" controlId="address">
                        <Form.Label className='DroneDetails'>Address</Form.Label>
                        <Form.Control
                            type="text"
                            className='input_text'
                            aria-describedby="address"
                        />
                    </Form.Group>
                    <Form.Group className="UserDetails" controlId="city">
                        <Form.Label className='DroneDetails'>City</Form.Label>
                        <Form.Control
                            type="text"
                            className='input_text'
                            aria-describedby="city"
                        />
                    </Form.Group>
                    <Form.Group className="UserDetails" controlId="country">
                        <Form.Label className='DroneDetails'>Country</Form.Label>
                        <Form.Select aria-label="Default select example" className='input_text'>
                            <option>Choose</option>
                            <option value="1">India</option>
                            <option value="2">United States</option>
                            <option value="3">United Kingdom</option>
                            <option value="4">South Africa</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group controlId="formGridState" className="UserDetails">
                        <Form.Label className='DroneDetails'>State</Form.Label>
                        <Form.Select defaultValue="Choose..." className='input_text'>
                            <option value="1">Choose</option>
                            <option value="2">California</option>
                            <option value="3">Arizona</option>
                            <option value="4">Colorado</option>
                            <option value="5">Texas</option>
                            <option value="6">Florida</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="UserDetails" controlId="zipcode">
                        <Form.Label className='DroneDetails'>Zipcode</Form.Label>
                        <Form.Control type="text" aria-describedby="zipcode" className='input_text'/>
                    </Form.Group>
                    <button variant="secondary" className='dc-default btn btn-secondary m20' onClick={goBack}>Back</button>
                    <button variant="primary" className='dc-default btn btn-primary m20'
                            style={{float:"right",margin:"20px",}}
                            onClick={submitRegister}>Next</button>
                </Form>
            </div>
        </div>
    );
}