import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "110vh",
  height: "110%",
};

const defaultCenter = {
  lat: 37.337889,
  lng: -121.893012,
};

// const markerPosition = {
//   lat: 37.337889,
//   lng: -121.893012,
// };

const defaultZoom = 12; // This is the desired zoom

function Map(props) {
  return (
    //AIzaSyCBdsxfnuAQqHRDm-G3ykk2RQDFsYjZl-g
    <LoadScript googleMapsApiKey="AIzaSyCBdsxfnuAQqHRDm-G3ykk2RQDFsYjZl-g">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={defaultZoom}
      >
        {props.data["cameras"].map(camera => (
          <Marker
          icon={{
            url: (require('../medias/cameraMarker.png')),
        }}
          position={{lat:camera["lat"], lng:camera["lng"]}}
        />
        ))}
        {props.data["iots"].map(iot => (
          <Marker
          icon={{
            url: (require('../medias/iotMarker.png')),
        }}
          position={{lat:iot["lat"], lng:iot["lng"]}}
        />
        ))}
        {props.data["drones"].map(drone => (
          <Marker
          icon={{
            url: (require('../medias/droneMarker.png')),
        }}
          position={{lat:drone["lat"], lng:drone["lng"]}}
        />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(Map);