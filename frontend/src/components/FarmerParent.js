import React, { useState } from 'react';
import FarmerInfo1 from './FarmerInfo1';
import FarmInfo from './FarmInfo'
import LandInfo from './LandInfo'
import { LandOwner } from './LandOwner';
import { IDInfo } from './IDInfo';
import { UtilityBill } from './UtilityBill';
import { BillingInfo } from './BillingInfo';
import {ReviewRegistration} from './ReviewRegistration';
import { addFarm, addPayment, updateProfile, fetchSession, addPlot } from '../utils';
import { useDispatch } from "react-redux";
import {useNavigate} from "react-router-dom";


export default function FarmerParent() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const FormTitles = ["Farmer Info", "Farm Info", "Land Info", "Land Owner Info", "ID Info", "Utility Bill Details", "Billing Info", "Review Registration"];

  const [formData, setFormData] = useState({
    role: 'farmer',
    fullName: '',
    phonenumber: '',
    address: '',
    city: '',
    state: '',
    country: '',
    zipcode: '',
    farmname: '',
    lat: 0,
    lng: 0,
    farmaddress: '',
    plottype: '',
    ownername: '',
    area: null,
    issuedate: null,
    landcert: '',
    idname: '',
    licenseid: '',
    licenseimg: '',
    billid: '',
    utilitybilldate: null,
    utilityfile: '',
    cardname: '',
    cardnum: null,
    expmonth: null,
    expyear: null,
    cvv: null,
    addFarmView: '',
    plotname: '',
    plotlatlong: [],
    plotlat: 0,
    plotlong: 0
  });


    const PageDisplay = () => {
        if (page === 0) {
            return <FarmerInfo1 formData={formData} setFormData={setFormData} />;
        } else if (page === 1) {
            return <FarmInfo formData={formData} setFormData={setFormData} />;
        } else if (page === 2) {
            return <LandInfo formData={formData} setFormData={setFormData} />;
        } else if (page === 3) {
            return <LandOwner formData={formData} setFormData={setFormData} />;
        } else if (page === 4) {
            return <IDInfo formData={formData} setFormData={setFormData} />;
        } else if (page === 5) {
            return <UtilityBill formData={formData} setFormData={setFormData} />;
        } else if (page === 6) {
            return <BillingInfo formData={formData} setFormData={setFormData} />;
        } else {
            return <ReviewRegistration formData={formData} setFormData={setFormData} />;
        }
    };

    const submitRegister = () => {
         // Make an API call
        updateProfile(dispatch, {
            name: formData.fullName,
            address: formData.address,
            phone: formData.phonenumber,
            city: formData.city,
            state: formData.state,
            country: formData.country,
            zipcode: formData.zipcode,
            driverlicense: formData.licenseid,
            licenseimageurl: formData.licenseimg,
            imageurl: formData.imageurl,
            role: formData.role,
            status: 'complete'
        }, (err, success) => {
            if (success) {
                addFarm(dispatch, {
                    name: formData.farmname,
                    address: formData.farmaddress,
                    lat: formData.lat,
                    lng: formData.lng,
                    ownername: formData.ownername,
                    area: formData.area,
                    issuedate: formData.issuedate,
                    imageurl: formData.landcert,
                    utilbillid: formData.billid,
                    billdate: formData.utilitybilldate,
                    billimgurl: formData.utilityfile,
                    status: 'complete'
                }, (err, farm_id) => {
                    if (farm_id) {
                        addPayment(dispatch, {
                            nameoncard: formData.cardname,
                            cardnumber: formData.cardnum,
                            expiry_month: formData.expmonth,
                            expiry_year: formData.expyear,
                            cvv: formData.cvv,
                            status: 'complete'
                        }, (err, success) => {
                                if (success) {
                                    // console.log("Farmer profile updated");
                                    const coordinates = [];
                                    for (let i = 0; i < formData.plotlatlong.length; i++) {
                                        coordinates.push({
                                            location_lat: formData.plotlatlong[i].lat(),
                                            location_lng: formData.plotlatlong[i].lng()
                                        });
                                    }
                                    addPlot(dispatch, {
                                            name: formData.plotname,
                                            type: formData.plottype,
                                            farm_id,
                                            coordinates,
                                            status: 'complete'
                                        }, (err, success) => {
                                            if(success) {
                                                fetchSession(dispatch, (sessionErr, sessionSuccess) => {
                                                    if (sessionSuccess) {
                                                        console.log("Farmer profile updated");
                                                        navigate("/");
                                                    }
                                                });
                                            } else {
                                                console.log('Saving plot info failed');
                                            }
                                        }); 
                                } else {
                                    console.log('Saving payment info failed!');
                                }
                            }
                        ); 
                    } else {
                        console.log('Saving farm info failed!');
                    }
                });
            } else {
                console.log('Saving farmer info failed!');
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
            {!formData.addFarmView ?
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
            </div> : ''}
                
        </div>
      );
}

