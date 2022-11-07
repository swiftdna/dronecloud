import React, { useState } from 'react'
import { Navigate } from 'react-router'
import "../CSS/addDrone.css"
import Axios  from 'axios';
import { useNavigate} from 'react-router-dom';
import { Button } from 'react-bootstrap';

function AddDrone() {
    const navigate=useNavigate()
   
    const [name,setName]=useState(" ");
    const [brand,setBrand]=useState(" ");
    const [camera,setCamera]=useState("");
    const [image,setImage]=useState();
   const [speed,setSpeed]=useState(0);
   const [weight,setWeight]=useState(0);
   const [time,setTime]=useState(0);
   const [service,setService]=useState("");
   const [price,setPrice]=useState(0);
  
   const handleUserData=async()=>
   {
       //e.preventDefault();
       
       var formData = new FormData();
       
       formData.append("image", image);
       
       formData.append("droneName", name);
       formData.append("brand", brand);
 
       formData.append("camera", camera);
       formData.append("speed", speed);
       formData.append("weight", weight);
       formData.append("time",time);

       formData.append("service",service)
       formData.append("price",price)
       

       Axios.post("http://localhost:3000/droneCatalog/add", formData, {
         headers: { "content-Type": "multipart/form-data" },
       }).then((res)=>{
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
                <input type="text" className='input_text'></input>
                <p className='DroneDetails'>Brand</p>
                <input type="text" className='input_text'></input>
                <p className='DroneDetails'>Camera</p>
                <input type="text" className='input_text'></input>
                <p className='DroneDetails'>Speed of Flight</p>
                <input type="text" className='input_text'></input>

                <p className='DroneDetails'>weight of the Drone</p>
                <input type="text" className='input_text'></input>
                <p className='DroneDetails'>Flight time</p>
                <input type="text" className='input_text'></input>
                <p className='DroneDetails'>Service</p>
                <input type="text" className='input_text'></input>
                <p className='DroneDetails'>Price of service</p>
                <input type="text" className='input_text'></input>
                <p className='DroneDetails'>Upload image</p>
                <input
                type="file"
                name="droneImage"
                id="drone-picture"
        
                
                />
                <br>
                </br>
                <button variant="secondary" className='dc-default btn btn-secondary m20'>Back</button>
                <button variant="primary" className='dc-default btn btn-primary m20' 
                style={{float:"right",margin:"20px",}}
                onClick={addDrone2}>Next</button>
             </div>
         </div>
    </div>
  )
}

export default AddDrone
