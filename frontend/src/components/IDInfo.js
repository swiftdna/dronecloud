import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {uploadImageToCloud} from "../utils";
import {setToast} from "../actions/app-actions";
import Col from "react-bootstrap/Col";
// import 'react-bootstrap-country-select/dist/react-bootstrap-country-select.css';
// import CountrySelect from 'react-bootstrap-country-select';

export function IDInfo() {

    const [regForm, setRegForm] = useState({
        name: '',
        licenseId: ''
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
        console.log('ID details updated, click next')
        navigate('/UtilityBill');
    };
    const goBack = () => {
        navigate('/landOwner');
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
                <img src="Step3.png"width="300" height="50" /><br/><br/>
                <h4>Lets verify your identity.</h4><br/>
                <p>Please upload your driver's license.</p>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={regForm.name}
                        aria-describedby="name"
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="licenseID">
                    <Form.Label>License ID</Form.Label>
                    <Form.Control
                        type="text"
                        value={regForm.licenseId}
                        aria-describedby="licenseID"
                    />
                </Form.Group>
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