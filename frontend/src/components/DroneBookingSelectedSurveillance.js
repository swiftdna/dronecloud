import {React,useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import {   Routes, Route, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Row, Col, Form, Card, Badge, Spinner } from 'react-bootstrap';
import { useDispatch,useSelector } from "react-redux";
import {  Button } from 'react-bootstrap';
import Paper from "@material-ui/core/Paper";
import {bookdrone, booking} from "../reducers/bookSlice";

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

export default function DroneBookingSelected() {
  const classes = useStyles();
  const farmtype = useSelector((store) => store.bookdrone.farmtype);
  const equipment = useSelector((store) =>store.bookdrone.manufacturer);
  const id = useSelector((store) =>store.bookdrone.id);
  const price = useSelector((store) =>store.bookdrone.price);
  const service = useSelector((store) =>store.bookdrone.service);
  const manufacturer = useSelector((store) =>store.bookdrone.manufacturer);
  const farmland = useSelector((store) =>store.bookdrone.farmland);
  const farmid = useSelector((store) =>store.bookdrone.farmid);
  const duration = useSelector((store) =>store.bookdrone.duration);

  const fromdate = useSelector((store) =>store.bookdrone.fromdate);
  const todate = useSelector((store) =>store.bookdrone.todate);
  const dispatch = useDispatch();


  useEffect( () => {
    dispatch(
      bookdrone({
      id:id,
      service:service,
      price:price,
      manufacturer:equipment,
      brand:manufacturer,
      farmtype:farmtype,
      farmland:farmland,
      farmid:farmid,
      fromdate:fromdate,
      todate:todate,
      duration:duration,
      }))}, []);


  // useEffect( () => {
  //   dispatch(
  //     bookdrone({
  //     from:"2022-01-01",
  //     to:"2022-01-01",
  //     service:"service",
  //     price:"price",
  //     equipment:"equipment",
  //     brand:"manufacturer",
  //     farmtype:"farmtype",
  //     farmland:"farmland",
  //     farmid:"farmid",
  //     }))}, []);
  return (
    <div>
           <img src="Step3.png"width="300" height="50" />
           <h3>Step 3: Selected0000 Drone</h3>
            <div class="mainclass" style={{ width:'23rem',height:'205px',marginLeft:'83px' }}>
            This is your selected drone<br></br><br></br>
      <Card  >
                      <Card.Body >
                        <Card.Title style={{ marginLeft:"80px" }}  >Drone Information</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted"><b>Drone ID:</b> {id}</Card.Subtitle>
                        <Card.Subtitle className="mb-2 text-muted"><b>Drone Farm Type:</b> {farmtype}</Card.Subtitle>

                        <Card.Subtitle className="mb-2 text-muted"><b>Drone Price:</b>$ {price}</Card.Subtitle>
                        <Card.Subtitle className="mb-2 text-muted"><b>Drone Equipment: </b>{equipment}</Card.Subtitle>
                        <Card.Subtitle className="mb-2 text-muted"><b>Drone Brand:</b> {manufacturer}</Card.Subtitle>
                        <Card.Subtitle className="mb-2 text-muted"><b>Drone Service: </b>{service}</Card.Subtitle>
                        
                         <Card.Text>
                        </Card.Text>
                      </Card.Body><br></br>
                      
                      <Card.Title style={{ marginLeft:"110px" }} >Delivery Details</Card.Title>

                      Date and Time:
                      <Card.Subtitle className="mb-2 text-muted"> {fromdate}</Card.Subtitle>
                      Duration:
                      <Card.Subtitle className="mb-2 text-muted"> {duration} days </Card.Subtitle>

                      Location:
                      <Card.Subtitle className="mb-2 text-muted"> 3433 West street road, Santa Clara, 998989</Card.Subtitle>
                      <button style={{ backgroundColor: "#4CAF50",borderRadius:"10px",border:" none",height:"43",width:"259",color:"white",marginLeft:"53px"}}>Selected </button>
                     

                    </Card>
                    <br></br>
                    </div>

                    <Card style={{ marginLeft:"480px",marginTop:"-156px",width:'24rem'}}  >
                      <Card.Body >
                        <Card.Title  >
                          Flight Parameter Specs
                        </Card.Title>
                        <div className="farm_list">
                    
                        <Card  style={{ width: '6.5rem',height:'3.5rem',padding:"4px" }}   >
                        <Card.Subtitle ><b>Flight time</b></Card.Subtitle>
                        <Card.Subtitle ><p style={{fontSize:"12px"}}>30 minutes</p></Card.Subtitle>
                      
                        </Card>
                      
                        <Card  style={{ width: '6rem',height:'3rem',padding:"4px" }}   >
                        <Card.Subtitle ><b>Max Speed</b></Card.Subtitle>
                        <Card.Subtitle ><p style={{fontSize:"12px"}}>P-mode 8m/s</p></Card.Subtitle>
                        
                       
                        </Card>

                        <Card  style={{ width: '6rem',height:'3rem',padding:"4px" }}   >
                        <Card.Subtitle  style={{fontSize:"16px"}}><b>Service</b></Card.Subtitle>
                        <Card.Subtitle ><p style={{fontSize:"12px"}}>6000m</p></Card.Subtitle>
                          
                        </Card>
                        </div>
                        </Card.Body>
                       {/* end of flight */}


                       
                        <Card.Body >
                        <Card.Title  >
                          Camera Specs
                        </Card.Title>
                        <div className="farm_list">
                    
                        <Card  style={{ width: '6rem',height:'3rem',padding:"4px" }}   >
                        <Card.Subtitle style={{fontSize:"16px"}}><b>Sensor</b></Card.Subtitle>
                        <Card.Subtitle ><p style={{fontSize:"12px"}}>1 inch CMOS</p></Card.Subtitle>
                          
                        </Card>
                      
                        <Card  style={{ width: '6rem',height:'3rem',padding:"4px" }}   >
                        <Card.Subtitle style={{fontSize:"16px"}}><b>Lens</b></Card.Subtitle>
                        <Card.Subtitle ><p style={{fontSize:"12px"}}>FOV 84'</p></Card.Subtitle>
                          
                        </Card>

                        <Card  style={{ width: '6rem',height:'3rem',padding:"4px" }}   >
                        <Card.Subtitle  style={{fontSize:"16px"}}><b> Range</b></Card.Subtitle>
                        <Card.Subtitle ><p style={{fontSize:"12px"}}>0-10m</p></Card.Subtitle>
                          
                        </Card>
                        </div>
                        </Card.Body>
                        <Card.Body >
                        <Card.Title  >
                          Image/Video Specs
                        </Card.Title>
                        <div className="farm_list">
                    
                        <Card  style={{ width: '6rem',height:'3rem',padding:"4px" }}   >
                        <Card.Subtitle style={{fontSize:"16px"}}><b>Resolution</b></Card.Subtitle>
                        <Card.Subtitle ><p style={{fontSize:"12px"}}>4K 3840x2150</p></Card.Subtitle>
                        </Card>
                      
                        <Card  style={{ width: '6rem',height:'3rem',padding:"4px" }}   >
                        <Card.Subtitle  style={{fontSize:"16px"}}><b>Lens</b></Card.Subtitle>
                        <Card.Subtitle ><p style={{fontSize:"12px"}}>4K 3840x2150</p></Card.Subtitle>
                        </Card>

                        <Card  style={{ width: '6rem',height:'3rem',padding:"4px" }}   >
                        <Card.Subtitle  style={{fontSize:"16px"}}><b>Rate</b></Card.Subtitle>
                        <Card.Subtitle ><p style={{fontSize:"12px"}}>60fps</p></Card.Subtitle>
                        </Card>
                        </div>
                        </Card.Body>
                        <Card.Body >
                        <Card.Title  >
                          Thermal Sensing System 
                        </Card.Title>
                        <div className="farm_list">
                    
                        <Card  style={{ width: '6rem',height:'3rem',padding:"4px" }}   >
                        <Card.Subtitle  style={{fontSize:"16px"}}><b>Sensor</b></Card.Subtitle>
                        <Card.Subtitle ><p style={{fontSize:"12px"}}>0.2m - 7m</p></Card.Subtitle>
                        </Card>
                      
                        <Card  style={{ width: '6rem',height:'3rem',padding:"4px" }}   >
                        <Card.Subtitle style={{fontSize:"16px"}}><b>FOV</b></Card.Subtitle>
                        <Card.Subtitle ><p style={{fontSize:"12px"}}>70' Horiz</p></Card.Subtitle>
                        </Card>

                        <Card  style={{ width: '6rem',height:'3rem',padding:"4px" }}   >
                        <Card.Subtitle  style={{fontSize:"16px"}}><b>Freq</b></Card.Subtitle>
                        <Card.Subtitle ><p style={{fontSize:"12px"}}>10Hz</p></Card.Subtitle>
                        </Card>
                        </div>
                        </Card.Body>
                  
                       
                    </Card>
                    <br></br>
                 
           <div className="navigation">
            <ul>
                <li className="navigationbutton">
                <button class="button button1"> <Link to="/drone-booking-catalog" >Back</Link>
                </button> 
               
                </li>
                <li className="navigationbutton">
                <button class="button button1" > <Link to="/drone-booking-review" >Next</Link>
                </button> 
                </li>
            </ul>
           
            
           </div>
              
         
           
     

    </div>
  );
}