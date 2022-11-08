import React, { useState } from 'react'
import { Navigate } from 'react-router'
import "../CSS/addDrone.css"
import axios  from 'axios';
import { useNavigate} from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { uploadImageToCloud } from '../utils';
function AddDrone() {
    const navigate=useNavigate()
   
    const [name,setName]=useState(" ");
    const [brand,setBrand]=useState(" ");
    const [camera,setCamera]=useState("");
    const [image,setImage]=useState("");
   const [speed,setSpeed]=useState(0);
   const [weight,setWeight]=useState(0);
   const [time,setTime]=useState(0);
   const [service,setService]=useState("");
   const [price,setPrice]=useState(0);
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

       axios.post("http://localhost:3000/api/droneCatalog/add", formData).then((res)=>{
             console.log(res);
         }).catch((err)=>{
             console.log(err);
         })
         
        }
const addDrone2=()=>{
    navigate("/admin/addDrone2")
}
    
  return (
    <div className="container main-frame">
         <div className="div1-drone-catalog">
            <h1 className='header-dronecatalog' style={{marginLeft:"100px"}}> Add a new drone</h1>

            <p className='heading-dronecatalog' style={{marginTop:"10px",marginLeft:"100px"}}>Enter the details of the drone</p>
         </div>
         <div>

             <div className='droneDetails'>

                 <p className="DroneInfo">Drone information</p>
                 <p className='DroneDetails'>Name</p>
                <input type="text" className='input_text' onChange={(event) => {
          setName(event.target.value);
        }}></input>
                <p className='DroneDetails'>Brand</p>
                <input type="text" className='input_text' onChange={(event) => {
          setBrand(event.target.value);
        }}></input>
                <p className='DroneDetails'>Camera</p>
                <input type="text" className='input_text' onChange={(event) => {
          setCamera(event.target.value);
        }}></input>
                <p className='DroneDetails'>Speed of Flight</p>
                <input type="text" className='input_text' onChange={(event) => {
          setSpeed(event.target.value);
        }}></input>

                <p className='DroneDetails'>weight of the Drone</p>
                <input type="text" className='input_text' onChange={(event) => {
          setWeight(event.target.value);
        }}></input>
                <p className='DroneDetails'>Flight time</p>
                <input type="text" className='input_text' onChange={(event) => {
          setTime(event.target.value);
        }}></input>
                <p className='DroneDetails'>Service</p>
                <input type="text" className='input_text' onChange={(event) => {
          setService(event.target.value);
        }}></input>
                <p className='DroneDetails'>Price of service</p>
                <input type="text" className='input_text' onChange={(event) => {
          setPrice(event.target.value);
        }}></input>
                <p className='DroneDetails'>Upload image</p>
                <Form.Control
                    type="file"
                    id="drone-picture"
                    aria-describedby="image"
                    onChange={uploadImage}
                  />
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

export default AddDrone
