import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Form, Button} from 'react-bootstrap';
// import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {addFarm} from "../utils";
import {setAlert} from "../actions/app-actions";
import '../App.css';

export default function FarmInfo1() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [zipcode, setZipcode] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");

    const farmInfoMap = () => {
        const input_data = {
            name,
            address,
            city,
            state,
            country,
            zipcode
        };
        console.log('input_data -> ', input_data);
        addFarm(dispatch, input_data, (err, successFlag) => {
            if(successFlag) {
                navigate('/FarmPlotInfo');
            } else {
                console.log("something wrong with the add farm");
            }
        })
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
            <div className="userDetails">
                <Form><br/>
                  <p className="userInfo">Farm Address</p>
                    <Form.Group className="FarmDetails">
                        <Form.Label className='DroneDetails'>Name</Form.Label>
                        <Form.Control
                            type="text"
                            className='input_text'
                            aria-describedby="name"
                            onChange={(event) => {setName(event.target.value)}}
                        />
                    </Form.Group>
                    <Form.Group className="FarmDetails">
                        <Form.Label className='DroneDetails'>Address</Form.Label>
                        <Form.Control
                            type="text"
                            className='input_text'
                            aria-describedby="address"
                            onChange={(event) => {setAddress(event.target.value)}}
                        />
                    </Form.Group>
                    <Form.Group className="FarmDetails">
                        <Form.Label className='DroneDetails'>City</Form.Label>
                        <Form.Control
                            type="text"
                            className='input_text'
                            aria-describedby="city"
                            onChange={(event) => {setCity(event.target.value)}}
                        />
                    </Form.Group>
                    <Form.Group className="FarmDetails">
                        <Form.Label className='DroneDetails'>Country</Form.Label>
                        <Form.Select aria-label="Default select example" className='input_text' onChange={(event) => {setCountry(event.target.value)}}>
                            <option>Choose</option>
                            <option value="India">India</option>
                            <option value="United States">United States</option>
                            <option value="United Kingdom">United Kingdom</option>
                            <option value="South Africa">South Africa</option>
                        </Form.Select>
                        </Form.Group>
                        <Form.Group className="FarmDetails">
                            <Form.Label className='DroneDetails'>State</Form.Label>
                            <Form.Select defaultValue="Choose..." className='input_text' onChange={(event) => {setState(event.target.value)}}>
                                <option>Choose</option>
                                <option value="California">California</option>
                                <option value="Arizona">Arizona</option>
                                <option value="Colorado">Colorado</option>
                                <option value="Texas">Texas</option>
                                <option value="Florida">Florida</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="FarmDetails">
                            <Form.Label className='DroneDetails'>Zipcode</Form.Label>
                                <Form.Control
                                    type="text"
                                    className='input_text'
                                    aria-describedby="zipcode"
                                    onChange={(event) => {setZipcode(event.target.value)}}
                                    />
                        </Form.Group>
             </Form>
            <button variant="secondary" className='dc-default btn btn-secondary m20' onClick={() => goBack()}>Back</button>
            <button variant="primary" className='dc-default btn btn-primary m20'
                                    style={{float:"right",margin:"20px",}}
                                    onClick={() => farmInfoMap()}>Next</button>
            </div>
        </div>
    );
}