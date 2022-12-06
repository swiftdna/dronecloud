import React, { useEffect, useState, useRef } from 'react';
import { GoogleMap, useJsApiLoader, Polyline } from '@react-google-maps/api';

const libraries = ["drawing", "places", "geometry"];

function LiveTracker(props) {
    const [map, setMap] = useState(null);
    const [routePaths, setRoutePaths] = useState([]);
    const [plannedRoutePaths, setPlannedRoutePaths] = useState([]);
    const {paths, routepaths} = props;
	
	const center = {
	  lat: 37,
	  lng: -122,
	  zoom: 10
	};

	const proptions = {
	  strokeColor: '#0062D0',
	  strokeOpacity: 0.8,
	  strokeWeight: 2,
	  fillColor: '#0062D0',
	  fillOpacity: 0.35,
	  clickable: false,
	  draggable: false,
	  editable: false,
	  visible: true,
	  radius: 30000,
	  paths: [],
	  zIndex: 1
	};

	const containerStyle = {
      width: '100%',
      height: '490px',
      marginTop: '20px',
      marginBottom: '40px'
    };

	const { isLoaded } = useJsApiLoader({
	    id: 'google-map-script',
	    googleMapsApiKey: "AIzaSyDAY3yhqc24s5SpDcxRXTnObJXbQTBwtV4",
	    libraries
	});

	const onLoad = React.useCallback(function callback(map) {
	    const bounds = new window.google.maps.LatLngBounds(center);
	    map.fitBounds(bounds);
	    setMap(map)
	}, []);

	const onUnmount = React.useCallback(function callback(map) {
	    setMap(null)
	}, []);

	const options = {
	  strokeColor: '#FF0000',
	  strokeOpacity: 0.8,
	  strokeWeight: 2,
	  fillColor: '#FF0000',
	  fillOpacity: 0.35,
	  clickable: false,
	  draggable: false,
	  editable: false,
	  visible: true,
	  radius: 30000,
	  paths: [],
	  zIndex: 1
	};

	const onPolyLineLoad = polyline => {
	  const bounds = new window.google.maps.LatLngBounds();
	  routePaths.forEach(path => {
		bounds.extend(path);
	  })
	  map.fitBounds(bounds);
	  setMap(map)
	};

	const onPRPolyLineLoad = polyline => {
	  const bounds = new window.google.maps.LatLngBounds();
	  plannedRoutePaths.forEach(path => {
		bounds.extend(path);
	  })
	  map.fitBounds(bounds);
	  setMap(map)
	};

	const formatPaths = (paths) => {
		const tempPaths = [];
		for (let i = 0; i < paths.length; i++) {
			tempPaths.push({
				lat: paths[i].latitude,
				lng: paths[i].longitude
			});
		}
		options.path = tempPaths;
		return tempPaths;
	}

	useEffect(() => {
		// console.log('paths changed');
		if (!paths || (paths && !paths.length)) {
			return;
		}
		const tempPaths = [];
		for (let i = 0; i < paths.length; i++) {
			tempPaths.push({
				lat: paths[i].latitude,
				lng: paths[i].longitude
			});
		}
		setRoutePaths(tempPaths);
		options.path = tempPaths;
	}, [paths]);

	useEffect(() => {
		if (!routepaths || (routepaths && !routepaths.length)) {
			return;
		}
		const tempPaths = [];
		for (let i = 0; i < routepaths.length; i++) {
			tempPaths.push({
				lat: routepaths[i].location_lat,
				lng: routepaths[i].location_lng
			});
		}
		setPlannedRoutePaths(tempPaths);
		proptions.path = tempPaths;
	}, [routepaths]);

	const fixMapDefaultPosition = () => {
        const bounds = new window.google.maps.LatLngBounds();
        // console.log(routePaths);
        for (let i = 0; i < routePaths.length; i++) {
        	if (!routePaths[i].lat) {
        		continue;
        	}
            const path = {
                lat: routePaths[i].lat,
                lng: routePaths[i].lng
            };
            bounds.extend(path);
        }
        map.setOptions({ maxZoom: 18 });
        map.fitBounds(bounds);
        map.setOptions({ maxZoom: null });
        setMap(map);
    }

    useEffect(() => {
    	if (map) {
			fixMapDefaultPosition();
    	}
    }, [map, routePaths])

	return (<div>
		{isLoaded ? <GoogleMap
	        mapContainerStyle={containerStyle}
	        center={center}
	        zoom={10}
	        onLoad={onLoad}
	        onUnmount={onUnmount}
	      >
	      	{plannedRoutePaths && plannedRoutePaths.length ? <Polyline
	          onLoad={onPRPolyLineLoad}
	          path={plannedRoutePaths}
	          options={proptions}
	        /> : ''}
	        <Polyline
	          onLoad={onPolyLineLoad}
	          path={routePaths}
	          options={options}
	        />
	    </GoogleMap> : ''}
	</div>);
}

export default LiveTracker;