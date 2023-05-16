import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

const libraries = ["places"];

const MapComponent = ({origin, destination}) => {
  const [directions, setDirections] = useState(null);
  const [distance, setDistance] = useState(null);

  const directionsCallback = (response) => {
    if (response !== null) {
      if (response.status === "OK") {
        setDirections(response);
        setDistance(response.routes[0].legs[0].distance.text);
      } else {
        console.log("response: ", response);
      }
    }
  };

  useEffect(() => {
    if (origin !== "" && destination !== "") {
      const DirectionsService = new window.google.maps.DirectionsService();
  
      DirectionsService.route(
        {
          origin: origin,
          destination: destination,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);
            setDistance(result.routes[0].legs[0].distance.text);
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    }
  }, [origin, destination]);

  return (
    <LoadScript googleMapsApiKey="AIzaSyBV-zcj7u49pTK9S-JiayGv5g_4MIaofLo" libraries={libraries}>
      <GoogleMap
        id="direction-example"
        mapContainerStyle={{
          height: "400px",
          width: "100%"
        }}
        zoom={14}
        center={origin}
      >
        {
          directions &&
          <DirectionsRenderer
            // required
            options={{
              directions: directions
            }}
          />
        }
      </GoogleMap>
    </LoadScript>
  );
}

export default MapComponent;
