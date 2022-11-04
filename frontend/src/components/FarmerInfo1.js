import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {register} from "../utils";
import {setAlert} from "../actions/app-actions";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import '../App.css';
// import 'react-bootstrap-country-select/dist/react-bootstrap-country-select.css';
// import CountrySelect from 'react-bootstrap-country-select';

export default function FarmerInfo1() {

    const [regForm, setRegForm] = useState({
        first_name: '',
        last_name: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipcode: '',
        country: ''
    });
    const onInputChange = (e) => {
        const tmpForm = {...regForm};
        const name = e.target.getAttribute('id');
        tmpForm[name] = e.target.value;
        setRegForm(tmpForm);
    }
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const submitRegister = () => {

        console.log('Farmer details updated, click next')
        navigate('/FarmInfo1');

    };
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
        }} className="container pull-down fill-page dc-default">
            <Form>
                <h4>Farmer Information</h4><br/>
                <Row className="mb-3">
                    <Form.Group as={Col} className="mb-3" controlId="first_name">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={regForm.first_name}
                            aria-describedby="first_name"
                        />
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3" controlId="last_name">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={regForm.last_name}
                            aria-describedby="last_name"
                        />
                    </Form.Group>
                </Row>
                <Form.Group className="mb-3" controlId="phone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                        type="text"
                        value={regForm.phone}
                        aria-describedby="phone"
                    />
                </Form.Group>
                <Row className="mb-3">
                    <Form.Group as={Col}className="mb-3" controlId="address">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type="text"
                            value={regForm.address}
                            aria-describedby="address"
                        />
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3" controlId="city">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            type="text"
                            value={regForm.city}
                            aria-describedby="city"
                        />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group className="mb-3" controlId="country">
                        <Form.Label>Country</Form.Label>
                        <Form.Select as={Col} aria-label="Default select example">
                            <option>Choose</option>
                            <option value="1">India</option>
                            <option value="2">United States</option>
                            <option value="3">United Kingdom</option>
                            <option value="4">South Africa</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>State</Form.Label>
                        <Form.Select defaultValue="Choose...">
                            <option>Choose...</option>
                            <option>...</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3" controlId="zipcode">
                        <Form.Label>Zipcode</Form.Label>
                        <Form.Control
                            type="text"
                            value={regForm.zipcode}
                            aria-describedby="zipcode"
                        />
                    </Form.Group>
                </Row>
                <div className="btn_panel">
                    <Button variant="primary" onClick={() => submitRegister()} type="submit">
                        Next
                    </Button>
                </div>
            </Form>
        </div>
    );
}