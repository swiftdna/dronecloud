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
      <div style={{marginLeft:"233px" }}>
      <img src="Step3.png"width="300" height="50"  />
      </div>
           <h3 style={{ marginLeft:"229px" }}>Step 3: Selected Drone</h3>
           <p style={{ marginLeft:"229px" }}>This is your selected drone</p>
           <Card style={{ width:'23rem',marginLeft:"233px", textAlign: 'left', padding: '10px' }}>
              <Card.Body>
                <Card.Title style={{ marginLeft:"100px", marginBottom: '20px'}}>Drone Information</Card.Title>
                <Card.Subtitle className="mb-2 text-muted"><b>Drone ID:</b> {id}</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted"><b>Drone Farm Type:</b> {farmtype ? farmtype : 'Crop'}</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted"><b>Drone Price:</b> {price}</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted"><b>Drone Equipment: </b>{equipment}</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted"><b>Drone Brand:</b> {manufacturer}</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted"><b>Drone Service: </b>{service}</Card.Subtitle>
                <button style={{ backgroundColor: "#4CAF50",borderRadius:"10px",border:"none",height:"43",color:"white",marginTop:"-34px", float: 'right'}}>Selected </button>
              </Card.Body>
           </Card>
          <div className="other_details">
            <h4>Delivery Details</h4>
            <p>Date and Time: {fromdate}</p>
            <p>Duration: {duration} days</p>
            <p>Location: 3433 West street road, Santa Clara, 998989</p>
          </div>
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