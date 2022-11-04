import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {   Routes, Route, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {  Button } from 'react-bootstrap';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import "../components/css/DroneBookingCatalog.css"
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

export default function DroneBookingCatalog() {
  const classes = useStyles();
  return (
    <div>
           <img src="Step2.png"width="300" height="50" />
           <h3>Step 2: Drone Catalog</h3>
      Select a service and choose your done<br></br><br></br>
         
            <ul >
                    
                 <li class="dronebookdropdown" >
                    
                        <select name="slct" id="slct">
                            <option>Service</option>
                            <option value="1">Operating System</option>
                            <option value="2">Computer Networks</option>
                            <option value="3">Data Structure</option>
                            <option value="4">Algorithm</option>
                            <option value="5">C programming</option>
                            <option value="6">JAVA</option>
                        </select>
                </li>
                <li class="dronebookdropdown">
                        <select name="slct" id="slct">
                            <option>Status</option>
                            <option value="1">Operating System</option>
                            <option value="2">Computer Networks</option>
                            <option value="3">Data Structure</option>
                            <option value="4">Algorithm</option>
                            <option value="5">C programming</option>
                            <option value="6">JAVA</option>
                        </select>
                </li>
                <li class="dronebookdropdown">
                        <select name="slct" id="slct">
                            <option>Price
                            </option>
                            <option value="1">Operating System</option>
                            <option value="2">Computer Networks</option>
                            <option value="3">Data Structure</option>
                            <option value="4">Algorithm</option>
                            <option value="5">C programming</option>
                            <option value="6">JAVA</option>
                        </select>
                </li>
                <li class="dronebookdropdown">
                        <select name="slct" id="slct">
                            <option>Brand</option>
                            <option value="1">Operating System</option>
                            <option value="2">Computer Networks</option>
                            <option value="3">Data Structure</option>
                            <option value="4">Algorithm</option>
                            <option value="5">C programming</option>
                            <option value="6">JAVA</option>
                        </select>
                </li>
                <li class="dronebookdropdown">
                        <select name="slct" id="slct">
                            <option>Equipment</option>
                            <option value="1">Operating System</option>
                            <option value="2">Computer Networks</option>
                            <option value="3">Data Structure</option>
                            <option value="4">Algorithm</option>
                            <option value="5">C programming</option>
                            <option value="6">JAVA</option>
                        </select>
                </li>
                <li class="dronebookdropdown">
                        <select name="slct" id="slct">
                            <option>Status</option>
                            <option value="1">Operating System</option>
                            <option value="2">Computer Networks</option>
                            <option value="3">Data Structure</option>
                            <option value="4">Algorithm</option>
                            <option value="5">C programming</option>
                            <option value="6">JAVA</option>
                        </select>
                </li>
            </ul>
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