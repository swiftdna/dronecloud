import { React, useState, Component } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import {   Routes, Route, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {  Button } from 'react-bootstrap';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import "../components/css/BookDrone.css";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {updateProfile} from "../utils";
import axios from 'axios';
import {bookdrone, booking} from "../reducers/bookSlice";
import FarmerParent from './FarmerParent';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        margin: theme.spacing(4),
        width: theme.spacing(35),
        textAlign: "center",
        color: theme.palette.text.secondary,
    }
}));
var role = "";
const setGrid = (grid) => {
    console.log(grid)
    role = grid

}
function GridItem1({ classes }) {

    return (
        <Grid item xs={3.5} >
            <Paper elevation={6} className={classes.paper}><img src="farmer.png"width="250" height="200" /><br></br>
                <input type="radio" name="role" value="farmer" onChange={(event) => {
                    setGrid(event.target.value)}}></input>
                &nbsp;Farmer </Paper>

        </Grid>
    );
}
function GridItem2({ classes }) {
    return (
        <Grid item xs={3.5} >
            <Paper elevation={6} className={classes.paper}><img src="pilot.png"width="250" height="200" /><br></br>
                <input type="radio" name="role" value="pilot" onChange={(event) => {
                    setGrid(event.target.value)}}></input>
                &nbsp;Pilot
            </Paper>
        </Grid>
    );
}


export default function SelectRole() {
    const dispatch = useDispatch();
    const submitRegister = (e) => {
        console.log(role);
        if (role === 'farmer') {
            navigate('/FarmerParent');
        } else if (role === 'pilot') {
            navigate('/PilotParent');
        } else {
            console.log('Saving role failed!');
        }

        // // Make an API call
        // updateProfile(dispatch, {role}, (err, success) => {
        //     if (success) {
        //         if (role === 'farmer') {
        //             navigate('/FarmerParent');
        //         } else if (role === 'pilot') {
        //             navigate('/PilotInfo1');
        //         }
        //     } else {
        //         // Failure
        //         console.log('Saving role failed!');
        //     }
        // });
    }
    const navigate = useNavigate();
    const classes = useStyles();


        return (
            <div className="container pull-down fill-page dc-default">
                {/* <img src="Step1.png"width="300" height="50" /> */}
                <br></br>
                <br></br>
                <h3>Welcome, let's finish your registration! </h3>
                <h5>Select a role to continue: </h5>
                <br></br>
                <Grid container spacing={0}>
                    <GridItem1  classes={classes} />
                    <GridItem2  classes={classes} /><br></br>
                </Grid>
                <br></br>
    
                <button onClick={() => submitRegister()} type="submit" className="btn_panel">Next</button>
            </div>
        );

}

