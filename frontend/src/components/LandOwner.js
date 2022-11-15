import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {uploadImageToCloud} from "../utils";
import {setToast} from "../actions/app-actions";

import {farmOwnerInfo} from "../utils";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import 'react-bootstrap-country-select/dist/react-bootstrap-country-select.css';
// import CountrySelect from 'react-bootstrap-country-select';

export function LandOwner({ formData, setFormData }){
    const dispatch = useDispatch();

    const navigate = useNavigate();
    // const submitRegister = () => {
    //     // Make an API call
    //     farmOwnerInfo(dispatch, {
    //         ownername,
    //        area,
    //        issuedate,
    //        status: 'complete'
    //    }, (err, success) => {
    //        if (success) {
    //            navigate("/IDInfo");
    //        } else {
    //            // Failure
    //            console.log('Saving land certification failed!');
    //        }
    //    });
    // }
    // const goBack = () => {
    //     navigate('/FarmInfo');
    // };

    // const [ownername, setOwnerName] = useState("");
    // const [area, setArea] = useState("");
    // const [issuedate, setIssueDate] = useState("");


    const uploadImage = async (e) => {
		e.preventDefault();
		const res = await uploadImageToCloud(e.target.files[0]);

		const {data: {secure_url}} = res;
		if (secure_url) {
				console.log("image uploaded sucessfully - ", secure_url);
		};
        setFormData({ ...formData, landcert: secure_url })
    }
    return (
                <div>
                    <h1 className='header-multistep'> Lets verify your farm</h1>
                    <p className='heading-multistep'>Fill in the data regarding your farm certification</p>
                    <div className='userDetails'>
                        <Form>
                            <Form.Group className="UserDetails" controlId="name">
                                <Form.Label className='DroneDetails'>Name of Land Owner</Form.Label>
                                <Form.Control
                                    type="text"
                                    className='input_text'
                                    aria-describedby="name"
                                    value={formData.ownername}
                                    onChange={(event) =>
                                      setFormData({ ...formData, ownername: event.target.value })
                                    }
                                />
                            </Form.Group>
                                <Form.Group className="UserDetails" controlId="totalArea">
                                    <Form.Label className='DroneDetails'>Total Area(square feet)</Form.Label>
                                    <Form.Control
                                        type="text"
                                        className='input_text'
                                        aria-describedby="area"
                                        value={formData.area}
                                        onChange={(event) =>
                                          setFormData({ ...formData, area: event.target.value })
                                        }
                                    />
                                </Form.Group>
                                <Form.Group className="UserDetails" controlId="certificateIssueDate">
                                    <Form.Label className='DroneDetails'>Date of certificate issue</Form.Label>
                                    <Form.Control
                                        type="date"
                                        className='input_text'
                                        aria-describedby="certificateIssueDate"
                                        value={formData.issuedate}
                                        onChange={(event) =>
                                          setFormData({ ...formData, issuedate: event.target.value })
                                        }
                                    />
                                </Form.Group>
                            <Form.Group className="UserDetails" controlId="image">
                                <Form.Label htmlFor="image" className='DroneDetails'>Cert upload:</Form.Label>
                                <Form.Control
                                    type="file"
                                    className='input_text'
                                    id="image"
                                    aria-describedby="image"
                                    // value={formData.landcert}
                                    onChange={uploadImage}
                                />
                            </Form.Group>
                        </Form>
                    </div>
                </div>
    );
}