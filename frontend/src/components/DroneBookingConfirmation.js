import {React,useEffect} from "react";
import { v1 as uuidv1 } from 'uuid';
import { makeStyles } from "@material-ui/core/styles";
import {   Routes, Route, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Row, Col, Form, Card, Badge, Spinner } from 'react-bootstrap';
import { useDispatch,useSelector } from "react-redux";
import {  Button } from 'react-bootstrap';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import axios from 'axios';
const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

export default function DroneBookingConfirmation() {
  const classes = useStyles();
  const bookingid = uuidv1();
  const name = useSelector((store) =>store.bookdrone.name);
  const farmtype = useSelector((store) =>store.bookdrone.farmtype);
  const equipment = useSelector((store) =>store.bookdrone.equipment);
  const id = useSelector((store) =>store.bookdrone.id);
  const price = useSelector((store) =>store.bookdrone.price);
  const service = useSelector((store) =>store.bookdrone.service);
  const manufacturer = useSelector((store) =>store.bookdrone.manufacturer);
  const dronedatetime = useSelector((store) =>store.bookdrone.dronedatetime);
  const total = 55+price

  console.log(total,bookingid)
  useEffect( () => {
    
    axios.post(`/api/drone/booking`,{
      user_id:1,
      drone_id:14551,
      land_id:1,
      farm_id:1,
      pilot_id:1,
      start_date:1,
      end_date:1,
    })
      .then(response => {
        
      });
  } , []);
  return (
    
    <div>
           <img src="Step5.png"width="300" height="50" />
           <h3>Step 5: Booking Confirmation
           </h3>
      Your Booking is Confirmed, please review the booking details<br></br>

      <span style={{fontSize:"20px"}}>Booking ID</span><br></br> <span style={{fontSize:"15px"}}>  <b>{bookingid}</b></span>
      <Card style={{ width:'13rem',height:'85px',marginLeft:'13px' }}  >
      

                      <Card.Body ><b>Summary</b>
                        <Card.Title ></Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{name}</Card.Subtitle>
                        <Card.Subtitle className="mb-2 text-muted">{dronedatetime}</Card.Subtitle>
                        
                        {/* <Card.Subtitle className="mb-2 text-muted">Drone Manufacturer: {drone.equipment}</Card.Subtitle>
                        <Card.Subtitle className="mb-2 text-muted">Drone Service:{drone.equipment}</Card.Subtitle> */}
                        <Card.Text>
                          {/* <Badge bg={drone.status ? statusColors[drone.status] : "primary"}>{capitalizeFirst(drone.status)}</Badge> */}
                        </Card.Text>
                      </Card.Body>
                      
                      {/* <Card.Subtitle className="mb-2 text-muted"> {dronedatetime}</Card.Subtitle> */}
                    </Card>
                    <Card style={{ width:'13rem',height:'85px',marginLeft:'643px', marginTop:'-81px'}}  >
                      <Card.Body ><b>Pilot Summary</b>
                        <Card.Title ></Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{name}</Card.Subtitle>
                        <Card.Subtitle className="mb-2 text-muted">{dronedatetime}</Card.Subtitle>
                        
                        {/* <Card.Subtitle className="mb-2 text-muted">Drone Manufacturer: {drone.equipment}</Card.Subtitle>
                        <Card.Subtitle className="mb-2 text-muted">Drone Service:{drone.equipment}</Card.Subtitle> */}
                        <Card.Text>
                          {/* <Badge bg={drone.status ? statusColors[drone.status] : "primary"}>{capitalizeFirst(drone.status)}</Badge> */}
                        </Card.Text>
                      </Card.Body>
                      
                      {/* <Card.Subtitle className="mb-2 text-muted"> {dronedatetime}</Card.Subtitle> */}
                    </Card>  
                    <Card style={{ width:'44rem',height:'225px',marginLeft:'84px', marginTop:'19px'}}  >
                      <Card.Body >
                      <div>
                        <table style={{width:"100%",marginLeft:"-80px"}}>
                      
                            <tr>
                              <td>Drone Cost </td>
                              <td>${price}</td>

                            </tr>
                            <tr>
                              <td>Hours Flights per day</td>
                              <td>$10</td>
                              
                            </tr>
                            <tr>
                              <td>Hours Service Operations per day</td>
                              <td>$5</td>
                              
                            </tr>
                            <tr>
                              <td>Service</td>
                              <td>$10</td>
                              
                            </tr>
                            <tr>
                              <td>Equipment</td>
                              <td>$0</td>
                              
                            </tr>
                            <tr>
                              <td>Shipping</td>
                              <td>$10</td>
                              
                            </tr>
                            <tr>
                              <td>Materials</td>
                              <td>$10</td>
                              
                            </tr>
                            <tr>
                              <td><b>Total Price</b></td>
                              <td>${total}</td>
                              
                            </tr>
                        </table>
                      </div>
                      
                      </Card.Body>
                      
                      {/* <Card.Subtitle className="mb-2 text-muted"> {dronedatetime}</Card.Subtitle> */}
                    </Card>   
           <div className="navigation">
            <ul>
                <li className="navigationbutton">
                <button class="button button1"> <Link to="/drone-booking-selected" >Back</Link>
                </button> 
                </li>
                <li className="navigationbutton">
                <button class="button button1"> <Link to="/drone-booking-confirmation" >Confirm</Link>
                </button> 
                </li>
            </ul>
           
            
           </div>

    </div>
  );
}