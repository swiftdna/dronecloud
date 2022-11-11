import React, { useEffect, useState, useRef } from 'react';
import { selectIsLoggedIn, selectUser } from '../selectors/appSelector';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Form, Card, Badge, Spinner } from 'react-bootstrap';
import { MdOutlineClose } from 'react-icons/md';
import { GoogleMap, useJsApiLoader, Polyline } from '@react-google-maps/api';
import Marker from './Marker';
import LiveTracking from './LiveTracking';
import PropTypes from 'prop-types'

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function FarmInfoMap() {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const [map, setMap] = React.useState(null);
    const userObj = useSelector(selectUser);
    const navigate = useNavigate();
    const userLandedPage = useLocation();
    const containerStyle = {
        width: '100%',
        height: '690px'
    };

    const center = {
        lat: 37,
        lng: -122,
        zoom: 10
    };
    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map)
    }, [])


    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyDAY3yhqc24s5SpDcxRXTnObJXbQTBwtV4"
    });

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    // return () => {
    //             if (maps) {
    //                 searchBox.current = null;
    //                 maps.event.clearInstanceListeners(searchBox);
    //             }
    //         };
    //     }, [maps, handleOnPlacesChanged];

        return(
            <div>

                <div style={{ height: '670px', width: '100%', marginTop: '10px' }}>
                {isLoaded ? <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                >
                    }
                </GoogleMap> : ''}
            </div>}
        </div>
    )
}
