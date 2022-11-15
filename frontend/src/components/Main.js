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
import Contact from './Contact';
import SelectRole from "./SelectRole";
import FarmerInfo1 from "./FarmerInfo1";
import FarmInfo from "./FarmInfo";
import PilotInfo1 from "./PilotInfo1";
import { PilotCertificate } from "./PilotCertificate";
import {LandOwner} from "./LandOwner";
import {IDInfo} from "./IDInfo";
import {UtilityBill} from "./UtilityBill";
import {BillingInfo} from "./BillingInfo";
import FarmInfoMap from "./FarmInfoMap";
import FarmPlotInfo from "./FarmPlotInfo";
import FarmerParent from "./FarmerParent";
import {ReviewRegistration} from "./ReviewRegistration";
import PilotParent from './PilotParent';

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
                <Route path="/SelectRole" element={<SelectRole />} />
                <Route path="/FarmerInfo1" element={<FarmerInfo1 />} />
                <Route path="/FarmInfo" element={<FarmInfo />} />
                <Route path="/farminfo" element={<FarmInfo />} />
                <Route path="/FarmerParent" element={<FarmerParent />} />
                <Route path="/PilotParent" element={<PilotParent />} />
                <Route path="/FarmInfoMap" element={<FarmInfoMap />} />
                <Route path="/LandOwner" element={<LandOwner />} />
                <Route path="/IDInfo" element={<IDInfo />} />
                <Route path="/UtilityBill" element={<UtilityBill />} />
                <Route path="/BillingInfo" element={<BillingInfo />} />
                <Route path="/PilotInfo1" element={<PilotInfo1 />} />
                <Route path="/PilotCertificate" element={<PilotCertificate />} />
                <Route path="/FarmPlotInfo" element={<FarmPlotInfo />} />
                <Route path="/ReviewRegistration" element={<ReviewRegistration />} />
              <Route path="/register" element={<Register />} />
              <Route path="admin/*" element={<Admin />} />
              <Route path="/*" element={<LandingPage />} />
            </Routes>
            {/* {location.pathname !== '/login' && location.pathname !== '/register' && location.pathname !== '/FarmerParent' && location.pathname !== '/FarmerInfo1' 
                            && location.pathname !== '/FarmInfo' && location.pathname !== '/LandOwner' && location.pathname !== '/IDInfo' 
                            && location.pathname !== '/UtilityBill' && location.pathname !== '/BillingInfo' && location.pathname !== '/PilotInfo1' 
                            && location.pathname !== '/PilotCertificate' && location.pathname !== '/SelectRole' 
                            && location.pathname !== '/ReviewRegistration' && location.pathname !== '/' && <Footer />} */}
        </>
    )
}
//Export The Main Component
export default Main;
