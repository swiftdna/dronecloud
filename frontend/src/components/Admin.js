import React, { useEffect } from 'react';
import { selectIsLoggedIn, selectUser } from '../selectors/appSelector';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setRedirectionPath } from '../actions/app-actions'
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
                <Col xs={3} className="text-center py-3 dc-default dc-admin-leftpane">
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
                <Col xs={9} className="text-center py-3 dc-default content_panel">
                    <Routes>
                        <Route path="/drone-management" element={<DroneManagement />} />
                        <Route path="/drone-booking" element={<DroneBooking />} />
                        <Route path="/drone-fleet-tracking" element={<DroneFleetTracking />} />
                        <Route path="/" element={<DroneCatalog />} />
                    </Routes>
                </Col>
            </Row>
        </div>
    )
}

export default Admin;