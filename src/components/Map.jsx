import React, { useState } from "react";
import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
} from "@react-google-maps/api";

import CameraGreen from "../medias/map/camera_green_20.png";
import CameraYellow from "../medias/map/camera_yellow_20.png";
import CameraGray from "../medias/map/camera_gray_20.png";
import IotGreen from "../medias/map/iot_green_20.png";
import IotYellow from "../medias/map/iot_yellow_20.png";
import IotGray from "../medias/map/iot_gray_20.png";
import DroneGreen from "../medias/map/drone_green_20.png";
import DroneYellow from "../medias/map/drone_yellow_20.png";
import DroneGray from "../medias/map/drone_gray_20.png";

import { districts } from "../utils/mapDistrictCoordinates";

const containerStyle = {
  width: "110vh",
  height: "110%",
};

const defaultCenter = {
  lat: 40.731588,
  lng: -123.692638,
};

const defaultZoom = 8; // This is the desired zoom

function Map(props) {
  const [selectedMarker, setSelectedMarker] = useState("");
  // State to store the selected district
  const [selectedDistrict, setSelectedDistrict] = useState(0);
  const [selectedMapRegion, setSelectedMapRegion] = useState(districts[0]);

  // Function to handle change in selected district
  const handleDistrictChange = (event) => {
    setSelectedDistrict(event.target.value);
    setSelectedMapRegion(districts[event.target.value]);
  };
  console.log(props.data[1].cameras[0].latitude);

  return (
    <div>
      <div>
        <label htmlFor="district">Select District:</label>
        <select
          id="district"
          value={selectedDistrict}
          onChange={handleDistrictChange}
        >
          <option key={0} value={0}>
            All District
          </option>
          {districts.map((district, i) =>
            district.id === 0 ? null : (
              <option key={i} value={i}>
                District {district.id}
              </option>
            )
          )}
        </select>
      </div>
      <LoadScript googleMapsApiKey="AIzaSyCBdsxfnuAQqHRDm-G3ykk2RQDFsYjZl-g">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={{ lat: selectedMapRegion.lat, lng: selectedMapRegion.lng }}
          zoom={selectedMapRegion.zoom}
        >
          {/* camera markers */}
          {props.data[selectedDistrict].cameras.map((device, i) => (
            <Marker
              key={i}
              position={{ lat: device.latitude, lng: device.longitude }}
              options={{
                icon:
                  device.status === "active"
                    ? CameraGreen
                    : device.status === "defective"
                    ? CameraYellow
                    : device.status === "disabled"
                    ? CameraGray
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
                lat: selectedMarker.latitude,
                lng: selectedMarker.longitude,
              }}
              onCloseClick={() => {
                setSelectedMarker("");
              }}
              options={{ pixelOffset: new window.google.maps.Size(0, -25) }}
            >
              <div className="text-md">
                <h1>id: {selectedMarker["id"]}</h1>
                <h1>status: {selectedMarker["status"]}</h1>
              </div>
            </InfoWindow>
          )}
          {/* iot markers */}
          {props.data[selectedDistrict].iots.map((device, i) => (
            <Marker
              key={i}
              position={{ lat: device.latitude, lng: device.longitude }}
              options={{
                icon:
                  device.status === "active"
                    ? IotGreen
                    : device.status === "defective"
                    ? IotYellow
                    : device.status === "disabled"
                    ? IotGray
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
                lat: selectedMarker.latitude,
                lng: selectedMarker.longitude,
              }}
              onCloseClick={() => {
                setSelectedMarker("");
              }}
              options={{ pixelOffset: new window.google.maps.Size(0, -25) }}
            >
              <div className="text-md">
                <h1>id: {selectedMarker["id"]}</h1>
                <h1>status: {selectedMarker["status"]}</h1>
              </div>
            </InfoWindow>
          )}

          {/* drone markers */}
          {props.data[selectedDistrict].drones.map((device, i) => (
            <Marker
              key={i}
              position={{ lat: device.latitude, lng: device.longitude }}
              options={{
                icon:
                  device.status === "active"
                    ? DroneGreen
                    : device.status === "defective"
                    ? DroneYellow
                    : device.status === "disabled"
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
                lat: selectedMarker.latitude,
                lng: selectedMarker.longitude,
              }}
              onCloseClick={() => {
                setSelectedMarker("");
              }}
              options={{ pixelOffset: new window.google.maps.Size(0, -25) }}
            >
              <div className="text-md">
                <h1>id: {selectedMarker["id"]}</h1>
                <h1>status: {selectedMarker["status"]}</h1>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default React.memo(Map);
