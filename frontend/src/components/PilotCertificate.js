import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {uploadImageToCloud} from "../utils";
import {setToast} from "../actions/app-actions";
// import 'react-bootstrap-country-select/dist/react-bootstrap-country-select.css';
// import CountrySelect from 'react-bootstrap-country-select';

export function PilotCertificate() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const submitRegister = () => {
        console.log('Pilot certificate details updated, click next')
        navigate('/IDInfo');
    };
    const goBack = () => {
        navigate('/PilotInfo1');
    };
    const uploadImage = async (e) => {
        e.preventDefault();
        const res = await uploadImageToCloud(dispatch, e.target.files[0]);
        // console.log(res.data.secure_url);
        const {data: {secure_url}} = res;
        if (secure_url) {
            dispatch(setToast({
                type: 'success',
                message: 'User image uploaded successfully!'
            }));
        }
    }
    return (
        <div className="container main-frame">
            <div className="div1-drone-catalog">
                <h1 className='header-dronecatalog' style={{marginLeft:"100px"}}>Lets verify your pilot certification</h1>

                <p className='heading-dronecatalog' style={{marginTop:"10px",marginLeft:"100px"}}>Fill in more data regarding
                    your pilot certification</p>
            </div>
            <div className='userDetails'>
                <Form><br/>
                    {/*<img src="Step2.png"width="300" height="50" />*/}
                    <p className="userInfo">Remote Pilot Certificate</p>
                    <Form.Group className="UserDetails" controlId="idNumber">
                        <Form.Label className='DroneDetails'>Certificate ID number</Form.Label>
                        <Form.Control
                            type="text"
                            className='input_text'
                            aria-describedby="idNumber"
                        />
                    </Form.Group>
                    <Form.Group className="UserDetails" controlId="name">
                        <Form.Label className='DroneDetails'>Name of certificate holder</Form.Label>
                        <Form.Control
                            type="text"
                            className='input_text'
                            aria-describedby="name"
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
                    <Form.Group className="UserDetails" controlId="formGridState">
                        <Form.Label className='DroneDetails'>State</Form.Label>
                        <Form.Select defaultValue="Choose..." className='input_text'>
                            <option>Choose</option>
                            <option value="1">California</option>
                            <option value="2">Arizona</option>
                            <option value="3">Colorado</option>
                            <option value="4">Texas</option>
                            <option value="5">Florida</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="UserDetails" controlId="zipcode">
                        <Form.Label className='DroneDetails'>Zipcode</Form.Label>
                        <Form.Control
                            type="text"
                            className='input_text'
                            aria-describedby="zipcode"
                        />
                    </Form.Group>
                    <Form.Group className="UserDetails" controlId="image">
                        <Form.Label className='DroneDetails' htmlFor="image">File upload:</Form.Label>
                        <Form.Control
                            type="file"
                            className='input_text'
                            id="image"
                            aria-describedby="image"
                            onChange={uploadImage}
                        />
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