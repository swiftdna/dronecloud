import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { fetchFarm, addFarm, uploadImageToCloud } from '../utils';
import { selectIsLoggedIn, selectFarm, selectCountries } from '../selectors/appSelector';
import { useSelector, useDispatch } from 'react-redux';
import { selectFarmData } from '../selectors/profileSelector';
import { FaPencilAlt, FaSave } from 'react-icons/fa';
import { setToast } from '../actions/app-actions';
import { Form, Button, Row, Col, Image, FormGroup } from 'react-bootstrap';
import {useNavigate} from "react-router-dom";

export default function FarmLand() {
	const dispatch = useDispatch();
    const farmObj = useSelector(selectFarm);
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const farmProfile = useSelector(selectFarmData);
    const countries = useSelector(selectCountries);
    const [editMode, setEditMode] = useState(false);
    const [farmProfileForm, setFarmProfileForm] = useState(farmProfile);
    const [farmImage, setFarmImage] = useState();
	const navigate = useNavigate();

	useEffect(() => {
		if (isLoggedIn) {
			console.log('profile - ', farmObj);
        	// fetchFarm(dispatch, farmObj);
		}
    }, [isLoggedIn]);

    useEffect(() => {
    	if (farmProfile) {
    		setFarmProfileForm(farmProfile);
    	}
    }, [farmProfile]);

    const onFarmProfileChange = (e) => {
    	const fieldName = e.target.getAttribute('id');
        const tempForm = {...farmProfileForm};
        tempForm[fieldName] = e.target.value;
        setFarmProfileForm(tempForm);
    };

    const reset = () => {
    	setFarmProfileForm(farmProfile);
    };

    const uploadImage = async (e) => {
		e.preventDefault();
		const res = await uploadImageToCloud(dispatch, e.target.files[0]);
		  // console.log(res.data.secure_url);
		const {data: {secure_url}} = res;
		if (secure_url) {
			dispatch(setToast({
				type: 'success',
                message: 'farm image uploaded successfully!'
			}));
		}
		const tempForm = {...farmProfileForm};
		tempForm.dp_url = secure_url;
		setFarmProfileForm(tempForm);
    }

    const submitProfile = () => {
    	console.log('farmProfileForm -> ' , farmProfileForm);
    	const {id: farm_id} = farmProfile;
		addFarm(dispatch, farmProfileForm, (err, successFlag) => {
			if (successFlag) {
				setEditMode(false);
			}
		});
    };

	return (
        <div className="container pull-down fill-page">
			<h5>{farmProfile.name ? farmProfile.name : 'User'}'s Farmland {!editMode ? 
				<FaPencilAlt className="edit_icon" size="1em" onClick={() => setEditMode(!editMode) } /> :
				<FaSave className="edit_icon" size="1em" onClick={() => submitProfile() } />}
			</h5>

			<div className="user_details">
				<Row>
					<Col xs="3">
						<Image src={farmProfileForm.dp_url} roundedCircle={true} style={{objectFit: 'cover', width: '200px', height: '200px', marginLeft: 'auto', marginRight: 'auto', display: 'block'}} />
					</Col>
					<Col>
						<Form.Group className="UserDetails">
							{editMode ?
								<>
								<Form.Label className="form_label" htmlFor="image">Farm Image</Form.Label>
								<Form.Control
									type="file"
									id="image"
									aria-describedby="image"
									onChange={uploadImage}
                                    />
                                    </> : ''}
						</Form.Group>
						<Form.Group className="UserDetails">
							<Form.Label className="form_label" htmlFor="name">Farm Name</Form.Label>
							{!editMode ? <p>{farmProfileForm.name}</p> : 
								<Form.Control
									type="text"
									id="name"
									aria-describedby="name"
									value={farmProfileForm.name}
									onChange={onFarmProfileChange}
								/>
							}
						</Form.Group>			
						<Form.Group className="UserDetails">
							<Form.Label className="form_label" htmlFor="address">Address</Form.Label>
							{!editMode ? <p>{farmProfileForm.address}</p> : 
								<Form.Control
									type="text"
									id="address"
									aria-describedby="address"
									value={farmProfileForm.address}
									onChange={onFarmProfileChange}
								/>
							}
						</Form.Group>					
						<Form.Group className="UserDetails">
							<Form.Label className="form_label" htmlFor="ownername">Land Owner Name</Form.Label>
							{!editMode ? <p>{farmProfileForm.ownername}</p> : 
								<Form.Control
									type="text"
									id="ownername"
									aria-describedby="ownername"
									value={farmProfileForm.ownername}
									onChange={onFarmProfileChange}
								/>
							}
						</Form.Group>						
						<Form.Group className="UserDetails">
							<Form.Label className="form_label" htmlFor="state">Total Area</Form.Label>
							{!editMode ? <p>{farmProfileForm.area}</p> : 
								<Form.Control
									type="text"
									id="area"
									aria-describedby="area"
									value={farmProfileForm.area}
									onChange={onFarmProfileChange}
								/>
							}
						</Form.Group>
						<Form.Group className="UserDetails">
						<Form.Label className="form_label" htmlFor="dp_url">Picture URL</Form.Label>
							{!editMode ? <p>{farmProfileForm.dp_url}</p> : 
								<Form.Control
									type="text"
									id="dp_url"
									aria-describedby="dp_url"
									disabled={true}
									value={farmProfileForm.dp_url}
								/>
							}
							{editMode ? <div className="btn_panel">
								<Button variant="secondary" onClick={() => reset()}>
									Reset
								</Button>
								<Button variant="primary" onClick={() => submitProfile()}>
									Save Changes
								</Button>
							</div> : ''}
						</Form.Group>
					
					</Col>
				</Row>
			</div>
        </div>
	);
}