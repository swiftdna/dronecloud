import React, { useEffect, useState } from 'react';
import { selectIsLoggedIn, selectUser } from '../selectors/appSelector';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { MdOutlineClose } from 'react-icons/md';
import { FaTrashAlt } from 'react-icons/fa';
import { getManagementDrones, capitalizeFirst, getPendingMgmtDrones } from '../utils';
import { Row, Col, Form, Button, Spinner, Table } from 'react-bootstrap';

function DroneManagement() {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const userObj = useSelector(selectUser);
    const drones = useSelector(state => state.dronemgmt.data);
    const addedDrones = useSelector(state => state.dronemgmt.pending);
    const loading = useSelector(state => state.dronemgmt.loading);
    const loadingPending = useSelector(state => state.dronemgmt.pendingLoading);
    const navigate = useNavigate();
    const userLandedPage = useLocation();
    const [addView, setAddView] = useState(false);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        if (isLoggedIn) {
            getManagementDrones(dispatch, { status: 'registered'});
            if (addView) {
                getPendingMgmtDrones(dispatch, { status: 'added'});
            }
        }
    }, [isLoggedIn]);

    const enterAddView = () => {
        setAddView(true);
        fetchAddedDrones();
    }

    const exitAddView = () => {
        setSelected(null);
        setAddView(false);
    }

    const fetchAddedDrones = () => {
        getPendingMgmtDrones(dispatch, { status: 'added'});
    }

    const selectChanged = (e) => {
        const {target: {value}} = e;
        console.log(value);
        const fetchSelected = addedDrones.filter(dr => dr.id === parseInt(value));
        if (value && fetchSelected.length) {
            setSelected(fetchSelected[0]);
        }
    }

    const registerDrone = () => {
        console.log('selected bf sub -> ', selected);
    }

    const deregisterDrone = (drone) => {
        console.log('deregister bf del -> ', drone);
    }
    
    return(
        <div className="container">
            {!addView ? 
                <>
                <h2>Drone Management</h2>
                <Row style={{marginTop: '10px'}}>
                    <Col xs={9}>
                        <h4 style={{color: '#7c7c7c'}}>Add, remove drones to the deployment zone</h4>
                    </Col>
                    <Col xs={3}>
                        <Button variant="primary" style={{float: 'right'}} onClick={() => enterAddView()}>Add Drone</Button>
                    </Col>
                </Row>
                </> : '' }
            {loading && !addView ? <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner> : ''}
            {!loading && !addView && drones && drones.length ? <Table style={{marginTop: '20px'}} responsive>
              <thead>
                <tr>
                  <th align="center">ID</th>
                  <th align="center">Model</th>
                  <th align="center">Manufacturer</th>
                  <th align="center">Status</th>
                  <th align="center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {drones.map(drone => <tr>
                  <td>{drone.id}</td>
                  <td>{drone.model}</td>
                  <td>{drone.manufacturer}</td>
                  <td>{capitalizeFirst(drone.status)}</td>
                  <td align="center"><FaTrashAlt style={{color: '#de0000'}} onClick={() => deregisterDrone(drone)} /></td>
                </tr>
                )}
              </tbody>
            </Table> : ''}
            {addView ? <div className="register_drone">
                <div style={{float: 'right'}}><MdOutlineClose size={40} style={{cursor: 'pointer'}} onClick={() => exitAddView()} /></div>
                <h4>Register a drone</h4>
                <Row>
                    <p style={{padding: '0'}}>Registers this drone into the cloud system so the drone is available to be booked</p>
                    {loadingPending ? <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner> : ''}
                    {!loadingPending && addedDrones && addedDrones.length && 
                        <Form.Select aria-label="Default select example" onChange={e => selectChanged(e)}>
                          <option value="">Select one</option>
                          {addedDrones.map(drone =>
                            <option key={drone.id} value={drone.id}>{drone.id} - {drone.manufacturer} {drone.model}</option>
                          )}
                        </Form.Select>
                    }
                    {!loadingPending && selected && selected.id ?
                        <div className="selected_pending_list">
                            <p className="title">Selected drone:</p>
                            <p>Drone #{selected.id}</p>
                            <p>Manufacturer: {selected.manufacturer}</p>
                            <p>Model: {selected.model}</p>
                            <p>Statues: {selected.status}</p>
                        </div>: ''}
                    {!loadingPending && selected && selected.id ?
                        <div className="text-center button_panel">
                            <Button variant="secondary" onClick={() => exitAddView()}>Cancel</Button>
                            <Button variant="primary" onClick={() => registerDrone()}>Register</Button>
                        </div>: ''}
                    {!loadingPending && (!addedDrones || !addedDrones.length) ? 
                        <p>No drones available to register. Check back later</p> : ''
                    } 
                </Row>
            </div> : ''}
        </div>
    )
}

export default DroneManagement;