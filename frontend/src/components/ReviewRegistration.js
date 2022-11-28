import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {setToast} from "../actions/app-actions";
import { Card } from "react-bootstrap";

export function ReviewRegistration({ formData, setFormData }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <div>
            <h1 className='header-multistep' > Review Registration Details</h1>
            <p className='heading-multistep' >Please review your registration details and submit</p>
            { (formData.role === 'farmer')?
                <Card style={{ marginTop: 30, textAlign: "left" }}>
                    <Card.Body>
                        <div className='reviewcard'>
                            <h4>Farmer Details:</h4>
                        </div>
                        <p>
                            <strong>&nbsp;&nbsp;&nbsp;Full Name :</strong> {formData.fullName}{" "}
                        </p>
                        <p>
                            <strong>&nbsp;&nbsp;&nbsp;Phone :</strong> {formData.phonenumber}{" "}
                        </p>
                        <p>
                            <strong>&nbsp;&nbsp;&nbsp;Address :</strong> {formData.address}{" "}
                        </p>
                        <p>
                            <strong>&nbsp;&nbsp;&nbsp;City :</strong> {formData.city}{" "}
                        </p>
                        <p>
                            <strong>&nbsp;&nbsp;&nbsp;State :</strong> {formData.state}{" "}
                        </p>
                        <p>
                            <strong>&nbsp;&nbsp;&nbsp;Country :</strong> {formData.country}{" "}
                        </p>
                        <p>
                            <strong>&nbsp;&nbsp;&nbsp;Zipcode :</strong> {formData.zipcode}{" "}
                        </p>
                        <div className='reviewcard'>
                            <h4>Farm Details:</h4>
                        </div>
                        <p>
                            <strong>&nbsp;&nbsp;&nbsp;Farm Name :</strong> {formData.farmname}{" "}
                        </p>
                        <p>
                            <strong>&nbsp;&nbsp;&nbsp;Farm Address :</strong> {formData.farmaddress}{" "}
                        </p>
                        <p>
                            <strong>&nbsp;&nbsp;&nbsp;Plot type :</strong> {formData.farmtype}{" "}
                        </p>
                        <div className='reviewcard'>
                            <h4>Land Details:</h4>
                        </div>
                        <p>
                            <strong>&nbsp;&nbsp;&nbsp;Land Owner Name :</strong> {formData.ownername}{" "}
                        </p>
                        <p>
                            <strong>&nbsp;&nbsp;&nbsp;Land Area in Sq ft :</strong> {formData.area}{" "}
                        </p>
                        <p>
                            <strong>&nbsp;&nbsp;&nbsp;Land Certificate Issue Date :</strong> {formData.issuedate}{" "}
                        </p>
                        <p>
                            <strong>&nbsp;&nbsp;&nbsp;Land certificate URL :</strong> {formData.landcert}{" "}
                        </p>
                        <div className='reviewcard'>
                            <h4>ID Information:</h4>
                        </div>
                        <p>
                            <strong>&nbsp;&nbsp;&nbsp;Name as appeared on ID :</strong> {formData.idname}{" "}
                        </p>
                        <p>
                            <strong>&nbsp;&nbsp;&nbsp;ID number :</strong> {formData.licenseid}{" "}
                        </p>
                        <p>
                            <strong>&nbsp;&nbsp;&nbsp;ID image URL :</strong> {formData.licenseimg}{" "}
                        </p>
                        <div className='reviewcard'>
                            <h4>Utility Bill Details:</h4>
                        </div>
                        <p>
                            <strong>&nbsp;&nbsp;&nbsp;Utility Bill ID :</strong> {formData.billid}{" "}
                        </p>
                        <p>
                            <strong>&nbsp;&nbsp;&nbsp;Bill date :</strong> {formData.utilitybilldate}{" "}
                        </p>
                        <p>
                            <strong>&nbsp;&nbsp;&nbsp;Bill URL :</strong> {formData.utilityfile}{" "}
                        </p>
                        <div className='reviewcard'>
                            <h4>Payment Information:</h4>
                        </div>
                        <p>
                            <strong>&nbsp;&nbsp;&nbsp;Credit card Name :</strong> {formData.cardname}{" "}
                        </p>
                        <p>
                            <strong>&nbsp;&nbsp;&nbsp;Card nmber :</strong> {formData.cardnum}{" "}
                        </p>
                        <p>
                            <strong>&nbsp;&nbsp;&nbsp;Expiry Date :</strong> {formData.expdate}{" "}
                        </p>
                        <p>
                            <strong>&nbsp;&nbsp;&nbsp;CVV :</strong> {formData.cvv}{" "}
                        </p>
                    </Card.Body>
                </Card> :
                <Card style={{ marginTop: 30, textAlign: "left" }}>
                    <Card.Body>
                        <div className='reviewcard'>
                            <h4>Pilot Details:</h4>
                        </div>
                        <p>
                            <strong>&nbsp;&nbsp;&nbsp;Full Name :</strong> {formData.pilotname}{" "}
                        </p>
                        <p>
                            <strong>&nbsp;&nbsp;&nbsp;Phone :</strong> {formData.phone}{" "}
                        </p>
                        <p>
                            <strong>&nbsp;&nbsp;&nbsp;Address :</strong> {formData.pilotaddress}{" "}
                        </p>
                        <p>
                            <strong>&nbsp;&nbsp;&nbsp;City :</strong> {formData.pilotcity}{" "}
                        </p>
                        <p>
                            <strong>&nbsp;&nbsp;&nbsp;State :</strong> {formData.pilotstate}{" "}
                        </p>
                        <p>
                            <strong>&nbsp;&nbsp;&nbsp;Country :</strong> {formData.pilotcountry}{" "}
                        </p>
                        <p>
                            <strong>&nbsp;&nbsp;&nbsp;Zipcode :</strong> {formData.pilotzip}{" "}
                        </p>
                        <div className='reviewcard'>
                            <h4>Pilot Certificate Details:</h4>
                        </div>
                        <p>
                            <strong>&nbsp;&nbsp;&nbsp;Certificate ID :</strong> {formData.pilotcertid}{" "}
                        </p>
                        <p>
                            <strong>&nbsp;&nbsp;&nbsp;Name as appeared on Certificate :</strong> {formData.pilotcertname}{" "}
                        </p>
                        <p>
                            <strong>&nbsp;&nbsp;&nbsp;Certificate Expiry Date :</strong> {formData.pilotcertexp}{" "}
                        </p>
                        <p>
                            <strong>&nbsp;&nbsp;&nbsp;Certificate URL :</strong> {formData.pilotcerturl}{" "}
                        </p>
                        <div className='reviewcard'>
                            <h4>ID Information:</h4>
                        </div>
                        <p>
                            <strong>&nbsp;&nbsp;&nbsp;Name as appeared on ID :</strong> {formData.idname}{" "}
                        </p>
                        <p>
                            <strong>&nbsp;&nbsp;&nbsp;ID number :</strong> {formData.licenseid}{" "}
                        </p>
                        <p>
                            <strong>&nbsp;&nbsp;&nbsp;ID image URL :</strong> {formData.licenseimg}{" "}
                        </p>
                    </Card.Body>
                </Card>
            }
        </div>
    );
}