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

export function BillingInfo({ formData, setFormData }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const submitRegister = () => {
    //     console.log('Billing information updated, click next to review registration')
    //     navigate('/ReviewRegistration');
    // };
    // const goBack = () => {
    //     navigate('/UtilityBill');
    // };
    return (
        <div >
                <h1 className='header-multistep' > Payment Information</h1>
                <p className='heading-multistep' >Please enter youur credit card details</p>
            <div className='userDetails'>
                <Form>
                    <Form.Group className="UserDetails" controlId="name">
                        <Form.Label className='DroneDetails'>Name on card</Form.Label>
                        <Form.Control
                            type="text"
                            className='input_text'
                            aria-describedby="name"
                            value={formData.cardname}
                            onChange={(event) =>
                              setFormData({ ...formData, cardname: event.target.value })
                            }/>
                    </Form.Group>
                    <Form.Group className="UserDetails" controlId="cardNumber">
                        <Form.Label className='DroneDetails'>Card Number</Form.Label>
                        <Form.Control
                            type="text"
                            className='input_text'
                            aria-describedby="cardNumber"
                            value={formData.cardnum}
                            onChange={(event) =>
                              setFormData({ ...formData, cardnum: event.target.value })
                            }/>
                    </Form.Group>
                    <Form.Group className="UserDetails" controlId="expirymon">
                        <Form.Label className='DroneDetails'>Expiry Month</Form.Label>
                        <Form.Control
                            type="text"
                            className='input_text'
                            aria-describedby="expiryMonth"
                            value={formData.expmonth}
                            onChange={(event) =>
                              setFormData({ ...formData, expmonth: event.target.value })
                            }/>
                    </Form.Group>
                    <Form.Group className="UserDetails" controlId="expiryyear">
                        <Form.Label className='DroneDetails'>Expiry Year</Form.Label>
                        <Form.Control
                            type="text"
                            className='input_text'
                            aria-describedby="expiryYear"
                            value={formData.expyear}
                            onChange={(event) =>
                              setFormData({ ...formData, expyear: event.target.value })
                            }/>
                    </Form.Group>
                    <Form.Group className="UserDetails" controlId="cvv">
                        <Form.Label className='DroneDetails'>CVV</Form.Label>
                        <Form.Control
                            type="password"
                            className='input_text'
                            aria-describedby="cvv"
                            value={formData.cvv}
                            onChange={(event) =>
                                setFormData({ ...formData, cvv: event.target.value })
                            }/>
                    </Form.Group>
                </Form>
            </div>
        </div>
    );
}