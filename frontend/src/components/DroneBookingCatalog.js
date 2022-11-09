import {React, useState,useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import {   Routes, Route, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Row, Col, Form, Card, Badge, Spinner } from 'react-bootstrap';
import {  Button } from 'react-bootstrap';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import "../components/css/DroneBookingCatalog.css"
import { Link } from "react-router-dom";
import DateTimePicker from 'react-datetime-picker';
import { useDispatch,useSelector } from "react-redux";
import {bookdrone, booking} from "../reducers/bookSlice";
import AllDrone from "./AllDrone";
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));




export default function DroneBookingCatalog() {
  const classes = useStyles();

  const [droneservice, setService] = useState("");
  const [dronedatetime, setDatetime] = useState("");
  const [droneprice, setPrice] = useState("");
  const [dronebrand,  setBrand] = useState("");
  const [droneequipment, setEquipment] = useState("");
  const [dronestatus, setStatus] = useState("");
  const [allitemslist,setAllItemsList] = useState([])
  const [searchitemslist,setSearchItemsList] = useState([])
  const [fromdate,setfromDate] = useState("");
  const [todate,settoDate] = useState("");
  const [selectedDrone, setSelectedDrone] = useState("");
  const farmtype = useSelector((store) =>store.bookdrone.farmtype);

  const filterSubmit = (e) => {
    e.preventDefault();
  //   console.log("1*********************************",droneservice,dronedatetime,typeof(droneprice),dronebrand,droneequipment,dronestatus);
  //   allitemslist.filter((val)=> {
  //     console.log("1*********************************",val.availablefrom)
  //     setSearchItemsList(searchitemslist=> [...searchitemslist, val]);

      
    
  //   })
  // console.log("***4444444444",searchitemslist)
    axios.post(`/api/drone/filter`,{service:droneservice.toLowerCase(),brand:dronebrand.toLowerCase(),price:droneprice,equipment:droneequipment.toLowerCase(),status:dronestatus.toLowerCase()})
    .then(response => {
      console.log("go",response)
      setAllItemsList(response.data)
    });

    };
  useEffect( () => {
    
    axios.get(`/api/drone`)
      .then(response => {
        console.log("donrappppi",response.data.data)
      setAllItemsList(response.data.data)

      });
  } , []);
  const dispatch = useDispatch();
     const selectDrone = (drone) => {
      setSelectedDrone(drone.id);
        console.log("clicked",drone);
        dispatch(
          bookdrone({
            id:drone.id,
            name:drone.name,
            farmtype:farmtype,
            manufacturer:drone.manufacturer,
            service:drone.service,
            equipment:drone.equipment,
            price:drone.price,
            dronedatetime:dronedatetime,
            fromdate:fromdate,
            todate:todate,

          })
        );
    }
  return (
    
    <div>
           <img src="Step2.png"width="300" height="50" />
           <h3>Step 2: Drone Catalog</h3>
      Select a service and choose your done <br></br><br></br>
        <div>
            <ul >
                    
                 <li class="dronebookdropdown" >
                    
                        <select className="form-select" name="service" id="service"  onChange={(event) => {
            setService(event.target.value);
          }}>
                            <option>Service</option>
                            <option value="data collection">data collection</option>
                            <option value="surveillance">surveillance</option>
                            <option value="payload">payload</option>
                           
                        </select>
                </li>
                <li class="dronebookdropdown">
                       
          {/* <div className="datatimebutton">
         <DateTimePicker onChange={(event) => {
            setPrice(event.target.value);
          }} /></div> */}



                </li>
                <li class="dronebookdropdown">
                        <select name="price" className="form-select" id="price"  onChange={(event) => {
            setPrice(event.target.value);
          }}>
                            <option>Price  
                            </option>
                            <option value="100"> &lt;$100</option>
                            <option value="200">&lt;$200</option>
                            <option value="300">&lt;$300</option>
                         
                        </select>
                </li>
                <li class="dronebookdropdown">
                        <select name="brand" className="form-select" id="brand"  onChange={(event) => {
            setBrand(event.target.value);
          }}>
                            <option>Brand</option>
                            <option value="DJI">DJI</option>
                            <option value="Parrot">Parrot</option>
                            <option value="Lumenier">Lumenier</option>
                            <option value="Holybro">Holybro</option>
                            <option value="Yuneec">Yuneec</option>
                            <option value="Ariel Robotics"> Ariel Robotics</option>
                        </select>
                </li>
                <li class="dronebookdropdown">
                        <select name="equipment" className="form-select" id="equipment"  onChange={(event) => {
            setEquipment(event.target.value);
          }}>
                            <option>Equipment</option>
                            <option value="camera">camera</option>
                            <option value="thermal camera">thermal camera</option>
                            <option value="LiDAR">LiDAR</option>
                            <option value="pesticide"> pesticide</option>
                            
                        </select>
                </li>
                <li class="dronebookdropdown">
                        <select name="status" className="form-select" id="status"  onChange={(event) => {
            setStatus(event.target.value);
          }}>
                            <option>Status</option>
                            <option value="Available">Available</option>
                            <option value="All">All</option>
                         
                        </select>
                </li>
                <br></br><br></br>
                
                  <li class="dronebookdropdown">
                      <input className="form-date"  type="date"  onChange={(event) => {
            setfromDate(event.target.value);
          }}/>
                      </li>
                <input  className="form-date"  type="date"  onChange={(event) => {
            settoDate(event.target.value);
          }}/>
                
               
              <div className="gobutton">
                <button class="button button2" onClick={filterSubmit} style = {{padding: "10px"}}> Go</button>
                </div>
                <br></br>
            </ul>
            <div className="dronedisplay">
            {/* <ul> */}
              {/* {
            <div className="row">
                 
                 {searchitemslist.length>0 ?   <div className="row">
            {[searchitemslist].map((drone) => (
                 <AllDrone key={drone.name} dronedetails={drone}></AllDrone>
             ))} </div>
             : allitemslist&&    <div className="row">
         {allitemslist.map((drone) => (
                  <AllDrone key={drone.name} dronedetails={drone}></AllDrone>
                  // console.log("asdasd",drone)
                ))} </div> 
             } 
                </div> } */}
   {/* {
            <div className="row">
                 
                 {searchitemslist.length>0 ?   <div className="row">
            {searchitemslist.map((drone) => (
                <AllDrone key={drone.name} dronedetails={drone}></AllDrone>
                // console.log("asdasdsearch",drone)
             ))} </div>
             : allitemslist&&    <div className="row">
         {allitemslist.map((drone) => (
                  <AllDrone key={drone.name} dronedetails={drone}></AllDrone>
                //  console.log("asdasd",drone)
                ))} </div> 
             } 
                </div> } */}
                
                {/* {allitemslist&&    <div className="row">
         {allitemslist.map((drone) => (
                  <AllDrone key={drone.name} dronedetails={drone}></AllDrone>
                //  console.log("asdasd",drone)
                ))} </div> }
//             </ul> */}

<div className="drones_list">
                {allitemslist && allitemslist.map(drone => 
                    <Card style={{ width: '13rem' }}  className={selectedDrone === drone.id ? "selected" : ""} onClick={() => selectDrone(drone)} >
                      <Card.Body>
                        <Card.Title>{drone.name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Drone ID: {drone.id}</Card.Subtitle>
                        <Card.Subtitle className="mb-2 text-muted">Drone Price: {drone.price}</Card.Subtitle>
                        <Card.Subtitle className="mb-2 text-muted">Drone Equipment: {drone.equipment}</Card.Subtitle>
                        {/* <Card.Subtitle className="mb-2 text-muted">Drone Manufacturer: {drone.equipment}</Card.Subtitle>
                        <Card.Subtitle className="mb-2 text-muted">Drone Service:{drone.equipment}</Card.Subtitle> */}
                        <Card.Text>
                          {/* <Badge bg={drone.status ? statusColors[drone.status] : "primary"}>{capitalizeFirst(drone.status)}</Badge> */}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                   
           
                )}
            </div>

            </div>
            </div>
           <div className="navigation">
            <ul>
              
                <li className="navigationbutton">
                <button class="button button1"> <Link to="/book-drone" >Back</Link>
                </button> 
                </li>
                <li className="navigationbutton">
                <button class="button button1"> <Link to="/drone-booking-selected" >Next</Link>
                </button> 
                </li>
            </ul>
           
            
           </div>

    </div>
  );
}