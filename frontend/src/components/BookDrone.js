import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {   Routes, Route, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {  Button } from 'react-bootstrap';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import "../components/css/BookDrone.css";
import DroneBookingCatalog from "./DroneBookingCatalog"
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));
function GridItem1({ classes }) {
  return (
    // From 0 to 600px wide (smart-phones), I take up 12 columns, or the whole device width!
    // From 600-690px wide (tablets), I take up 6 out of 12 columns, so 2 columns fit the screen.
    // From 960px wide and above, I take up 25% of the device (3/12), so 4 columns fit the screen.
    <Grid item xs={6} >
      <Paper className={classes.paper}><img src="crop-farm.jpeg"width="200" height="200" /><br></br>West Plot A Crop</Paper>
    </Grid>
  );
}
function GridItem2({ classes }) {
    return (
      // From 0 to 600px wide (smart-phones), I take up 12 columns, or the whole device width!
      // From 600-690px wide (tablets), I take up 6 out of 12 columns, so 2 columns fit the screen.
      // From 960px wide and above, I take up 25% of the device (3/12), so 4 columns fit the screen.
      <Grid item xs={6} >
        <Paper className={classes.paper}><img src="fruit-crop.jpeg"width="200" height="200" /><br></br>North Plot B Fruit</Paper>
      </Grid>
    );
  }
  function GridItem3({ classes}) {
    return (
      // From 0 to 600px wide (smart-phones), I take up 12 columns, or the whole device width!
      // From 600-690px wide (tablets), I take up 6 out of 12 columns, so 2 columns fit the screen.
      // From 960px wide and above, I take up 25% of the device (3/12), so 4 columns fit the screen.
      <Grid item xs={6} >
        <Paper className={classes.paper}><img src="live-stock.jpeg"width="200" height="200" /><br></br>South Plot C Live Stock</Paper>
      </Grid>
    );
  }
  function GridItem4({ classes }) {
    return (
      // From 0 to 600px wide (smart-phones), I take up 12 columns, or the whole device width!
      // From 600-690px wide (tablets), I take up 6 out of 12 columns, so 2 columns fit the screen.
      // From 960px wide and above, I take up 25% of the device (3/12), so 4 columns fit the screen.
      <Grid item xs={6} >
        <Paper className={classes.paper}><img src="crop-farm.jpeg" width="200" height="200" /><br></br>East Plot D Nursery</Paper>
        
      </Grid>
    );
  }
export default function BookDrone() {
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
        <button class="button button2"> <Link to="/drone-booking-catalog" >Next</Link>
</button> 
        </div>
  );
}

