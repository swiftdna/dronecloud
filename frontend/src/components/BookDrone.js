import { React, useState,useEffect } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import {   Routes, Route, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Row, Col, Form, Card, Badge, Spinner } from 'react-bootstrap';
import { selectIsLoggedIn, selectUser } from '../selectors/appSelector';

import {  Button } from 'react-bootstrap';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import "../components/css/BookDrone.css";
import DroneBookingCatalog from "./DroneBookingCatalog";
import { useDispatch,useSelector  } from "react-redux";
import { Link } from "react-router-dom";
import axios from 'axios';
import {bookdrone, booking} from "../reducers/bookSlice";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));
var farmtype = "";

const setGrid = (grid) => {
    console.log(grid)
    farmtype = grid
   

}


  
export default function BookDrone() {
 const farmdetails = ["1","2","3","1","2","3","1","2","3"]
  const name = useSelector((store) =>store.bookdrone.name);
  const farmtype = useSelector((store) =>store.bookdrone.farmtype);
  const equipment = useSelector((store) =>store.bookdrone.equipment);
  const id = useSelector((store) =>store.bookdrone.id);
  const price = useSelector((store) =>store.bookdrone.price);
  const service = useSelector((store) =>store.bookdrone.service);
  const manufacturer = useSelector((store) =>store.bookdrone.manufacturer);
  const dronedatetime = useSelector((store) =>store.bookdrone.dronedatetime);
  const userid = useSelector((store) =>store.app.user.id);
  const [allitemslist,setAllItemsList] = useState([]);
  const [allfarmlands,setFarmLandList] = useState([]);
  const [allfarmids,setFarmIDs] = useState([]);

  const [selectedFarmtype, setSelectedFarmtype] = useState("");  
  const [selectedFarmID, setSelectedFarmID] = useState("");  
  const [selectedfarmname, setSelectedFarmName] = useState("");  
  const [selectedfarmland, setSelectedFarmLandID] = useState("");  
  const [selectedfarmimage, setFarmL] = useState("");  

  const isLoggedIn = useSelector(selectIsLoggedIn);

  console.log(userid)

  const selectFarm = (farm) => {
    
    console.log("&&&&&&&&&&&&",farm.type)
    console.log("&&&&&&&&&&&&",farm)

    setSelectedFarmtype(farm.type)
    setSelectedFarmID(farm.id)
    setSelectedFarmName(farm.name)
    dispatch(
      bookdrone({
      
        farmtype:farm.type,
      }))
      axios.post(`/api/farmlands`,{
        userid:userid,
      })
      .then(response => {
        console.log("farmssslandss------------",response.data)
        setFarmLandList(response.data)

       
      });
      console.log(selectedfarmimage)
  }

  
  useEffect( () => {
    
    axios.post(`/api/farmuser`,{
      userid:userid
    })
      .then(response => {
        console.log("donrappppi------------",response.data.data,response.data.data.length)
        setAllItemsList(response.data.data)
        
        

        
      });
  } , [isLoggedIn]);
    console.log("###",allfarmlands)
    const dispatch = useDispatch();
    const [droneid, setDroneid] = useState('');
    const [dronename, setDronename] = useState('');
    axios.get('/api/drone')
        .then(response => {
           console.log("sdadadsad",response)
           setDronename(response.data.name)
           setDroneid(response.data.id)
        })

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("aab",farmtype,droneid,dronename,selectedfarmland)
        dispatch(
          bookdrone({
            farmtype:selectedFarmtype,
            farmland:selectedfarmland,
            farmid:selectedFarmID,
          })
        );
      };
  const classes = useStyles();
  return (
    <div>
        <img src="Step1.png"width="300" height="50" />
      <h3>Step 1: Select Farmland Type: </h3>
      Please select the farm land you would like the drone to service on:
     {selectedFarmID &&
     <div>
      <ul style={{marginLeft:"260px"}}>
             
                <li style={{width:"150px",listStyle: "none",float:" left",marginLeft:"100px"}}>
                        <select name="brand" className="form-select" id="brand" onChange={(event) => {
            setSelectedFarmLandID(event.target.value);
          }} >
                            <option>Select Land</option>
                            {allfarmlands && allfarmlands.map(land => 
                            <option >{land.name}</option>
                            
                            )}
                        </select>
                </li>
                </ul>
      </div>} 
      <br></br><br></br>
      {/* <Grid container spacing={1}>
        <GridItem1  classes={classes} />
        <GridItem2  classes={classes} /><br></br>
        <GridItem3  classes={classes} />
        <GridItem4  classes={classes} />
      </Grid> */}
       
       <div className="farm_list">
              
                {allitemslist&& allitemslist.map(drone => 
                    <Card  style={{ width: '13rem',padding:"4px" }} className={selectedFarmID === drone.id ? "selected" : "farm_disp"}  onClick={() =>  selectFarm (drone)} >
                      
                      <Card.Body style={{backgroundImage: "url(" + drone.type + ".jpeg )"}}>
                        <Card.Title> </Card.Title>
                        {/* <Card.Subtitle className="mb-2 text-muted">{drone.name} </Card.Subtitle> */}
                        <Card.Text>
                          {/* <Badge bg={drone.status ? statusColors[drone.status] : "primary"}>{capitalizeFirst(drone.status)}</Badge> */}
                        </Card.Text>
                      </Card.Body>
                      <Card.Subtitle className="mb-2 text-muted"  ><span ><br></br> {drone.name} </span> </Card.Subtitle>
                </Card>
                
                )}
            </div>
      <br></br>
        {/* <Routes>
            <Route path="/drone-catalog" element={<DroneBookingCatalog />} />
        </Routes> */}
        <button class="button button2" onClick={handleSubmit}> <Link to="/drone-booking-catalog" >Next</Link>
</button> 

        </div>
  );
}

