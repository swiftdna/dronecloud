import { React, useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import {   Routes, Route, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {  Button } from 'react-bootstrap';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import "../components/css/BookDrone.css";
import DroneBookingCatalog from "./DroneBookingCatalog";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {bookdrone, booking} from "../reducers/bookSlice";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));
var farmtype = "";
const setGrid = (grid) => {
    console.log(grid)
    if(grid === "West Plot A Crop"){
        console.log("1");
        farmtype = "Crop";
    }
    if(grid === "North Plot B Fruit"){
        console.log("2");
        farmtype = "Fruit";
    }
    if(grid === "South Plot C Live Stock"){
        console.log("3");
        farmtype = "Stock";
    }
    if(grid === "East Plot D Nursery"){
        console.log("4");
        farmtype = "Nursery";
    }

}

function GridItem1({ classes }) {
   
  return (
    // From 0 to 600px wide (smart-phones), I take up 12 columns, or the whole device width!
    // From 600-690px wide (tablets), I take up 6 out of 12 columns, so 2 columns fit the screen.
    // From 960px wide and above, I take up 25% of the device (3/12), so 4 columns fit the screen.
    <Grid item xs={6} >
      <Paper className={classes.paper}><img src="crop-farm.jpeg"width="200" height="200" /><br></br>
      <input type="checkbox" name="West Plot A Crop" value="West Plot A Crop" onChange={(event) => {
            setGrid(event.target.value)}}></input>
      West Plot A Crop </Paper>
      
    </Grid>
  );
}
function GridItem2({ classes }) {
    return (
      // From 0 to 600px wide (smart-phones), I take up 12 columns, or the whole device width!
      // From 600-690px wide (tablets), I take up 6 out of 12 columns, so 2 columns fit the screen.
      // From 960px wide and above, I take up 25% of the device (3/12), so 4 columns fit the screen.
      <Grid item xs={6} >
        <Paper className={classes.paper}><img src="fruit-crop.jpeg"width="200" height="200" /><br></br>
        <input type="checkbox" name="North Plot B Fruit" value="North Plot B Fruit" onChange={(event) => {
            setGrid(event.target.value)}}></input>
        North Plot B Fruit
        </Paper>
      </Grid>
    );
  }
  function GridItem3({ classes}) {
    return (
      // From 0 to 600px wide (smart-phones), I take up 12 columns, or the whole device width!
      // From 600-690px wide (tablets), I take up 6 out of 12 columns, so 2 columns fit the screen.
      // From 960px wide and above, I take up 25% of the device (3/12), so 4 columns fit the screen.
      <Grid item xs={6} >
        <Paper className={classes.paper}><img src="live-stock.jpeg"width="200" height="200" /><br></br>
        <input type="checkbox" name="South Plot C Live Stock" value="South Plot C Live Stock" onChange={(event) => {
            setGrid(event.target.value)}}></input>
        South Plot C Live Stock
        </Paper>
      </Grid>
    );
  }
  function GridItem4({ classes }) {
    return (
      // From 0 to 600px wide (smart-phones), I take up 12 columns, or the whole device width!
      // From 600-690px wide (tablets), I take up 6 out of 12 columns, so 2 columns fit the screen.
      // From 960px wide and above, I take up 25% of the device (3/12), so 4 columns fit the screen.
      <Grid item xs={6} >
        <Paper className={classes.paper}><img src="crop-farm.jpeg" width="200" height="200" /><br></br>
        <input type="checkbox" name="East Plot D Nursery" value="East Plot D Nursery" onChange={(event) => {
            setGrid(event.target.value)}}></input>
        East Plot D Nursery
        </Paper>
      </Grid>
    );
  }
  
export default function BookDrone() {
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("aab",farmtype)
        dispatch(
          bookdrone({
            farmtype:farmtype,
          })
        );
      };
  const classes = useStyles();
  return (
    <div>
        <img src="Step1.png"width="300" height="50" />
      <h3>Step 1: Select Farmland Type: </h3>
      Please select the farm land you would like the drone to service on:
      <br></br>
      <Grid container spacing={1}>
        <GridItem1  classes={classes} />
        <GridItem2  classes={classes} /><br></br>
        <GridItem3  classes={classes} />
        <GridItem4  classes={classes} />
      </Grid>
      <br></br>
        {/* <Routes>
            <Route path="/drone-catalog" element={<DroneBookingCatalog />} />
        </Routes> */}
        <button class="button button2" onClick={handleSubmit}> <Link to="/drone-booking-catalog" >Next</Link>
</button> 

        </div>
  );
}

