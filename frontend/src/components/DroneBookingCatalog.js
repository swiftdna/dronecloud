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
import moment from 'moment';

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
  const [fromdate, setfromDate] = useState(new Date());
  const [todate, settoDate] = useState(new Date());
  const [selectedDroneid, setSelectedDroneID] = useState("");
  const [selectedDroneprice, setSelectedDronePrice] = useState("");
  const [selectedDroneequipment, setSelectedDroneEquipment] = useState("");
  const [selectedDroneservice, setSelectedDroneService] = useState("");
  const [selectedDronebrand, setSelectedDroneBrand] = useState("");
  const [selectedDronestatus, setSelectedDroneStatus] = useState("");
  const date1 = fromdate && new Date(fromdate.toString().substring(4,15))
  const date2 = todate && new Date(todate.toString().substring(4,15))
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

  const farmtype = useSelector((store) =>store.bookdrone.farmtype);
  const farmland = useSelector((store) =>store.bookdrone.farmland);
  const farmid = useSelector((store) =>store.bookdrone.farmid);
  // console.log("ASDASDASDASDA",new Date(fromdate).valueOf())
  // console.log("%^%^%^%^%^",new Date(todate).valueOf())
  
  const filterSubmit = (e) => {
    const from = moment(fromdate).unix();
    const to = moment(todate).unix();
    console.log("SSERRVI",droneservice,droneservice&&droneservice==="surveillance" )
    axios.get(`/api/drones/availability`,{params: {
      from,
      to,
      service:droneservice,
      price:droneprice,
      equipment:droneequipment,
      brand:dronebrand,
      // farmtype:farmtype,
      // farmland:farmland,
      // farmid:farmid,
    }
    
  })
    .then(response => {
      console.log("&&&&",response.data.data);
      setAllItemsList(response.data.data);
    });

  };



  useEffect( () => {
    
    axios.get(`/api/drones`)
      .then(response => {
        console.log("donrappppi",response.data.data)
      setAllItemsList(response.data.data)

      });
  } , []);
  const dispatch = useDispatch();

  const selectDrone = (drone) => {
  setSelectedDroneID(drone.id);
  setSelectedDronePrice(drone.price);
  setSelectedDroneEquipment(drone.service);
  setSelectedDroneStatus(drone.status);
  setSelectedDroneService(drone.service);
  setSelectedDroneBrand(drone.manufacturer);



  }
  


const DroneDispatch = () => {
console.log(fromdate.toString().substring(4,15),selectedDroneid)

  dispatch(
    bookdrone({
      id:selectedDroneid,
      farmtype:farmtype,
      farmland:farmland,
      farmid:farmid,
      manufacturer:selectedDronebrand,
      service:selectedDroneservice,
      equipment:selectedDroneequipment,
      price:selectedDroneprice,
      fromdate:fromdate.toString().substring(4,15),
      todate:todate.toString().substring(4,15),
      duration:diffDays,

    })
  );


}

  return (
    
    <div>
           <img src="Step2.png"width="300" height="50" />
           <h3>Step 2: Drone Catalog</h3>
      Select a service and choose your done <br></br><br></br>
        <div style={{marginLeft:"100px"}}>
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
                  <DateTimePicker
                    amPmAriaLabel="Select AM/PM"
                    calendarAriaLabel="Toggle calendar"
                    clearAriaLabel="Clear value"
                    dayAriaLabel="Day"
                    hourAriaLabel="Hour"
                    maxDetail="second"
                    minuteAriaLabel="Minute"
                    monthAriaLabel="Month"
                    nativeInputAriaLabel="Date and time"
                    onChange={setfromDate}
                    secondAriaLabel="Second"
                    value={fromdate}
                    yearAriaLabel="Year" />
                <DateTimePicker
                    amPmAriaLabel="Select AM/PM"
                    calendarAriaLabel="Toggle calendar"
                    clearAriaLabel="Clear value"
                    dayAriaLabel="Day"
                    hourAriaLabel="Hour"
                    maxDetail="second"
                    minuteAriaLabel="Minute"
                    monthAriaLabel="Month"
                    nativeInputAriaLabel="Date and time"
                    onChange={settoDate}
                    secondAriaLabel="Second"
                    value={todate}
                    yearAriaLabel="Year" />
<<<<<<< HEAD
              
              </ul>
=======
>>>>>>> 9073f3acd869e66c64492b9054607204d76a9eb1
              <div className="gobutton">
                <button class="button button2" onClick={filterSubmit} style = {{padding: "10px",marginLeft:"51px",width:"74"}}> Go</button>
                </div>
                
                <br></br>
            <div className="dronedisplay">




        <div className="drones_list">
                {allitemslist && allitemslist.length&&allitemslist.map(drone => 
                    <Card style={{ width: '13rem' }}  className={selectedDroneid === drone.id ? "selected" : ""} onClick={() => selectDrone(drone)} >
                      <Card.Body>
                        <Card.Title>{drone.name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted"  style={{cole:"black"}}><b>Drone ID:</b> {drone.id}</Card.Subtitle>
                        <Card.Subtitle className="mb-2 text-muted"  style={{cole:"black"}}><b>Drone Price: </b>{drone.price}</Card.Subtitle>
                        <Card.Subtitle className="mb-2 text-muted" style={{cole:"black"}}><b>Drone Equipment: </b>{drone.equipment}</Card.Subtitle>
                     
                        <Card.Text>
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
                  {droneservice&&droneservice==="data collection" && <div>
                  <button class="button button1" onClick={() => DroneDispatch()}><Link to="/drone-booking-selected" >Next</Link>
                </button> 
                    </div>}
                    {droneservice&&droneservice==="payload" && <div>
                  <button class="button button1" onClick={() => DroneDispatch()}><Link to="/drone-booking-selected" >Next</Link>
                </button> 
                    </div>}
                    {droneservice&&droneservice==="surveillance" && <div>
                  <button class="button button1" onClick={() => DroneDispatch()}><Link to="/drone-booking-selected-surveillance" >Next</Link>
                </button> 
                    </div>}
                </li>
            </ul>
           
            
           </div>

    </div>
  );
}