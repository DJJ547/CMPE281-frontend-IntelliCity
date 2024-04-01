import React, { useState } from "react";
import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
} from "@react-google-maps/api";

import CameraGreen from "../medias/camera_green_20.png";
import CameraYellow from "../medias/camera_yellow_20.png";
import CameraGray from "../medias/camera_gray_20.png";
import IotGreen from "../medias/iot_green_20.png";
import IotYellow from "../medias/iot_yellow_20.png";
import IotGray from "../medias/iot_gray_20.png";
import DroneGreen from "../medias/drone_green_20.png";
import DroneYellow from "../medias/drone_yellow_20.png";
import DroneGray from "../medias/drone_gray_20.png";

const containerStyle = {
  width: "110vh",
  height: "110%",
};

const defaultCenter = {
  lat: 37.337889,
  lng: -121.893012,
};

const defaultZoom = 12; // This is the desired zoom

function Map(props) {
  const [selectedMarker, setSelectedMarker] = useState("");

  return (
    //AIzaSyCBdsxfnuAQqHRDm-G3ykk2RQDFsYjZl-g
    <LoadScript googleMapsApiKey="AIzaSyCBdsxfnuAQqHRDm-G3ykk2RQDFsYjZl-g">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={defaultZoom}
      >
        {props.data.map((device, i) => (
          <Marker
            key={i}
            position={{ lat: device["lat"], lng: device["lng"] }}
            options={{
              icon:
                device.status === "active" && device.type === "camera"
                  ? CameraGreen
                  : device.status === "defective" && device.type === "camera"
                  ? CameraYellow
                  : device.status === "disabled" && device.type === "camera"
                  ? CameraGray
                  : device.status === "active" && device.type === "iot"
                  ? IotGreen
                  : device.status === "defective" && device.type === "iot"
                  ? IotYellow
                  : device.status === "disabled" && device.type === "iot"
                  ? IotGray
                  : device.status === "active" && device.type === "drone"
                  ? DroneGreen
                  : device.status === "defective" && device.type === "drone"
                  ? DroneYellow
                  : device.status === "disabled" && device.type === "drone"
                  ? DroneGray
                  : "",
            }}
            onClick={() => {
              setSelectedMarker(device);
            }}
          />
        ))}
        {selectedMarker && (
          <InfoWindow
            position={{
              lat: selectedMarker["lat"],
              lng: selectedMarker["lng"],
            }}
            onCloseClick={() => {
              setSelectedMarker("");
            }}
            options={{pixelOffset:new window.google.maps.Size(0,-25)}}
          >
            <div className="text-md">
              <h1>name: {selectedMarker["name"]}</h1>
              <h1>status: {selectedMarker["status"]}</h1>
              <h1>type: {selectedMarker["type"]}</h1>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(Map);
