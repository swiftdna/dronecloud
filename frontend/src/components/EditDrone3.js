import React from 'react'
import { useNavigate } from 'react-router-dom';
function EditDrone3() {
    const navigate=useNavigate();
   
    const editDrone2=()=>{
        navigate("/admin/addDrone2")
    }
        
      return (
        <div className="container main-frame">
             <div className="div1-drone-catalog">
                <h2 className='header-dronecatalog' style={{marginLeft:"100px"}}> Edit Drone</h2>
    
                <p className='heading-dronecatalog' style={{marginTop:"10px",marginLeft:"100px"}}>Edit details of the selected drone</p>
             </div>
             <div>
                 <div className=' droneDetails'>
                     <p className="DroneInfo">Drone information</p>
                     <p className='DroneDetails'>weight</p>
                    <input type="text" className='input_text'></input>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen-fill" viewBox="0 0 16 16">
  <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"/>
</svg>
                    <p className='DroneDetails'>Availability</p>
                    <input type="text" className='input_text'></input>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen-fill" viewBox="0 0 16 16">
  <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"/>
</svg>
                    <p className='DroneDetails'>Image</p>
                    <input type="text" className='input_text'></input>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen-fill" viewBox="0 0 16 16">
  <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"/>
</svg>
                   
                    <br>
                    </br>
                    <button variant="secondary" className='dc-default btn btn-secondary'>Back</button>
                    <button variant="primary" className='dc-default btn btn-primary' 
                    style={{float:"right",margin:"20px",}}
                    onClick={editDrone2}>Next</button>
                    
    
                     
    
                 </div>
             </div>
        </div>
      )
}

export default EditDrone3