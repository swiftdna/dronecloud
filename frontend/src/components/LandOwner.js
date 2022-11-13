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

export function LandOwner(){
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const submitRegister = () => {
        // Make an API call
        farmOwnerInfo(dispatch, {
            ownername,
           area,
           issuedate,
           status: 'complete'
       }, (err, success) => {
           if (success) {
               navigate("/IDInfo");
           } else {
               // Failure
               console.log('Saving land certification failed!');
           }
       });
    }
    const goBack = () => {
        navigate('/FarmInfo');
    };
    const [ownername, setOwnerName] = useState("");
    const [area, setArea] = useState("");
    const [issuedate, setIssueDate] = useState("");
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
                <div className="container main-frame">
                    <div className="div1-drone-catalog">
                        <h1 className='header-dronecatalog' style={{marginLeft:"100px"}}> Lets verify your farm</h1>

                        <p className='heading-dronecatalog' style={{marginTop:"10px",marginLeft:"100px"}}>Fill in the data regarding your farm certification</p>
                    </div>
                    <div className='userDetails'>
                        <Form><br/>
                            {/*<img src="Step4.png"width="300" height="50" />*/}
                            <p className="userInfo">Land owner certification</p>
                            <Form.Group className="UserDetails" controlId="name">
                                <Form.Label className='DroneDetails'>Name of Land Owner</Form.Label>
                                <Form.Control
                                    type="text"
                                    className='input_text'
                                    aria-describedby="name"
                                    onChange={(event) => {setOwnerName(event.target.value)}}
                                />
                            </Form.Group>
                                <Form.Group className="UserDetails" controlId="totalArea">
                                    <Form.Label className='DroneDetails'>Total Area(square feet)</Form.Label>
                                    <Form.Control
                                        type="text"
                                        className='input_text'
                                        aria-describedby="area"
                                        onChange={(event) => {setArea(event.target.value)}}
                                    />
                                </Form.Group>
                                <Form.Group className="UserDetails" controlId="certificateIssueDate">
                                    <Form.Label className='DroneDetails'>Date of certificate issue</Form.Label>
                                    <Form.Control
                                        type="date"
                                        className='input_text'
                                        aria-describedby="certificateIssueDate"
                                        onChange={(event) => {setIssueDate(event.target.value)}}
                                    />
                                </Form.Group>
                            <Form.Group className="UserDetails" controlId="image">
                                <Form.Label htmlFor="image" className='DroneDetails'>File upload:</Form.Label>
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