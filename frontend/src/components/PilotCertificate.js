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

export function PilotCertificate({ formData, setFormData }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const submitRegister = () => {
    //     console.log('Pilot certificate details updated, click next')
    //     navigate('/IDInfo');
    // };
    // const goBack = () => {
    //     navigate('/PilotInfo1');
    // };

    const uploadImage = async (e) => {
		e.preventDefault();
		const res = await uploadImageToCloud(e.target.files[0]);

		const {data: {secure_url}} = res;
		if (secure_url) {
				console.log("image uploaded sucessfully - ", secure_url);
		};
        setFormData({ ...formData, pilotcerturl: secure_url })
    }

    return (
        <div>
            <h1 className='header-multistep'>Lets verify your pilot certification</h1>
            <p className='heading-multistep'>Fill in more data regarding
                your pilot certification</p>
            <div className='userDetails'>
                <Form>
                    <Form.Group className="UserDetails" controlId="idNumber">
                        <Form.Label className='DroneDetails'>Certificate ID number</Form.Label>
                        <Form.Control
                            type="text"
                            className='input_text'
                            aria-describedby="idNumber"
                            value={formData.pilotcertid}
                            onChange={(event) =>
                              setFormData({ ...formData, pilotcertid: event.target.value })
                            }
                        />
                    </Form.Group>
                    <Form.Group className="UserDetails" controlId="name">
                        <Form.Label className='DroneDetails'>Name (as appeared on Pilot Certificate)</Form.Label>
                        <Form.Control
                            type="text"
                            className='input_text'
                            aria-describedby="name"
                            value={formData.pilotcertname}
                            onChange={(event) =>
                              setFormData({ ...formData, pilotcertname: event.target.value })
                            }
                        />
                    </Form.Group>
                    <Form.Group className="UserDetails" controlId="certExpDate">
                                    <Form.Label className='DroneDetails'>Certificate Expiry Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        className='input_text'
                                        aria-describedby="certificateIssueDate"
                                        value={formData.pilotcertexp}
                                        onChange={(event) =>
                                          setFormData({ ...formData, pilotcertexp: event.target.value })
                                        }
                                    />
                                </Form.Group>
                    <Form.Group className="UserDetails" controlId="image">
                        <Form.Label className='DroneDetails' htmlFor="image">Cert upload:</Form.Label>
                        <Form.Control
                            type="file"
                            className='input_text'
                            id="image"
                            aria-describedby="image"
                            onChange={uploadImage}
                        />
                    </Form.Group>

                </Form>
            </div>
        </div>
    );
}