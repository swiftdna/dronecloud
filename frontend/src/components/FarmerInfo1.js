import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.css';
import {register} from "../utils";
import {setAlert} from "../actions/app-actions";
import {useNavigate} from "react-router-dom";
import "../CSS/UserRegistration.css"
import { useDispatch } from "react-redux";
import {updateProfile} from "../utils";
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';



export default function FarmerInfo1({ formData, setFormData }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const submitRegister = () => {
    //      // Make an API call
    //     updateProfile(dispatch, {
    //         name,
    //         phone,
    //         address,
    //         city,
    //         state,
    //         country,
    //         zipcode,
    //         status: ''
    //     }, (err, success) => {
    //         if (success) {
    //             navigate("/FarmInfo");
    //         } else {
    //             // Failure
    //             console.log('Saving profile info failed!');
    //         }
    //     });
    // }


    // const goBack = () => {
    //     navigate('/SelectRole');
    // };


    // const [zipcode, setZipcode] = useState("");
    // const [name, setName] = useState("");
    // const [phone, setPhone] = useState("");
    // const [address, setAddress] = useState("");
    // const [city, setCity] = useState("");
    // const [state, setState] = useState("");
    // const [country, setCountry] = useState("");


    return (
        <div>      
            <h1 className='header-multistep'> Farmer Information</h1>
            <p className='heading-multistep'>Fill in the data for your profile. It will only take a couple of minutes.</p>
            <div className='userDetails'>
                <Form>
                    <Form.Group className="UserDetails">
                        <Form.Label className='DroneDetails'>Full Name</Form.Label>
                        <Form.Control
                            type="text"
                            className='input_text'
                            aria-describedby="name"
                            value={formData.fullName}
                            onChange={(event) =>
                              setFormData({ ...formData, fullName: event.target.value })
                            }
                        />
                    </Form.Group>
                    <Form.Group className="UserDetails">
                        <Form.Label className='DroneDetails'>Phone</Form.Label>
                        <Form.Control
                            type="text"
                            className='input_text'
                            aria-describedby="phone"
                            value={formData.phonenumber}
                            onChange={(event) =>
                              setFormData({ ...formData, phonenumber: event.target.value })
                            }
                        />
                    </Form.Group>
                    <Form.Group className="UserDetails">
                        <Form.Label className='DroneDetails'>Address</Form.Label>
                        <Form.Control
                            type="text"
                            className='input_text'
                            aria-describedby="address"
                            value={formData.address}
                            onChange={(event) =>
                              setFormData({ ...formData, address: event.target.value })
                            }
                        />
                    </Form.Group>
                    <Form.Group className="UserDetails">
                        <Form.Label className='DroneDetails'>City</Form.Label>
                        <Form.Control
                            type="text"
                            className='input_text'
                            aria-describedby="city"
                            value={formData.city}
                            onChange={(event) =>
                              setFormData({ ...formData, city: event.target.value })
                            }
                        />
                    </Form.Group>
                    <Form.Group className="UserDetails">
                        <CountryDropdown className="countryselect" value={formData.country} onChange={(val) => setFormData({ ...formData, country: val})}  />
                    </Form.Group>
                    <Form.Group className="UserDetails">                    
                        <RegionDropdown blankOptionLabel="Select Region" className="countryselect" country={formData.country} value={formData.state} onChange={(val) => setFormData({ ...formData, state: val})} />
                    </Form.Group>
                    <Form.Group className="UserDetails">
                        <Form.Label className='DroneDetails'>Zipcode</Form.Label>
                            <Form.Control
                                type="text"
                                className='input_text'
                                aria-describedby="zipcode"
                                value={formData.zipcode}
                                onChange={(event) =>
                                    setFormData({ ...formData, zipcode: event.target.value })
                                }
                                />
                    </Form.Group>
                </Form>
            </div>
        </div>
);
}
