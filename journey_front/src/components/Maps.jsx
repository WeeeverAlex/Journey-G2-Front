import GoogleMapReact from 'google-map-react';
import { useState } from 'react';


const Map = ({  }) => {
    const [mapLoaded, setMapLoaded] = useState(false);

    const handleApiLoaded = (map, maps) => {
        setMapLoaded(true);
    };
  return (
    <div style={{ height: '500px', width: '100%' }}>
    <GoogleMapReact
        bootstrapURLKeys={{ key: ['AIzaSyBV-zcj7u49pTK9S-JiayGv5g_4MIaofLo'] }}
        defaultCenter={{ lat: -23.5489, lng: -46.6388 }}
        defaultZoom={11}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
      >
        
      </GoogleMapReact>
    
        
    
    
    </div>
  );
};

export default Map;