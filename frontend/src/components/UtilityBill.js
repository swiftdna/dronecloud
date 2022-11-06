import React, {useState, useRef} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { uploadImageToCloud } from '../utils';
import { setToast } from '../actions/app-actions';
// import 'react-bootstrap-country-select/dist/react-bootstrap-country-select.css';
// import CountrySelect from 'react-bootstrap-country-select';

export function UtilityBill() {

    const [regForm, setRegForm] = useState({
        agreementID: '',
        billDate: ''
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
        console.log('Utility details updated, click next')
        navigate('/BillingInfo');
    };
    const goBack = () => {
        navigate('/IDInfo');
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
            <Form>
                <img src="Step4.png"width="300" height="50" /><br/><br/>
                <h4>Lets verify your farm operation</h4><br/>
                <p>Please submit a copy of your farm's utility bill. This can be an
                    electric bill, or alternatively a water bill</p><br/>
                <h5>Farm Utility Bill</h5>
                <Row className="mb-3">
                    <Form.Group as={Col} className="mb-3" controlId="agreementID">
                        <Form.Label>Statement agreement ID</Form.Label>
                        <Form.Control
                            type="text"
                            value={regForm.agreementID}
                            aria-describedby="agreementID"
                        />
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3" controlId="billDate">
                        <Form.Label>Date of bill statement</Form.Label>
                        <Form.Control
                            type="date"
                            value={regForm.billDate}
                            aria-describedby="billDate"
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