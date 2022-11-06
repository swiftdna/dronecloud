import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {   Routes, Route, NavLink, useNavigate, useLocation } from 'react-router-dom';
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

export default function DroneBookingReview() {
  const classes = useStyles();
  return (
    <div>
           <img src="Step4.png"width="300" height="50" />
           <h3>Step 4: Review Booking
           </h3>
      Please confirm your selected service details. Cost estimation shown below:<br></br><br></br>
         
           <div className="navigation">
            <ul>
                <li className="navigationbutton">
                <button class="button button1"> <Link to="/drone-booking-selected" >Back</Link>
                </button> 
                </li>
                <li className="navigationbutton">
                <button class="button button1"> <Link to="/drone-booking-confirmation" >Next</Link>
                </button> 
                </li>
            </ul>
           
            
           </div>

    </div>
  );
}