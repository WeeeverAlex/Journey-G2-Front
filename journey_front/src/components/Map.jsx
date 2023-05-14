import React, { useState, useEffect } from "react";
import { GoogleMap, DirectionsService, DirectionsRenderer } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "80vh",
};

const zoom = 15;

function Map({ currentPosition, markerPosition }) {
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
    if (currentPosition && markerPosition) {
      setDirections(null); // Clears the previous directions result before getting new ones
    }
  }, [currentPosition, markerPosition]);

  return (
    <GoogleMap
      id="map"
      mapContainerStyle={mapContainerStyle}
      zoom={zoom}
      center={currentPosition}
    >
      {currentPosition && markerPosition && (
        <DirectionsService
          options={{
            destination: markerPosition,
            origin: currentPosition,
            travelMode: "DRIVING",
          }}
          callback={directionsCallback}
        />
      )}
      {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  );
}

export default Map;
