import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {uploadImageToCloud} from "../utils";
import {setToast} from "../actions/app-actions";
import "../CSS/UserRegistration.css"
// import 'react-bootstrap-country-select/dist/react-bootstrap-country-select.css';
// import CountrySelect from 'react-bootstrap-country-select';

export function IDInfo() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const submitRegister = () => {
        console.log('ID details updated, click next')
        navigate('/UtilityBill');
    };
    const goBack = () => {
        navigate('/LandOwner');
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
                <h1 className='header-dronecatalog' style={{marginLeft:"100px"}}> Lets verify your identity</h1>

                <p className='heading-dronecatalog' style={{marginTop:"10px",marginLeft:"100px"}}>Please upload your driver's license.</p>
            </div>
            <div className='userDetails'>
                <Form>
                    <p className="userInfo">Driver's License</p>
                    <Form.Group className="UserDetails" controlId="name">
                        <Form.Label className='DroneDetails'>Name</Form.Label>
                        <Form.Control
                            type="text"
                            className='input_text'
                            aria-describedby="name"
                        />
                    </Form.Group>
                    <Form.Group className="UserDetails" controlId="licenseID">
                        <Form.Label className='DroneDetails'>License ID</Form.Label>
                        <Form.Control
                            type="text"
                            className='input_text'
                            aria-describedby="licenseID"
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