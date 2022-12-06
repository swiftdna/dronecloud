import "../CSS/addDrone.css"
import React, { useEffect,useState } from 'react';
import { selectIsLoggedIn, selectUser } from '../selectors/appSelector';
import { useNavigate, useLocation,useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import "../CSS/dronecatalog.css";
import {Link} from "react-router-dom";
import { Button, Form } from 'react-bootstrap';
import axios  from 'axios';
import {Image} from 'react-bootstrap'
import { uploadImageToCloud,updateDrone } from '../utils';
function EditDrone(props) {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
    const navigate=useNavigate();
    const {id}=useParams();
    const drone_id=Number(id);
    const [name,setName]=useState(" ");
    const [brand,setBrand]=useState(" ");
    const [camera,setCamera]=useState("");
    const [image,setImage]=useState(" ");
   const [speed,setSpeed]=useState(0);
   const [weight,setWeight]=useState(0);
   const [time,setTime]=useState(0);
   const [service,setService]=useState(" ");
   const [price,setPrice]=useState(0);
    
   useEffect(() => {
    if (isLoggedIn) {
        console.log('DroneCatalog === user logged in!');
    }
    getSingleDrone();  
}, [isLoggedIn]);
  const getSingleDrone=()=>{
    axios.get( `/api/droneCatalog/getDrone/${drone_id}`)
      .then((response) =>{
        // console.log(response);
        const {data: {success, result}} = response;
        if(success){
          setName(result.model);
          setBrand(result.manufacturer);
          setCamera(result.camera);
          setImage(result.image);
          setSpeed(result.speed);
          setWeight(result.weight);
          setTime(result.time);
          setService(result.service);
          setPrice(result.price);
            
        } else {
          alert("failed to fetch Drones")
        }
      })
  }
  const uploadImage = async (e) => {
		e.preventDefault();
		const res = await uploadImageToCloud(e.target.files[0]);

		  // console.log(res.data.secure_url);
		const {data: {secure_url}} = res;
		if (secure_url) {
				console.log("image uploaded sucessfully - ", secure_url);
		};
		setImage(secure_url);
    }

    const handleUserData=async()=>
   {
       //e.preventDefault();
       
       var formData = {};
       formData.image_url= image;
       formData.droneName = name;
       formData.brand = brand;
       formData.camera = camera;
       formData.speed = speed;
       formData.weight = weight;
       formData.time = time;
       formData.service = service;
       formData.price = price;
       console.log(image);
       const result=updateDrone(formData, drone_id);
       navigate("/admin");
    } 
  

    
  return (
    <div className="container main-frame">
         <div className="div1-drone-catalog">
            <h1 className='header-dronecatalog' style={{marginLeft:"100px"}}> Edit Drone details</h1>

            <p className='heading-dronecatalog' style={{marginTop:"10px",marginLeft:"100px"}}>Enter the details of the drone</p>
         </div>
         <div>

             <div className='droneDetails'>

                 <p className="DroneInfo">Drone information</p>
                 <p className='DroneDetails'>Name</p>
                <input type="text" className='input_text' value={name} onChange={(event) => {
          setName(event.target.value);
        }}></input>
                <p className='DroneDetails'>Brand</p>
                <input type="text" className='input_text' value={brand} onChange={(event) => {
          setBrand(event.target.value);
        }}></input>
                <p className='DroneDetails'>Camera</p>
                <input type="text" className='input_text' value={camera} onChange={(event) => {
          setCamera(event.target.value);
        }}></input>
                <p className='DroneDetails'>Speed of Flight</p>
                <input type="text" className='input_text' value={speed} onChange={(event) => {
          setSpeed(event.target.value);
        }}></input>

                <p className='DroneDetails'>weight of the Drone</p>
                <input type="text" className='input_text'  value={weight} onChange={(event) => {
          setWeight(event.target.value);
        }}></input>
                <p className='DroneDetails'>Flight time</p>
                <input type="text" className='input_text' value={time} onChange={(event) => {
          setTime(event.target.value);
        }}></input>
                <p className='DroneDetails'>Service</p>
                <input type="text" className='input_text' value={service} onChange={(event) => {
          setService(event.target.value);
        }}></input>
                <p className='DroneDetails'>Price of service</p>
                <input type="text" className='input_text' value={price} onChange={(event) => {
          setPrice(event.target.value);
        }}></input>
                <p className='DroneDetails'>Upload image</p>
                <Form.Control
                    type="file"
                    id="drone-picture"
                    aria-describedby="image"
                    onChange={uploadImage}
                    
                    style={{margin:"20px",width:"100px",align:"center"}}
                  />
                  <p>{image}</p>
                <br>
                </br>
                <button variant="secondary" className='dc-default btn btn-secondary m20'>Back</button>
                <button variant="primary" className='dc-default btn btn-primary m20' 
                style={{float:"right",margin:"20px",}}
                onClick={handleUserData}>Next</button>
             </div>
         </div>
    </div>
  )
  
}

export default EditDrone
