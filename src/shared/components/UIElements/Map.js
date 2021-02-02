import React, { useRef, useEffect ,useState} from 'react';

import './Map.scss';

const Map = props => {
  const mapRef = useRef();

  const { center, zoom ,address} = props;

  useEffect(() => {



    var geocoder = new window.google.maps.Geocoder();

    geocoder.geocode( { 'address': address}, function(results, status) {
  
        if (status == window.google.maps.GeocoderStatus.OK) {
            var latitude = results[0].geometry.location.lat();
            var longitude = results[0].geometry.location.lng();
        }
  
       
  
       const myLatLng={lat: latitude, lng: longitude};
        const map = new window.google.maps.Map(mapRef.current, {
          center: myLatLng,
          zoom: zoom
        });
      
        new window.google.maps.Marker({ position: center, map: map });
      })

  
  }, [center, zoom]);  

  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
    ></div>
  );
};

export default Map;
