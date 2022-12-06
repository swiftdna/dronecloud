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
import {bookTheDrone} from '../utils';
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
  const dispatch = useDispatch();
  const name = useSelector((store) =>store.bookdrone.name);
  const farmtype = useSelector((store) =>store.bookdrone.farmtype);
  const equipment = useSelector((store) =>store.bookdrone.equipment);
  const id = useSelector((store) =>store.bookdrone.id);
  const price = useSelector((store) =>store.bookdrone.price);
  const service = useSelector((store) =>store.bookdrone.service);
  const manufacturer = useSelector((store) =>store.bookdrone.manufacturer);
  const dronedatetime = useSelector((store) =>store.bookdrone.dronedatetime);
  const user_id = useSelector((store) =>store.app.user.id);
  const farm_id = useSelector((store) =>store.bookdrone.farmid);
  const land_id = useSelector((store) =>store.bookdrone.farmland);
  const pilot_id = useSelector((store) =>store.bookdrone.pilotid);
  const farm_land = useSelector((store) =>store.bookdrone.farmland);
  const fromdate = useSelector((store) =>store.bookdrone.fromdate);
  const todate = useSelector((store) =>store.bookdrone.todate);
  const fromtype = useSelector((store) =>store.bookdrone.farmtype);

  const total = 55+price;

  // console.log("!!!!!!!!!!!",total,bookingid,user_id,id,land_id,farm_id,pilot_id,fromdate,todate)
  useEffect(() => {
    // console.log('check here ', id, service, user_id, farm_id, land_id, pilot_id, farm_land, fromdate, todate, fromtype);
    // if (id && service && user_id && farm_id && land_id && pilot_id && farm_land && fromdate && todate) {
      bookTheDrone(dispatch, {
        user_id: user_id,
        drone_id: id,
        land_id: land_id,
        farm_id: farm_id,
        pilot_id: pilot_id,
        start_date: fromdate,
        end_date: todate,
        status: "booked",
        service: service,
        farmland: farm_land,
        landtype: fromtype,
      });
    // }
  } , [id, service, user_id, farm_id, land_id, pilot_id, farm_land, fromdate, todate, fromtype]);
  return (
    
    <div>
           <img src="Step5.png"width="300" height="50" />
           <h3>Step 5: Booking Confirmation
           </h3>
      Your Booking is Confirmed, please review the booking details<br></br>

      <span style={{fontSize:"20px"}}>Booking ID</span><br></br> <span style={{fontSize:"15px"}}>  <b>{bookingid}</b></span>
      <Card style={{ width:'18rem',height:'195px',marginLeft:'190px', marginTop:'6px'}}   >
      

      <Card.Body ><b>Order Summary</b>
        <Card.Title ></Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
        {
          <div>
            <Card.Subtitle className="mb-2 text-muted"><span style={{color:"black"}}>Name:</span> Sravya</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted"><span style={{color:"black"}}><img src="calendar.jpeg"  height="30px" width="30px" /> </span> 17/11/1996</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted"> <span style={{color:"black"}}> <img src="location.jpeg" height="20px" width="20px" /></span> 3433 West street road, Santa Clara, 998989</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted"><span style={{color:"black"}}> <img src="contact.jpeg"  height="30px" width="30px" /> </span>889-8585-777</Card.Subtitle>


       
          </div>
        }
        </Card.Subtitle>
        {/* <Card.Subtitle className="mb-2 text-muted">{farmtype}</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">{dronedatetime}</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">  <img src="location.jpeg" height="20px" width="20px" /> </Card.Subtitle>
       
        <Card.Subtitle className="mb-2 text-muted">  <img src="calendar.jpeg"  height="40px" width="40px" />
{fromdate} to {todate}</Card.Subtitle> */}
        
        {/* <Card.Subtitle className="mb-2 text-muted">Drone Manufacturer: {drone.equipment}</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">Drone Service:{drone.equipment}</Card.Subtitle> */}
        <Card.Text>
          {/* <Badge bg={drone.status ? statusColors[drone.status] : "primary"}>{capitalizeFirst(drone.status)}</Badge> */}
        </Card.Text>
      </Card.Body>
      
      {/* <Card.Subtitle className="mb-2 text-muted"> {dronedatetime}</Card.Subtitle> */}
    </Card>
    <Card style={{ width:'18rem',height:'195px',marginLeft:'499px', marginTop:'-194px'}}  >
      <Card.Body ><b>Pilot Summary</b>
        <Card.Title ></Card.Title>
        {
          <div>
            {/* <Card.Subtitle className="mb-2 text-muted"><span style={{color:"black"}}>Name:</span> pilot 2</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted"><span style={{color:"black"}}>License: 758985898</span></Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted"> <span style={{color:"black"}}>Address: </span> 5655 Pilot road,Celina Road</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted"><span style={{color:"black"}}> Contact: </span>912-22-2222</Card.Subtitle> */}


       
          </div>
        }
            <Card.Subtitle className="mb-2 text-muted"><span style={{color:"black"}}>Name:</span> Simon Sol</Card.Subtitle>
                        <Card.Subtitle className="mb-2 text-muted"><span style={{color:"black"}}>License: </span>454544</Card.Subtitle>
                        <Card.Subtitle className="mb-2 text-muted"> <span style={{color:"black"}}>Address: </span> Pilot street east evenue. park road</Card.Subtitle>
                        <Card.Subtitle className="mb-2 text-muted"><span style={{color:"black"}}> Contact: </span>912-8585-888</Card.Subtitle>


         
        {/* <Card.Subtitle className="mb-2 text-muted">Drone Manufacturer: {drone.equipment}</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">Drone Service:{drone.equipment}</Card.Subtitle> */}
        <Card.Text>
          {/* <Badge bg={drone.status ? statusColors[drone.status] : "primary"}>{capitalizeFirst(drone.status)}</Badge> */}
        </Card.Text>
      </Card.Body>
      
      {/* <Card.Subtitle className="mb-2 text-muted"> {dronedatetime}</Card.Subtitle> */}
    </Card>  
      {/* <Card.Body > */} 
                    <Card style={{ width:'34rem',height:'225px',marginLeft:'264px', marginTop:'20px', marginBottom:'90px', borderColor:'white'}}  >
                  
                      {/* <Card.Body > */}
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
{/*                       
                      </Card.Body> */}
                      
                      {/* <Card.Subtitle className="mb-2 text-muted"> {dronedatetime}</Card.Subtitle> */}
                    </Card>   
           <div className="navigation">
            <ul>
                {/* <li className="navigationbutton">
                <button class="button button1"> <Link to="/drone-booking-selected" >Back</Link>
                </button> 
                </li> */}
                <li className="navigationbutton">
                <button class="button button1" style={{marginLeft:"49px"}}> <Link to="/" >My Bookings</Link>
                </button> 
                </li>
            </ul>
           
            
           </div>

    </div>
  );
}