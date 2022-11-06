import React, { useEffect } from 'react';
import { selectIsLoggedIn, selectUser } from '../selectors/appSelector';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import "../CSS/dronecatalog.css";
import {Link} from "react-router-dom";
 

function DroneCatalog() {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const userObj = useSelector(selectUser);
    const navigate = useNavigate();
    const userLandedPage = useLocation();
    

    useEffect(() => {
        if (isLoggedIn) {
            console.log('DroneCatalog === user logged in!');
        }
    }, [isLoggedIn]);
    
    const navigateAdd = () => {
        navigate("/admin/addDrone");
    };

    
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
            <Dropdown.Item href="#/action-1">below 200</Dropdown.Item>
             <Dropdown.Item href="#/action-2">below 400</Dropdown.Item>
            <Dropdown.Item href="#/action-3">above 400"</Dropdown.Item>
             </DropdownButton>
             <DropdownButton id="dropdown-item-button" title="Brand" size="lg" >
            <Dropdown.Item href="#/action-1">below 200</Dropdown.Item>
             <Dropdown.Item href="#/action-2">below 400</Dropdown.Item>
            <Dropdown.Item href="#/action-3">above 400"</Dropdown.Item>
             </DropdownButton>
             <DropdownButton id="dropdown-item-button" title="Status" size="lg" >
            <Dropdown.Item href="#/action-1">below 200</Dropdown.Item>
             <Dropdown.Item href="#/action-2">below 400</Dropdown.Item>
            <Dropdown.Item href="#/action-3">above 400"</Dropdown.Item>
             </DropdownButton>
             </div>
            </div>


            <br>
            </br>

         
            <p className='heading-dronecatalog'>3 drones found</p>
            
            <div className="cards">
            {/* <div className="col-md-4 mb-4"> */}
            <div className="card" style={{height:"fit-content",width:"350px"}}>
          
              <div className="card-body">
                  <div className="card-header" >
                <h5 className="card-title">DJI mini SE Data collection</h5>
                <img style={{width:"100px",height:"100px", float:"right-top"}} src="https://blogs.icrc.org/law-and-policy/wp-content/uploads/sites/102/2022/03/Drone-image-1096x620.jpg" alt="" />
                </div>
                <p style={{marginTop:"10px"}} className='heading-dronecatalog'>3-axis gimble</p>
                <p className='heading-dronecatalog'>2.7k camera</p>
                <p className='heading-dronecatalog'>30 minute flight time</p>
                <p className='heading-dronecatalog'>8 m/s flight speed</p>
                <p className='heading-dronecatalog'>249 grams</p>
                <div style={{display:"inline"}}>
                <h4 style={{float:"left"}}>$180 / hour</h4>
                <Link to={`/`} className="btn btn-edit">edit</Link>
                </div>
          </div>
            </div>
            {/* </div> */}
            
        {/* <div className="col-md-4 mb-4"> */}
            <div className="card" style={{height:"fit-content",width:"350px", marginLeft:"20px"}}>
          
             
              
              <div className="card-body">
                  <div className="card-header" >
                <h5 className="card-title">DJI mini SE Data collection</h5>
                <img style={{width:"100px",height:"100px", float:"right-top"}} src="https://blogs.icrc.org/law-and-policy/wp-content/uploads/sites/102/2022/03/Drone-image-1096x620.jpg" alt="" />
                </div>
                <p style={{marginTop:"10px"}} className='heading-dronecatalog'>3-axis gimble</p>
                <p className='heading-dronecatalog'>2.7k camera</p>
                <p className='heading-dronecatalog'>30 minute flight time</p>
                <p className='heading-dronecatalog'>8 m/s flight speed</p>
                <p className='heading-dronecatalog'>249 grams</p>
                <div style={{display:"inline"}}>
                <h4 style={{float:"left"}}>$180 / hour</h4>
                <Link to={`/`} className="btn btn-edit">edit</Link>
                </div>
          </div>
            </div>
            <div className="card add-new" style={{height:"305px",width:"200px",marginLeft:"20px"}} onClick={navigateAdd}>
                <h4>Add a new drone</h4>
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
</svg>
          
             
              
          <div className="card-body">
              
           
            {/* <Link to={`/`} className="btn btn-success btn-sm" style={{borderRadius:"10px" , float:"right"}}>edit</Link> */}
            </div>
      </div>
        
            </div>
                  </div>
          
          
            
           

     
    )
}

export default DroneCatalog;
