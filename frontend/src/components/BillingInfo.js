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

export function BillingInfo() {

    const [regForm, setRegForm] = useState({
        name: '',
        cardNumber: '',
        expiry: '',
        cvv: ''
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
        console.log('Billing information updated, click next to review registration')
        navigate('/ReviewRegistration');
    };
    const goBack = () => {
        navigate('/UtilityBill');
    };
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
        }} className="container pull-down fill-page dc-default">
            <Form><br/><br/>
                <img src="Step5.png"width="300" height="50" /><br/><br/>
                <h4>Billing information</h4><br/>
                <p>Fill in the billing information for your profile</p>
                <h5>Payment method</h5>
                {/*add radio buttons for wallet and paypal*/}
                <Form.Group as={Col} className="mb-3" controlId="name">
                    <Form.Label>Name of Land Owner</Form.Label>
                    <Form.Control
                        type="text"
                        value={regForm.name}
                        aria-describedby="name"
                    />
                </Form.Group>
                <Form.Group as={Col} className="mb-3" controlId="cardNumber">
                    <Form.Label>Card Number</Form.Label>
                    <Form.Control
                        type="text"
                        value={regForm.cardNumber}
                        aria-describedby="cardNumber"
                    />
                </Form.Group>
                <Row className="mb-3">
                    <Form.Group as={Col} className="mb-3" controlId="expiry">
                        <Form.Label>Expiration Date</Form.Label>
                        <Form.Control
                            type="date"
                            value={regForm.expiry}
                            aria-describedby="expiry"
                        />
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3" controlId="cvv">
                        <Form.Label>CVV</Form.Label>
                        <Form.Control
                            type="password"
                            value={regForm.cvv}
                            aria-describedby="cvv"
                        />
                    </Form.Group>
                </Row>
                <div className="btn_panel">
                    <Button variant="secondary" onClick={() => goBack()}>Back</Button>
                    <Button variant="primary" onClick={() => submitRegister()} type="submit">Next</Button>
                </div>
            </Form>
        </div>
    );
}