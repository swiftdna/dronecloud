import React, { useEffect,useState } from 'react';
import { selectIsLoggedIn, selectUser } from '../selectors/appSelector';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import "../CSS/dronecatalog.css";
import {Link} from "react-router-dom";
import axios  from 'axios';
import {Image} from 'react-bootstrap'
import {updateDrone } from '../utils'; 


function DroneCatalog() {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    
    const navigate = useNavigate();
    const userLandedPage = useLocation();
    const [drones,setDrones]=useState([]);
 
    useEffect(() => {
        if (isLoggedIn) {
            console.log('DroneCatalog === user logged in!');
        }
        getProducts();  
    }, [isLoggedIn]);
    const getProducts=() =>{
      axios.get('/api/droneCatalog/getDrones')
      .then((response) =>{
        const {data: {success, result}} = response;
        if(success){
            console.log(result.length);
            setDrones(result);
          
            // console.log(drones.length);
        } else {
          alert("failed to fetch Drones")
        }
      })
    }
    
    const navigateAdd = () => {
        navigate("/admin/addDrone");
    };
    const filterDroneDetails=(filtervalue)=>{
     const filteredDrones = drones?.filter((drone) =>(drone.price < filtervalue));
      setDrones(filteredDrones);
      

    }
    const filterStatus=(statusFilter)=>{
      const filterStatus=drones?.filter((drone)=>(drone.status===statusFilter));
      setDrones(filterStatus);

    }


    const renderCards = drones.map((drone) =>
            <div className="card" style={{height:"300px",width:"250px",margin:"5px",borderRadius:"10px"}}>
            {/* <div className="col-md-4 mb-4"> */}
              <div className="card-body" style={{width:"224px",height:"300px"}}>
                  <div className="card-header" style={{width:"224px",height:"100px"}}>
                <h5 className="card-title" style={{alignSelf:"left",width:"100px",marginRight:"10px"}}>{drone.model}</h5>
                  <Image src={drone.image_url} style={{width: '100px', height: '100px', display: 'block',marginRight:"10px"}} />
                </div>
                {/* <p style={{marginTop:"10px"}} className='heading-dronecatalog'>3-axis gimble</p> */}
                <p className='heading-dronecatalog'>{drone.camera}</p>
                <p className='heading-dronecatalog'>30 minute flight time</p>
                <p className='heading-dronecatalog'>8 m/s flight speed</p>
                <p className='heading-dronecatalog'>249 grams</p>
                <div style={{display:"inline"}}>
                <h5 style={{float:"left"}}>${drone.price}/ hour</h5>
                <Link to={`/admin/editDrone/${drone.id}`} className="btn btn-edit">edit</Link>
                </div>
          </div>
           </div>
        )

    
    return(

        <div className="container main-frame drone-catalog">
            <div className="div1-drone-catalog">
            <h1 className='header-dronecatalog'> Drone Catalog</h1>
           
            <p className='heading-dronecatalog' style={{marginTop:"5px"}}>Add,update or edit drones to the catalog</p>
            <br>
            </br>


           
            <div className='dropdown'>

            <div className='dropdown-container'>


             <div className='dropdown-container'>

            <DropdownButton id="dropdown-item-button" title="Price" size="lg" >
            <Dropdown.Item  style={{color:"black"}} onClick={()=>filterDroneDetails(200)} >below 200</Dropdown.Item>
             <Dropdown.Item  style={{color:"black"}} onClick={()=>filterDroneDetails(200)}>below 400</Dropdown.Item>
            <Dropdown.Item  style={{color:"black"}} onClick={()=>filterDroneDetails(200)}>below 1000</Dropdown.Item>
             </DropdownButton>
           
             <DropdownButton id="dropdown-item-button" title="Status" size="lg" >
            <Dropdown.Item href="#/action-1" style={{color:"black"}} onClick={()=>filterStatus("added")}>Added</Dropdown.Item>
             <Dropdown.Item href="#/action-2" style={{color:"black"}} onClick={()=>filterStatus("registered")}>Registerd</Dropdown.Item>
            <Dropdown.Item href="#/action-3" style={{color:"black"}} onClick={()=>filterStatus("deleted")}>Deleted</Dropdown.Item>
            <Dropdown.Item href="#/action-3" style={{color:"black"}} onClick={()=>filterStatus("available")}>Available</Dropdown.Item>
             </DropdownButton>
             </div>
            </div>


            <br>
            </br>
            </div>
                
        
                </div>

            <div className='heading-dronecatalog' style={{marginTop:"40px",lineHeight:"12px"}}>{drones.length} drones found</div>
            
           
            {!drones.length ?
                <div style={{ display: 'fl  ex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
                    <h2>No post yet...</h2>
                </div> :
              <div className="container-fluid mx-1">
                <div className="row mt-5 mx-1">
                  <div className="col-md-15">
                    <div className="row">{renderCards}</div>
                    
                  </div>
                </div>
              </div>
              
}
            <div className="card add-new" style={{height:"305px",width:"200px",marginLeft:"40px",borderRadius:"10px"}} onClick={navigateAdd}>
                <h4>Add a new drone</h4>
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
</svg>
          
             
              
          
     
            </div>
            </div>
               
          
          
            
           

     
    )
}

export default DroneCatalog;
