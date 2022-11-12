import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {uploadImageToCloud} from "../utils";
import {setToast} from "../actions/app-actions";

export function BillingInfo() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const submitRegister = () => {
        console.log('Billing information updated, click next to review registration')
        navigate('/ReviewRegistration');
    };
    const goBack = () => {
        navigate('/UtilityBill');
    };
    return (
        <div className="container main-frame">
            <div className="div1-drone-catalog">
                <h1 className='header-dronecatalog' style={{marginLeft:"100px"}}> Billing Information</h1>

                <p className='heading-dronecatalog' style={{marginTop:"10px",marginLeft:"100px"}}>Fill in billing information
                    for your profile.</p>
            </div>
            <div className='userDetails'>
                <Form><br/>
                    {/*<img src="Step5.png"width="300" height="50" /><br/><br/>*/}
                    <p className="userInfo">Credit Card Details</p>
                    {/*add radio buttons for wallet and paypal*/}
                    <Form.Group className="UserDetails" controlId="name">
                        <Form.Label className='DroneDetails'>Name on card</Form.Label>
                        <Form.Control
                            type="text"
                            className='input_text'
                            aria-describedby="name"/>
                    </Form.Group>
                    <Form.Group className="UserDetails" controlId="cardNumber">
                        <Form.Label className='DroneDetails'>Card Number</Form.Label>
                        <Form.Control
                            type="text"
                            className='input_text'
                            aria-describedby="cardNumber"/>
                    </Form.Group>
                        <Form.Group className="UserDetails" controlId="expiry">
                            <Form.Label className='DroneDetails'>Expiration Date</Form.Label>
                            <Form.Control
                                type="date"
                                className='input_text'
                                aria-describedby="expiry"/>
                        </Form.Group>
                        <Form.Group className="UserDetails" controlId="cvv">
                            <Form.Label className='DroneDetails'>CVV</Form.Label>
                            <Form.Control
                                type="password"
                                className='input_text'
                                aria-describedby="cvv"/>
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