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

export function LandOwner() {

    const [regForm, setRegForm] = useState({
        name: '',
        address: '',
        city: '',
        state: '',
        country: '',
        zipcode: '',
        totalArea: '',
        certificateIssueDate: ''
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
        console.log('Certificate details updated, click next')
        navigate('/IDInfo');
    };
    const goBack = () => {
        navigate('/FarmInfo1');
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
                {/*<img src="Step4.png"width="300" height="50" />*/}
                <h5>Land ownership certificate</h5>
                <p>Fill in more data regarding your farm certification</p>
                <Form.Group as={Col} className="mb-3" controlId="name">
                    <Form.Label>Name of Land Owner</Form.Label>
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
                <Row className="mb-3">
                    <Form.Group as={Col} className="mb-3" controlId="totalArea">
                        <Form.Label>Total Area(square feet)</Form.Label>
                        <Form.Control
                            type="text"
                            value={regForm.totalArea}
                            aria-describedby="zipcode"
                        />
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3" controlId="certificateIssueDate">
                        <Form.Label>Date of certificate issue</Form.Label>
                        <Form.Control
                            type="date"
                            value={regForm.certificateIssueDate}
                            aria-describedby="certificateIssueDate"
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