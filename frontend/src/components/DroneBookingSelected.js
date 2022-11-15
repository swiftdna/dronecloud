import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {   Routes, Route, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Row, Col, Form, Card, Badge, Spinner } from 'react-bootstrap';
import { useDispatch,useSelector } from "react-redux";
import {  Button } from 'react-bootstrap';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
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
  const equipment = useSelector((store) =>store.bookdrone.equipment);
  const id = useSelector((store) =>store.bookdrone.id);
  const price = useSelector((store) =>store.bookdrone.price);
  const service = useSelector((store) =>store.bookdrone.service);
  const manufacturer = useSelector((store) =>store.bookdrone.manufacturer);
  const dronedatetime = useSelector((store) =>store.bookdrone.dronedatetime);
  const fromdate = useSelector((store) =>store.bookdrone.fromdate);
  const todate = useSelector((store) =>store.bookdrone.todate);



  return (
    <div>
           <img src="Step3.png"width="300" height="50" />
           <h3>Step 3: Selected Drone
           </h3>
      This is your selected drone<br></br><br></br>
      <Card style={{ width:'43rem',height:'205px',marginLeft:'83px' }}  >
                      <Card.Body >
                        <Card.Title style={{ marginLeft:"250px"}}  >Drone Information</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted"><b>Drone ID:</b> {id}</Card.Subtitle>
                        <Card.Subtitle className="mb-2 text-muted"><b>Drone Farm Type:</b> {farmtype}</Card.Subtitle>

                        <Card.Subtitle className="mb-2 text-muted"><b>Drone Price:</b> {price}</Card.Subtitle>
                        <Card.Subtitle className="mb-2 text-muted"><b>Drone Equipment: </b>{equipment}</Card.Subtitle>
                        <Card.Subtitle className="mb-2 text-muted"><b>Drone Brand:</b> {manufacturer}</Card.Subtitle>
                        <Card.Subtitle className="mb-2 text-muted"><b>Drone Service: </b>{service}</Card.Subtitle>
                        
                        {/* <Card.Subtitle className="mb-2 text-muted">Drone Manufacturer: {drone.equipment}</Card.Subtitle>
                        <Card.Subtitle className="mb-2 text-muted">Drone Service:{drone.equipment}</Card.Subtitle> */}
                        <Card.Text>
                          {/* <Badge bg={drone.status ? statusColors[drone.status] : "primary"}>{capitalizeFirst(drone.status)}</Badge> */}
                        </Card.Text>
                      </Card.Body>
                      Date and Time:
                      <Card.Subtitle className="mb-2 text-muted"> {fromdate}</Card.Subtitle>
                      Location:
                      <Card.Subtitle className="mb-2 text-muted"> {}</Card.Subtitle>
                    </Card>
         
           <div className="navigation">
            <ul>
                <li className="navigationbutton">
                <button class="button button1"> <Link to="/drone-booking-catalog" >Back</Link>
                </button> 
                </li>
                <li className="navigationbutton">
                <button class="button button1"> <Link to="/drone-booking-review" >Next</Link>
                </button> 
                </li>
            </ul>
           
            
           </div>

    </div>
  );
}