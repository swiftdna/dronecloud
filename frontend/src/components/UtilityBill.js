import React, {useState, useRef} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { uploadImageToCloud } from '../utils';
import { setToast } from '../actions/app-actions';

export function UtilityBill() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const submitRegister = () => {
        console.log('Utility details updated, click next')
        navigate('/BillingInfo');
    };
    const goBack = () => {
        navigate('/IDInfo');
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
        // <div><img src="Step4.png"width="300" height="50" /></div>
        <div className="container main-frame">
            <div className="div1-drone-catalog">
                <h1 className='header-dronecatalog' style={{marginLeft:"100px"}}> Lets verify your farm operation</h1>

                <p className='heading-dronecatalog' style={{marginTop:"10px",marginLeft:"100px"}}>Please submit a copy of your farm's utility bill.
                    This can be an electricity bill, or alternatively a water bill.</p>
            </div>
            <div className='userDetails'>
                <Form><br/>
                    <p className="userInfo">Farm Utility Bill</p>
                        <Form.Group className="UserDetails" controlId="agreementID">
                            <Form.Label className='DroneDetails'>Statement agreement ID</Form.Label>
                            <Form.Control
                                type="text"
                                className='input_text'
                                aria-describedby="agreementID"
                            />
                        </Form.Group>
                        <Form.Group className="UserDetails" controlId="billDate">
                            <Form.Label className='DroneDetails'>Date of bill statement</Form.Label>
                            <Form.Control
                                type="date"
                                className='input_text'
                                aria-describedby="billDate"
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