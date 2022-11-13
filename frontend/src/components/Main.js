import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from './Login';
import Navbar from './Navbar';
import Footer from './Footer';
// import Home from './Home';
import LandingPage from './LandingPage';
import Profile from './Profile';
import Register from './Register';
import Admin from './Admin';
import { useLocation } from 'react-router-dom';
import { checkSession } from '../utils';
import ProtectedRoute from './ProtectedRoute';
import {Toast, ToastContainer} from 'react-bootstrap';
import { selectAlertFlag, selectToastFlag, selectAlertMessage, selectAlertType, selectIsLoggedIn } from '../selectors/appSelector';
import { clearToast } from '../actions/app-actions';
import DroneCatalog from './DroneCatalog';
import FarmerInfo1 from "./FarmerInfo1";
import FarmInfo1 from "./FarmInfo1";
import Contact from './Contact';
import {LandOwner} from "./LandOwner";
import {IDInfo} from "./IDInfo";
import {UtilityBill} from "./UtilityBill";
import {BillingInfo} from "./BillingInfo";
import SelectRole from "./SelectRole";

//Create a Main Component
export function Main() {
    const alert = useSelector(selectAlertFlag);
    const toast = useSelector(selectToastFlag);
    const alertMessage = useSelector(selectAlertMessage);
    const alertType = useSelector(selectAlertType);
    const isAuthenticated = useSelector(selectIsLoggedIn);
    const location = useLocation();
    const dispatch = useDispatch();
    const alertMapping = {
        'error': 'alert alert-danger',
        'success': 'alert alert-success',
        'warning': 'alert alert-warning',
        'info': 'alert alert-info'
    }
    
    useEffect(() => {
        checkSession(dispatch);
    }, []);

    return(
        <>
            {location.pathname !== '/login' && <Navbar />}
            {
                alert ? 
                <div className="container pull-down hideAlert">
                    <div className={alertMapping && alertMapping[alertType] ? alertMapping[alertType]: "alert alert-danger"} role="alert" autohide>
                        {alertMessage}
                    </div>
                </div> : ''
            }
            <ToastContainer className="p-3" position={'bottom-end'} style={{zIndex: 10}}>
                <Toast onClose={() => dispatch(clearToast())} show={toast} delay={4000} autohide>
                  <Toast.Header>
                    <strong className="me-auto">{alertType}</strong>
                  </Toast.Header>
                  <Toast.Body>{alertMessage}</Toast.Body>
                </Toast>
            </ToastContainer>
            <Routes>
              <Route path="/login" element={<Login />} />
              {/* <Route path="/home" element={isAuthenticated ? <Home /> : <Login />} /> */}
              {/* <Route path="/profile" element={isAuthenticated ? <Profile /> : <Login />} /> */}
              <Route path="/register" element={<Register />} />
                <Route path="/FarmerInfo1" element={<FarmerInfo1 />} />
                <Route path="/SelectRole" element={<SelectRole />} />
                <Route path="/FarmInfo1" element={<FarmInfo1 />} />
                <Route path="/LandOwner" element={<LandOwner />} />
                <Route path="/IDInfo" element={<IDInfo />} />
                <Route path="/UtilityBill" element={<UtilityBill />} />
                <Route path="/BillingInfo" element={<BillingInfo />} />
              <Route path="admin/*" element={<Admin />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/*" element={<LandingPage />} />
            </Routes>
            {location.pathname !== '/login' && location.pathname !== '/register' && location.pathname !== '/' && <Footer />}
        </>
    )
}
//Export The Main Component
export default Main;
