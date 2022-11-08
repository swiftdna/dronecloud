import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Form, Button} from 'react-bootstrap';
import {Row, Col} from 'react-bootstrap';
// import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {register} from "../utils";
import {setAlert} from "../actions/app-actions";
import '../App.css';

export default function FarmInfo1() {

    const [regForm, setRegForm] = useState({
        name: '',
        address: '',
        city: '',
        state: '',
        country: '',
        zipcode: '',
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
        navigate('/LandOwner');
    };
    const goBack = () => {
        navigate('/FarmerInfo1');
    };
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
        }} className="container pull-down fill-page dc-default">
            <Form>
                <h4>Farm address</h4><br/>
                <Form.Group as={Col} className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={regForm.name}
                        aria-describedby="name"
                    />
                </Form.Group>
                <Form.Group as={Col} className="mb-3" controlId="address">
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
                {/*<Form.Group as={Col} className="mb-3" controlId="farmtype">*/}
                {/*    <Form.Label>Farm type</Form.Label>*/}
                {/*    <DropdownMultiselect*/}
                {/*        options={["Livestock", "Crops", "Fruit", "Nursery"]}*/}
                {/*        name="plot type"*/}
                {/*    />*/}
                {/*</Form.Group>*/}
                <div className="btn_panel">
                    <Button variant="secondary" onClick={() => goBack()}>Back</Button>
                    <Button variant="primary" onClick={() => submitRegister()} type="submit">Next</Button>
                </div>
            </Form>
        </div>
    );
}
