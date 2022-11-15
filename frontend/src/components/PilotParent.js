import React, { useState } from 'react';
import { IDInfo } from './IDInfo';
import {ReviewRegistration} from './ReviewRegistration';
import { addPilotInfo, updateProfile, fetchSession } from '../utils';
import { useSelector,useDispatch } from "react-redux";
import {useNavigate} from "react-router-dom";
import PilotInfo1 from './PilotInfo1';
import { PilotCertificate } from './PilotCertificate';
import { selectIsLoggedIn } from '../selectors/appSelector';
import { useEffect } from 'react';

export default function PilotParent() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(selectIsLoggedIn);

  const [page, setPage] = useState(0);
  const FormTitles = ["Pilot Info", "Pilot cert Info", "ID Info", "Review Registration"];


  const [formData, setFormData] = useState({
    role: 'pilot',
    pilotname: '',
    phone: '',
    pilotaddress: '',
    pilotcity: '',
    pilotstate: '',
    pilotcountry: '',
    pilotzip: '',
    pilotcertid: '',
    pilotcertname: '',
    pilotcertexp: null,
    pilotcerturl: '',
    idname: '',
    licenseid: '',
    licenseimg: ''
  });


    const PageDisplay = () => {
        if (page === 0) {
            return <PilotInfo1 formData={formData} setFormData={setFormData} />;
        } else if (page === 1) {
            return <PilotCertificate formData={formData} setFormData={setFormData} />;
        } else if (page === 2) {
            return <IDInfo formData={formData} setFormData={setFormData} />;
        } else {
            return <ReviewRegistration formData={formData} setFormData={setFormData} />;
        }
    };

    const submitRegister = () => {

        updateProfile(dispatch, {
            name: formData.pilotname,
            address: formData.pilotaddress,
            phone: formData.phone,
            city: formData.pilotcity,
            state: formData.pilotstate,
            country: formData.pilotcountry,
            zipcode: formData.pilotzip,
            driverlicense: formData.licenseid,
            licenseimageurl: formData.licenseimg,
            role: formData.role,
            status: 'complete'
        }, (err, success) => {
            if (success) {
                addPilotInfo(dispatch, {
                    certname: formData.pilotcertname,
                    certid: formData.pilotcertid,
                    certexpdate: formData.pilotcertexp,
                    pilotcertimg: formData.pilotcerturl,
                    status: 'complete'
                }, (err, success) => {
                    if (success) {
                        fetchSession(dispatch, (sessionErr, sessionSuccess) => {
                            if (sessionSuccess) {
                                console.log("Pilot profile updated");
                                navigate("/");
                            }
                        })

                    } else {
                        console.log('Saving pilot info failed!');
                    }
                });
            } else {
                console.log('Saving pilot info failed!');
            }
        });
    }

    const selectrole = () => {
        navigate('/SelectRole');
      }



    return (
        <div className="multistep">
            <br></br>
            <div className="progressbar">
                <div
                style={{ width: `${(100 / FormTitles.length) * (page + 1)}%` }}
                ></div>
            </div>
            <div>{PageDisplay()}</div>
            <div>
                <button onClick={() => {
                    if (page === 0) {
                        selectrole();
                    } else {
                        setPage((currPage) => currPage - 1);
                    }
                    }} className='btn_panel btn-secondary' style={{float:"left",margin:"20px",}}>Prev</button>
                <button onClick={() => {
                    if (page === FormTitles.length - 1) {
                        console.log(formData);
                        submitRegister();
                    } else {
                        setPage((currPage) => currPage + 1);
                    }
                    }} className='btn_panel'
                    style={{float:"right",margin:"20px",}}>{page === FormTitles.length - 1 ? "Submit" : "Next"}</button>
            </div> 
                
        </div>
      );
}

