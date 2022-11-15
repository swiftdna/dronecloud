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

export function IDInfo({ formData, setFormData }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const submitRegister = () => {
    //     console.log('ID details updated, click next')
    //     navigate('/UtilityBill');
    // };
    // const goBack = () => {
    //     navigate('/landOwner');
    // };
    const uploadImage = async (e) => {
		e.preventDefault();
		const res = await uploadImageToCloud(e.target.files[0]);

		const {data: {secure_url}} = res;
		if (secure_url) {
				console.log("ID uploaded sucessfully - ", secure_url);
		};
        setFormData({ ...formData, licenseimg: secure_url })
    }
    return (
        <div>
            <h1 className='header-multistep'> Lets verify your identity</h1>
            <p className='heading-multistep'>Please upload your driver's license.</p>
            <div className='userDetails'>
                <Form>
                    <Form.Group className="UserDetails" controlId="name">
                        <Form.Label className='DroneDetails'>Name (as appeared on License)</Form.Label>
                        <Form.Control
                            type="text"
                            className='input_text'
                            aria-describedby="name"
                            value={formData.idname}
                            onChange={(event) =>
                              setFormData({ ...formData, idname: event.target.value })
                            }
                        />
                    </Form.Group>
                    <Form.Group className="UserDetails" controlId="licenseID">
                        <Form.Label className='DroneDetails'>License ID</Form.Label>
                        <Form.Control
                            type="text"
                            className='input_text'
                            aria-describedby="licenseID"
                            value={formData.licenseid}
                            onChange={(event) =>
                              setFormData({ ...formData, licenseid: event.target.value })
                            }
                        />
                    </Form.Group>
                    <Form.Group className="UserDetails" controlId="image">
                        <Form.Label className='DroneDetails' htmlFor="image">License upload:</Form.Label>
                        <Form.Control
                            type="file"
                            className='input_text'
                            id="image"
                            aria-describedby="image"
                            onChange={uploadImage}
                            // value={formData.licenseimg}
                        />
                    </Form.Group>

                </Form>
            </div>
        </div>
    );
}