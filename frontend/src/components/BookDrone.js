import { React, useState,useEffect } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import {   Routes, Route, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Row, Col, Form, Card, Badge, Spinner } from 'react-bootstrap';
import { selectIsLoggedIn, selectUser } from '../selectors/appSelector';

import {  Button } from 'react-bootstrap';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import "../components/css/BookDrone.css";
import DroneBookingCatalog from "./DroneBookingCatalog";
import { useDispatch,useSelector  } from "react-redux";
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
var farmtype = "";

const setGrid = (grid) => {
    console.log(grid)
    farmtype = grid
   

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
 const farmdetails = ["1","2","3","1","2","3","1","2","3"]
  const name = useSelector((store) =>store.bookdrone.name);
  const farmtype = useSelector((store) =>store.bookdrone.farmtype);
  const equipment = useSelector((store) =>store.bookdrone.equipment);
  const id = useSelector((store) =>store.bookdrone.id);
  const price = useSelector((store) =>store.bookdrone.price);
  const service = useSelector((store) =>store.bookdrone.service);
  const manufacturer = useSelector((store) =>store.bookdrone.manufacturer);
  const dronedatetime = useSelector((store) =>store.bookdrone.dronedatetime);
  const userid = useSelector((store) =>store.app.user.id);
  const [allitemslist,setAllItemsList] = useState([]);
  const [selectedFarmtype, setSelectedFarmtype] = useState("");  
  const [selectedFarmID, setSelectedFarmID] = useState("");  
  const [selectedfarmimage, setSelectedFarmImage] = useState("");  
  const isLoggedIn = useSelector(selectIsLoggedIn);

  console.log(userid)

  const selectFarm = (farm) => {
    
    console.log("&&&&&&&&&&&&",farm.type)
    setSelectedFarmtype(farm.name)
    setSelectedFarmID(farm.id)
    // if(farm.type==="stock"){
    //   setSelectedFarmImage("live-stock.jpeg")

    // }
    // if(farm.type==="fruit"){
    //   setSelectedFarmImage("fruit-crop.jpeg")


    // }
    // if(farm.type==="nursery"){
    //   setSelectedFarmImage("crop-farm.jpeg")

    // }
    // if(farm.type==="crop"){
    // setSelectedFarmImage("crop-farm.jpeg")

    // }
    
    dispatch(
      bookdrone({
      
        farmtype:selectedFarmtype,
      }))
      console.log(selectedfarmimage)
  }

  
  useEffect( () => {
    
    axios.post(`/api/farmuser`)
      .then(response => {
        console.log("donrappppi------------",response.data.data)
        setAllItemsList(response.data.data)
      });
  } , [isLoggedIn]);
    console.log()
    const dispatch = useDispatch();
    const [droneid, setDroneid] = useState('');
    const [dronename, setDronename] = useState('');
    axios.get('/api/drone')
        .then(response => {
           console.log("sdadadsad",response)
           setDronename(response.data.name)
           setDroneid(response.data.id)
        })
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("aab",farmtype,droneid,dronename)
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
      <br></br><br></br>
      {/* <Grid container spacing={1}>
        <GridItem1  classes={classes} />
        <GridItem2  classes={classes} /><br></br>
        <GridItem3  classes={classes} />
        <GridItem4  classes={classes} />
      </Grid> */}
       <div className="farm_list">
                
                {allitemslist&& allitemslist.map(drone => 
                    <Card  style={{ width: '16rem' }} className={selectedFarmID === drone.id ? "selected" : "farm_disp"}  onClick={() =>  selectFarm (drone)} >
                      
                      <Card.Body style={{backgroundImage: "url(" + drone.type + ".jpeg )"}}>
                        <Card.Title> </Card.Title>
                        {/* <Card.Subtitle className="mb-2 text-muted">{drone.name} </Card.Subtitle> */}
                        <Card.Text>
                          {/* <Badge bg={drone.status ? statusColors[drone.status] : "primary"}>{capitalizeFirst(drone.status)}</Badge> */}
                        </Card.Text>
                      </Card.Body>
                      <Card.Subtitle className="mb-2 text-muted"  ><span ><br></br> {drone.name} </span> </Card.Subtitle>
                </Card>
                
                )}
            </div>
      <br></br>
        {/* <Routes>
            <Route path="/drone-catalog" element={<DroneBookingCatalog />} />
        </Routes> */}
        <button class="button button2" onClick={handleSubmit}> <Link to="/drone-booking-catalog" >Next</Link>
</button> 

        </div>
  );
}

