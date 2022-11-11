import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Form, Button} from 'react-bootstrap';
// import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {register} from "../utils";
import {setAlert} from "../actions/app-actions";
import '../App.css';

export default function FarmInfo1() {

    const navigate = useNavigate();
    const farmInfoMap = () => {
        console.log('Farmer details updated, click next')
        navigate('/FarmPlotInfo');

    };
    const goBack = () => {
        navigate('/FarmerInfo1');
    };
    return (
        <div className="container main-frame">
            <div className="div1-drone-catalog">
                <h1 className='header-dronecatalog' style={{marginLeft:"100px"}}> Farm Information</h1>

                <p className='heading-dronecatalog' style={{marginTop:"10px",marginLeft:"100px"}}>Fill in the data for your farm. It will only take a couple of minutes</p>
            </div>
            <div className='userDetails'>
                <Form><br/>
                  <p className="userInfo">Farm Address</p>
                     <Form.Group className="UserDetails" controlId="name">
                         <Form.Label className='DroneDetails'>Name</Form.Label>
                         <Form.Control type="text" aria-describedby="name" className='input_text'/>
                     </Form.Group>
                     <Form.Group className="UserDetails" controlId="address">
                         <Form.Label className='DroneDetails'>Address</Form.Label>
                         <Form.Control type="text" aria-describedby="address" className='input_text'/>
                     </Form.Group>
                     <Form.Group className="UserDetails" controlId="city">
                         <Form.Label className='DroneDetails'>City</Form.Label>
                         <Form.Control type="text" className='input_text' aria-describedby="city"/>
                     </Form.Group>
                    <Form.Group className="UserDetails" controlId="country">
                         <Form.Label className='DroneDetails'>Country</Form.Label>
                         <Form.Select aria-label="Default select example" className='input_text'>
                             <option>Choose</option>
                             <option value="1">India</option>
                             <option value="2">United States</option>
                             <option value="3">United Kingdom</option>
                             <option value="4">South Africa</option>
                         </Form.Select>
                     </Form.Group>
                     <Form.Group controlId="formGridState" className="UserDetails">
                         <Form.Label className='DroneDetails'>State</Form.Label>
                         <Form.Select defaultValue="Choose..." className='input_text'>
                             <option>Choose</option>
                             <option value="1">California</option>
                             <option value="2">Arizona</option>
                             <option value="3">Colorado</option>
                             <option value="4">Texas</option>
                             <option value="5">Florida</option>
                         </Form.Select>
                     </Form.Group>
                     <Form.Group className="mb-3" controlId="zipcode" className="UserDetails">
                         <Form.Label className='DroneDetails'>Zipcode</Form.Label>
                         <Form.Control type="text" className='input_text' aria-describedby="zipcode"/>
                     </Form.Group>
                    <button variant="secondary" className='dc-default btn btn-secondary m20' onClick={goBack}>Back</button>
                    <button variant="primary" className='dc-default btn btn-primary m20'
                                            style={{float:"right",margin:"20px",}}
                                            onClick={farmInfoMap}>Next</button>
             </Form>
            </div>
        </div>
    );
}