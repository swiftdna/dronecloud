import { Grid } from '@material-ui/core';
import {React, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import {Link} from 'react-router-dom';
import { useDispatch,useSelector } from "react-redux";
import {bookdrone, booking} from "../reducers/bookSlice";

export default function AllDrone(props) {
  console.log(props.dronedetails,"prosspspspspspsp");
  const dronename = props.dronedetails.name;
  console.log(dronename)
  const droneid = props.dronedetails.id;
  const service = props.dronedetails.service;
  const equipment = props.dronedetails.equipment;
  const price = props.dronedetails.price;
  const brand = props.dronedetails.brand;
  const status = props.dronedetails.status;
  const farmtype = useSelector((store) =>store.bookdrone.farmtype);
  console.log("type",farmtype)
  const dispatch = useDispatch();
  const selectDrone = (e) => {
    e.preventDefault();
    dispatch(
        bookdrone({
          id:droneid,
          name:dronename,
          farmtype:farmtype
        })
      );
    };
    

  return (
    <Grid item xs={6} sm={6} style = {{maxWidth: "300px"}} >
    <div className='selectdrone'>

      <Paper>
        <div>
            <b>Drone ID: </b>{droneid}
            <br></br>
            <b>Drone Name: </b>{dronename}
            <br></br>
            <b>Drone Service: </b>{service}
            <br></br>
            <b>Drone Equipment: </b>{equipment}
            <br></br>
            <b>Drone Price: </b>{price}
            <br></br>
            <b>Drone Brand: </b>{brand}
            <br></br>
            <b>Drone Status: </b>{status}


        </div>
       
      </Paper> <br></br>
      <button class="button button2" onClick={selectDrone}> Select
                </button> 
      <br></br> 
    </div>
    </Grid>
  );
}
