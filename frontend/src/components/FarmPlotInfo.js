import React, {useState} from 'react';
import {Form, Button} from 'react-bootstrap';
import {useNavigate} from "react-router-dom";
import {register} from "../utils";
import {setAlert} from "../actions/app-actions";
import "../CSS/UserRegistration.css"

export default function FarmPlotInfo() {

    const navigate=useNavigate()
    const landOwner=()=>{
        navigate("/landOwner")
    }
    const goBack = () => {
        navigate('/FarmInfo');
    };
    return (

        <div className="container main-frame">
            <div className="div1-drone-catalog">
                <h1 className='header-dronecatalog' style={{marginLeft:"100px"}}> Farm information</h1>

                <p className='heading-dronecatalog' style={{marginTop:"10px",marginLeft:"100px"}}>Fill in the data about your farm</p>
            </div>
            <div>

                <div className='userDetails'>
                    <p className='UserDetails'>Farm plots</p>
                    <Form>
                        <Form.Label className='DroneDetails'>Plot type</Form.Label>
                        {['checkbox'].map((type) => (
                            <div key={`reverse-${type}`} className='input_text'>
                                <Form.Check reverse label="Livestock" name="group1" type={type} id={`reverse-${type}-1`} />
                                <Form.Check reverse label="Crops" name="group1" type={type} id={`reverse-${type}-1`}/>
                                <Form.Check reverse label="Fruit" name="group1" type={type} id={`reverse-${type}-1`} />
                                <Form.Check reverse label="Nursery" name="group1" type={type} id={`reverse-${type}-1`}/>
                                <br/>
                                <div className="card add-new" style={{height: "150px", width: "300px", marginLeft: "20px"}} onClick={FarmPlotInfo}>
                                    <h4>Add another Plot</h4>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor"
                                         className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                                        <path
                                            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
                                    </svg>
                                    <div className="card-body">
                                        {/* <Link to={`/`} className="btn btn-success btn-sm" style={{borderRadius:"10px" , float:"right"}}>edit</Link> */}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Form>
                    <br/><br/>
                    <button variant="secondary" className='dc-default btn btn-secondary m20' onClick={goBack}>Back</button>
                    <button variant="primary" className='dc-default btn btn-primary m20'
                            style={{float:"right",margin:"20px",}}
                            onClick={landOwner}>Next</button>
                </div>
            </div>
        </div>

    );
}