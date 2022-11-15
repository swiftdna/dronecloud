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
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';


export default function PilotInfo1({ formData, setFormData }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const submitRegister = () => {
    //     console.log('Pilot details updated, click next')
    //     navigate('/PilotCertificate');

    // };
    // const goBack = () => {
    //     navigate('/SelectRole');
    // };
    return (
        <div>
            <h1 className='header-multistep'> Pilot Information</h1>
            <p className='heading-multistep'>Fill in the data for your profile. It will only take a couple of minutes.</p>
            <div className='userDetails'>
                <Form>
                    <Form.Group className="UserDetails" controlId="name">
                        <Form.Label className='DroneDetails'>Full Name</Form.Label>
                        <Form.Control
                            type="text"
                            className='input_text'
                            aria-describedby="name"
                            value={formData.pilotname}
                            onChange={(event) =>
                              setFormData({ ...formData, pilotname: event.target.value })
                            }
                        />
                    </Form.Group>
                    <Form.Group className="UserDetails" controlId="phone">
                        <Form.Label className='DroneDetails'>Phone</Form.Label>
                        <Form.Control
                            type="text"
                            className='input_text'
                            aria-describedby="phone"
                            value={formData.phone}
                            onChange={(event) =>
                              setFormData({ ...formData, phone: event.target.value })
                            }
                        />
                    </Form.Group>
                    <Form.Group className="UserDetails" controlId="address">
                        <Form.Label className='DroneDetails'>Address</Form.Label>
                        <Form.Control
                            type="text"
                            className='input_text'
                            aria-describedby="address"
                            value={formData.pilotaddress}
                            onChange={(event) =>
                              setFormData({ ...formData, pilotaddress: event.target.value })
                            }
                        />
                    </Form.Group>
                    <Form.Group className="UserDetails" controlId="city">
                        <Form.Label className='DroneDetails'>City</Form.Label>
                        <Form.Control
                            type="text"
                            className='input_text'
                            aria-describedby="city"
                            value={formData.pilotcity}
                            onChange={(event) =>
                              setFormData({ ...formData, pilotcity: event.target.value })
                            }
                        />
                    </Form.Group>
                    <Form.Group className="UserDetails">
                        <CountryDropdown className="countryselect" value={formData.pilotcountry} onChange={(val) => setFormData({ ...formData, pilotcountry: val})}  />
                    </Form.Group>
                    <Form.Group className="UserDetails">                    
                        <RegionDropdown blankOptionLabel="Select Region" className="countryselect" country={formData.pilotcountry} value={formData.pilotstate} onChange={(val) => setFormData({ ...formData, pilotstate: val})} />
                    </Form.Group>
                    <Form.Group className="UserDetails" controlId="zipcode">
                        <Form.Label className='DroneDetails'>Zipcode</Form.Label>
                        <Form.Control type="text" aria-describedby="zipcode" className='input_text' 
                                value={formData.pilotzip}
                                onChange={(event) =>
                                    setFormData({ ...formData, pilotzip: event.target.value })
                                }
                            />
                    </Form.Group>

                </Form>
            </div>
        </div>
    );
}