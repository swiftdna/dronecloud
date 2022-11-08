import { React, useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import {   Routes, Route, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {  Button } from 'react-bootstrap';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import "../components/css/BookDrone.css";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from 'axios';
import {bookdrone, booking} from "../reducers/bookSlice";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(1),
        textAlign: "center",
        color: theme.palette.text.secondary
    }
}));
var role = "";
const setGrid = (grid) => {
    console.log(grid)
    role = grid

}
function GridItem1({ classes }) {

    return (
        <Grid item xs={5} >
            <Paper className={classes.paper}><img src="farmer.png"width="250" height="200" /><br></br>
                <input type="radio" name="role" value="Farmer" onChange={(event) => {
                    setGrid(event.target.value)}}></input>
                Farmer </Paper>

        </Grid>
    );
}
function GridItem2({ classes }) {
    return (
        <Grid item xs={5} >
            <Paper className={classes.paper}><img src="pilot.png"width="250" height="200" /><br></br>
                <input type="radio" name="role" value="Pilot" onChange={(event) => {
                    setGrid(event.target.value)}}></input>
                Pilot
            </Paper>
        </Grid>
    );
}
export default function SelectRole() {
    const dispatch = useDispatch();
    const submitRegister = (e) => {
        console.log(role)
        if (role == 'Farmer') {
            navigate('/FarmerInfo1');
        } else if (role == 'Pilot') {
            navigate('/PilotInfo1');
        }
    }
    const navigate = useNavigate();
    const classes = useStyles();
    return (
        <div className="container pull-down fill-page dc-default">
            <img src="Step1.png"width="300" height="50" />
            <h3>Welcome, lets finish your registration </h3>
            Select role to register as:
            <br></br>
            <Grid container spacing={1}>
                <GridItem1  classes={classes} />
                <GridItem2  classes={classes} /><br></br>
            </Grid>
            <br></br>

            <div className="btn_panel">
                <Button variant="primary" onClick={() => submitRegister()} type="submit">Next</Button>
            </div>
        </div>
    );
}

