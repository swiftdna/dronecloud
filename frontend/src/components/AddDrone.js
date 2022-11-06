import React from 'react'
import { Navigate } from 'react-router'
import "../CSS/addDrone.css"

import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function AddDrone() {
    const navigate=useNavigate()
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
                <p className='DroneDetails'>Product URL</p>
                <input type="text" className='input_text'></input>
                <p className='DroneDetails'>Price of service</p>
                <input type="text" className='input_text'></input>

                <br>
                </br>
                <button variant="secondary" className='dc-default btn btn-secondary'>Back</button>
                <button variant="primary" className='dc-default btn btn-primary' 
                style={{float:"right",margin:"20px",}}
                onClick={addDrone2}>Next</button>
                

                 


                <br />
                <br />
                <br />
                <Button variant="secondary">Back</Button>
                <Button variant="primary" style={{float:"right"}}
                onClick={addDrone2}>Next</Button>

             </div>
         </div>
    </div>
  )
}

export default AddDrone