import {React,useState,useEffect }  from "react";
import { makeStyles } from "@material-ui/core/styles";
import {   Routes, Route, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Row, Col, Form, Card, Badge, Spinner } from 'react-bootstrap';
import { selectIsLoggedIn, selectUser } from '../selectors/appSelector';
import { useDispatch,useSelector } from "react-redux";
import {  Button } from 'react-bootstrap';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import {bookdrone, booking} from "../reducers/bookSlice";

import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

export default function DroneBookingReview() {
  const [allpilotlist,setAllPilotList] = useState([]);
  const [setuserdetails,setUserDetails] = useState("");
  const classes = useStyles();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const name = useSelector((store) =>store.bookdrone.name);
  const farmtype = useSelector((store) =>store.bookdrone.farmtype);
  const equipment = useSelector((store) =>store.bookdrone.equipment);
  const id = useSelector((store) =>store.bookdrone.id);
  const price = useSelector((store) =>store.bookdrone.price);
  const service = useSelector((store) =>store.bookdrone.service);
  const manufacturer = useSelector((store) =>store.bookdrone.manufacturer);
  const dronedatetime = useSelector((store) =>store.bookdrone.dronedatetime);
  const fromdate = useSelector((store) =>store.bookdrone.fromdate);
  const todate = useSelector((store) =>store.bookdrone.todate);
  const user_id = useSelector((store) =>store.app.user.id);
  const farmland = useSelector((store) =>store.bookdrone.farmland);
  const farmid = useSelector((store) =>store.bookdrone.farmid);

  const dispatch = useDispatch();

  const total = 55+price
//store.profile.data.id
  useEffect(() => {
    const abortController = new AbortController()

    selectPilot()
    selectUser()
      
      return () => {
        abortController.abort()
        // stop the query by aborting on the AbortController on unmount
      }
  } , [isLoggedIn]);

  const selectUser = () => {
    {user_id && axios.get(`/api/users/`+user_id.toString())
    .then(response => {
      setUserDetails(response.data)

    });}
   
    }

    
    const selectPilot = () => {
      axios.post(`/api/pilotfilter`)
        .then(response => {
          console.log("donrappppi------------",response.data)
          setAllPilotList(response.data)
          
        });
      }
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log("dissspay",fromdate,todate,service,price,equipment,manufacturer,farmtype,farmland,farmid,allpilotlist.id)
        dispatch(
          bookdrone({
          from:fromdate,
          to:todate,
          service:service,
          price:price,
          equipment:equipment,
          brand:manufacturer,
          farmtype:farmtype,
          farmland:farmland,
          farmid:farmid,
          pilotid:allpilotlist.id,
          }))
      }
  console.log("&&&&",setuserdetails,allpilotlist)
  return (
    <div>
           <img src="Step4.png"width="300" height="50" />
           <h3>Step 4: Review Booking
           </h3>
      Please confirm your selected service details. Cost estimation shown below:<br></br><br></br>
      <Card style={{ width:'18rem',height:'195px',marginLeft:'190px', marginTop:'-7px'}}  >
     
                      <Card.Body ><b>Order Summary</b>
                        <Card.Title ></Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                        {setuserdetails && 
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
                        {allpilotlist && allpilotlist.length &&
                          <div>
                            {/* <Card.Subtitle className="mb-2 text-muted"><span style={{color:"black"}}>Name:</span> {allpilotlist[0].name}</Card.Subtitle>
                        <Card.Subtitle className="mb-2 text-muted"><span style={{color:"black"}}>License: </span> {allpilotlist[0].license_number}</Card.Subtitle>
                        <Card.Subtitle className="mb-2 text-muted"> <span style={{color:"black"}}>Address: </span> {allpilotlist[0].address}</Card.Subtitle>
                        <Card.Subtitle className="mb-2 text-muted"><span style={{color:"black"}}> Contact: </span>912-8585-888</Card.Subtitle>
 */}


                       
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
                    <Card style={{ width:'34rem',height:'225px',marginLeft:'264px', marginTop:'20px', borderColor:'white'}}  >
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
                        <tr>
                              <td>Payment Method</td>
                              <td>Card Ending in 8898</td>
                              
                            </tr>
                      </div>
                      
                      {/* </Card.Body> */}
                      
                      {/* <Card.Subtitle className="mb-2 text-muted"> {dronedatetime}</Card.Subtitle> */}
                    </Card>   
           <div className="navigation">
            <ul>
                <li className="navigationbutton">
                <button class="button button1"> <Link to="/drone-booking-selected" >Back</Link>
                </button> 
                </li>
                <li className="navigationbutton">
                <button class="button button1"  onClick={handleSubmit}> <Link to="/drone-booking-confirmation" >Make Payment</Link>
                </button> 
                </li>
            </ul>
           
            
           </div>

    </div>
  );
}