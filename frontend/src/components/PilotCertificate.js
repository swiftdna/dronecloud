import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {uploadImageToCloud} from "../utils";
import {setToast} from "../actions/app-actions";
// import 'react-bootstrap-country-select/dist/react-bootstrap-country-select.css';
// import CountrySelect from 'react-bootstrap-country-select';

export function PilotCertificate() {

    const [regForm, setRegForm] = useState({
        idNumber: '',
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
        console.log('Pilot certificate details updated, click next')
        navigate('/IDInfo');
    };
    const goBack = () => {
        navigate('/PilotInfo1');
    };
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
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
        }} className="container pull-down fill-page dc-default">
            <Form><br/>
                <img src="Step2.png"width="300" height="50" />
                <h3>Lets verify your pilot certification</h3>
                <p>Fill in more data regarding your pilot certification</p><br/>
                <h4>Remote pilot certificate</h4>
                <Form.Group as={Col} className="mb-3" controlId="idNumber">
                    <Form.Label>Certificate ID number</Form.Label>
                    <Form.Control
                        type="text"
                        value={regForm.name}
                        aria-describedby="idNumber"
                    />
                </Form.Group>
                <Form.Group as={Col} className="mb-3" controlId="name">
                    <Form.Label>Name of certificate holder</Form.Label>
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
                            aria-describedby="zipcode"
                        />
                    </Form.Group>
                </Row>
                <Form.Group as={Col} className="mb-3" controlId="image">
                    <Form.Label className="form_label" htmlFor="image">File upload:</Form.Label>
                    <Form.Control
                        type="file"
                        id="image"
                        aria-describedby="image"
                        onChange={uploadImage}
                    />
                </Form.Group>
                <div className="btn_panel">
                    <Button variant="secondary" onClick={() => goBack()}>Back</Button>
                    <Button variant="primary" onClick={() => submitRegister()} type="submit">Next</Button>
                </div>
            </Form>
        </div>
    );
}