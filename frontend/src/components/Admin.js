import React, { useEffect } from 'react';
import { selectIsLoggedIn, selectUser } from '../selectors/appSelector';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setRedirectionPath } from '../actions/app-actions';
import { RiSettingsLine, RiListUnordered } from 'react-icons/ri';
import { Row, Col } from 'react-bootstrap';
import {
  Routes,
  Route,
  NavLink
} from "react-router-dom";
import DroneCatalog from './DroneCatalog';
import DroneManagement from './DroneManagement';
import DroneBooking from './DroneBooking';
import DroneFleetTracking from './DroneFleetTracking';
import AddDrone from './AddDrone';
import AddDrone2 from './AddDrone2';

import EditDrone from './EditDrone';
import EditDrone2 from './EditDrone2';
import EditDrone3 from './EditDrone3';
import EditDrone4 from './EditDrone4';


function Admin() {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const userObj = useSelector(selectUser);
    const navigate = useNavigate();
    const currentPage = useLocation();

    useEffect(() => {
        if (isLoggedIn) {
            console.log('user logged in!');
        } else {
            // Setting this so that after login, user can be landed to this page
            dispatch(setRedirectionPath(currentPage.pathname));
        }
    }, [isLoggedIn]);
    
    return(
        <div className="container fill-page">
            <Row className="fill-page">
                <Col xs={3} className="py-3 dc-default dc-leftpane dc-admin-leftpane">
                    <h3 className="title"><RiSettingsLine size={40} style={{marginTop: '-5px'}} /> Dashboard</h3>
                    <ul className="nav flex-column dc-default dc-admin-nav">
                      <li className="nav-item">
                        <NavLink className="nav-link" activeClassName="active" to="/admin" end>Drone Catalog</NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink className="nav-link" activeClassName="active" to="/admin/drone-management">Drone Management</NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink className="nav-link" activeClassName="active" to="/admin/drone-booking">Drone Booking</NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink className="nav-link" activeClassName="active" to="/admin/drone-fleet-tracking">Drone Fleet Tracking</NavLink>
                      </li>
                    </ul>
                </Col>
                <Col xs={9} className="py-3 dc-default content_panel">
                    <Routes>
                        <Route path="/drone-management" element={<DroneManagement />} />
                        <Route path="/drone-booking" element={<DroneBooking />} />
                        <Route path="/drone-fleet-tracking" element={<DroneFleetTracking />} />
                        <Route path="/" element={<DroneCatalog />} />
                        <Route path="/addDrone" element={<AddDrone/>}/>
                        <Route path="/addDrone2" element={<AddDrone2/>}/>

                        <Route path="/editDrone" element={<EditDrone/>}/>
                        <Route path="/editDrone2" element={<EditDrone2/>}/>
                        <Route path="/editDrone3" element={<EditDrone3/>}/>
                        <Route path="/editDrone4" element={<EditDrone4/>}/>


                    </Routes>
                </Col>
            </Row>
        </div>
    )
}

export default Admin;