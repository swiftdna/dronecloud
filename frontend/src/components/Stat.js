import React, {useEffect} from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { selectIsLoggedIn } from '../selectors/appSelector';
import { handleLogoutResponse } from '../actions/app-actions';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Filler, } from 'chart.js';
import { Doughnut, Pie, Line } from 'react-chartjs-2';

ChartJS.register(ArcElement, CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend);

export const data = {
  labels: ['Stopped', 'Registered', 'Connected', 'Active'],
  datasets: [
    {
      label: 'Status of Drones Deployed',
      data: [1, 9, 3, 2],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

export const type_data = {
  labels: ['Surveillance', 'Payload', 'Data Collection'],
  datasets: [
    {
      label: 'Types distribution across drones',
      data: [6, 8, 6],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(75, 192, 192, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(75, 192, 192, 1)'
      ],
      borderWidth: 1,
    },
  ],
};

export const ord_options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Drone bookings over the months',
    },
  },
};

const ord_labels = ['May', 'June', 'July', 'August', 'September', 'October', 'November'];

export const ord_data = {
  labels: ord_labels,
  datasets: [
    {
      fill: true,
      label: 'Surveillance',
      data: [50,13,53,73,35,46,26],
      borderColor: 'rgb(212, 0, 0)',
      backgroundColor: 'rgba(212, 0, 0, 0.5)',
    },
    {
      fill: true,
      label: 'Payload',
      data: [150,80,230,173,101,326,262],
      borderColor: 'rgb(54, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    {
      fill: true,
      label: 'Data Collection',
      data: [250,130,330,173,351,426,462],
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
    },
  ],
};

//create the Navbar Component
function Stats() {
    const isAuthenticated = useSelector(selectIsLoggedIn);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    return(
        <div>
            <h3>Drone Cloud Tracking Statistics</h3>
            <div style={{height:"560px",position:"relative", marginBottom:"1%", padding:"1%", marginTop: '30px'}}>
                <Line options={ord_options} data={ord_data} />
            </div>
            <div style={{height:"400px",position:"relative", marginBottom:"1%", padding:"1%", maxWidth: '400px'}}>
                 <h4 style={{ marginLeft: '-8px' }}>Drone status distribution</h4>
                 <Doughnut data={data} />
            </div>
            <div style={{height:"400px",position:"relative", marginBottom:"1%", padding:"1%", marginTop: '30px', maxWidth: '400px'}}>
                 <h4 style={{ marginLeft: '-8px' }}>Drone types distribution</h4>
                 <Pie data={type_data} />
            </div>
        </div>
    )
}

export default Stats;
