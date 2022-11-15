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

export function UtilityBill({ formData, setFormData }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const submitRegister = () => {
    //     console.log('Utility details updated, click next')
    //     navigate('/BillingInfo');
    // };
    // const goBack = () => {
    //     navigate('/IDInfo');
    // };

    const uploadImage = async (e) => {
		e.preventDefault();
		const res = await uploadImageToCloud(e.target.files[0]);

		const {data: {secure_url}} = res;
		if (secure_url) {
				console.log("Utility file uploaded sucessfully - ", secure_url);
		};
        setFormData({ ...formData, utilityfile: secure_url })
    }
    return (
        <div>
            <h1 className='header-multistep'> Lets verify your farm operation</h1>
            <p className='heading-multistep'>Please submit a copy of your farm's utility bill. This can be an electricity bill, or alternatively a water bill.</p>
            <div className='userDetails'>
                <Form>
                        <Form.Group className="UserDetails" controlId="agreementID">
                            <Form.Label className='DroneDetails'>Statement agreement ID</Form.Label>
                            <Form.Control
                                type="text"
                                className='input_text'
                                aria-describedby="agreementID"
                                value={formData.billid}
                                onChange={(event) =>
                                  setFormData({ ...formData, billid: event.target.value })
                                }
                            />
                        </Form.Group>
                        <Form.Group className="UserDetails" controlId="billDate">
                            <Form.Label className='DroneDetails'>Date of bill statement</Form.Label>
                            <Form.Control
                                type="date"
                                className='input_text'
                                aria-describedby="billDate"
                                value={formData.utilitybilldate}
                                onChange={(event) =>
                                  setFormData({ ...formData, utilitybilldate: event.target.value })
                                }
                            />
                        </Form.Group>
                        <Form.Group className="UserDetails" controlId="image">
                            <Form.Label className='DroneDetails' htmlFor="image">File upload:</Form.Label>
                            <Form.Control
                                type="file"
                                className='input_text'
                                id="image"
                                aria-describedby="image"
                                // value={formData.utilityfile}
                                onChange={uploadImage}
                            />
                        </Form.Group>
                </Form>
            </div>

        </div>
    );
}