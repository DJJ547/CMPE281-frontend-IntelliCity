import React, { useState } from "react";
import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
} from "@react-google-maps/api";

import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

import { districts } from "../utils/mapDistrictCoordinates";

const IncidentIcon = {
  path: faTriangleExclamation.icon[4],
  fillColor: "#dea821",
  fillOpacity: 1,
  anchor: {
    x: faTriangleExclamation.icon[0] / 2, // width
    y: faTriangleExclamation.icon[1], // height
  },
  strokeWeight: 1,
  strokeColor: "#000000",
  scale: 0.045,
};

const CongestionIcon = {
  path: faTriangleExclamation.icon[4],
  fillColor: "#4169E1",
  fillOpacity: 1,
  anchor: {
    x: faTriangleExclamation.icon[0] / 2, // width
    y: faTriangleExclamation.icon[1], // height
  },
  strokeWeight: 1,
  strokeColor: "#000000",
  scale: 0.045,
};

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
  console.log(Object.keys(props.deviceData)[0]);

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
          mapContainerStyle={{
            width: props.container_width,
            height: props.container_height,
          }}
          center={{ lat: selectedMapRegion.lat, lng: selectedMapRegion.lng }}
          zoom={selectedMapRegion.zoom}
        >
          {Object.keys(props.deviceData)[0] === "all" ? (
            props.deviceData.all[selectedDistrict].map((device, i) =>
              device.type === "camera" ? (
                <Marker
                  key={i}
                  position={{ lat: device.latitude, lng: device.longitude }}
                  label={{
                    text: "\ue412",
                    fontFamily: "Material Icons, sans-serif",
                    color: device.status === "active" ? "#ffffff" : "#000000",
                    fontSize: "20px",
                  }}
                  title="Camera Marker"
                  onClick={() => {
                    setSelectedMarker(device);
                  }}
                />
              ) : device.type === "iot" ? (
                <Marker
                  key={i}
                  position={{ lat: device.latitude, lng: device.longitude }}
                  label={{
                    text: "\ue51e",
                    fontFamily: "Material Icons, sans-serif",
                    color: device.status === "active" ? "#ffffff" : "#000000",
                    fontSize: "20px",
                  }}
                  title="Iot Marker"
                  onClick={() => {
                    setSelectedMarker(device);
                  }}
                />
              ) : device.type === "drone" ? (
                <Marker
                  key={i}
                  position={{ lat: device.latitude, lng: device.longitude }}
                  label={{
                    text: "\ue539",
                    fontFamily: "Material Icons, sans-serif",
                    color: device.status === "active" ? "#ffffff" : "#000000",

                    fontSize: "20px",
                  }}
                  title="Drone Marker"
                  onClick={() => {
                    setSelectedMarker(device);
                  }}
                />
              ) : (
                <></>
              )
            )
          ) : Object.keys(props.deviceData)[0] === "cameras" ? (
            props.deviceData.cameras[selectedDistrict].map((device, i) => (
              <Marker
                key={i}
                position={{ lat: device.latitude, lng: device.longitude }}
                label={{
                  text: "\ue412",
                  fontFamily: "Material Icons, sans-serif",
                  color: device.status === "active" ? "#ffffff" : "#000000",
                  fontSize: "20px",
                }}
                title="Camera Marker"
                onClick={() => {
                  setSelectedMarker(device);
                }}
              />
            ))
          ) : Object.keys(props.deviceData)[0] === "iots" ? (
            props.deviceData.iots[selectedDistrict].map((device, i) => (
              <Marker
                key={i}
                position={{ lat: device.latitude, lng: device.longitude }}
                label={{
                  text: "\ue51e",
                  fontFamily: "Material Icons, sans-serif",
                  color: device.status === "active" ? "#ffffff" : "#000000",
                  fontSize: "20px",
                }}
                title="Iot Marker"
                onClick={() => {
                  setSelectedMarker(device);
                }}
              />
            ))
          ) : Object.keys(props.deviceData)[0] === "drones" ? (
            props.deviceData.drones[selectedDistrict].map((device, i) => (
              <Marker
                key={i}
                position={{ lat: device.latitude, lng: device.longitude }}
                label={{
                  text: "\ue539",
                  fontFamily: "Material Icons, sans-serif",
                  color: device.status === "active" ? "#ffffff" : "#000000",

                  fontSize: "20px",
                }}
                title="Drone Marker"
                onClick={() => {
                  setSelectedMarker(device);
                }}
              />
            ))
          ) : (
            <></>
          )}

          {/* incident markers */}
          {props.incidentData &&
            props.incidentData[selectedDistrict].map((incident, i) => (
              <Marker
                key={i}
                position={{ lat: incident.latitude, lng: incident.longitude }}
                icon={IncidentIcon}
                title="Incident Marker"
                onClick={() => {
                  setSelectedMarker(incident);
                }}
              />
            ))}

          {/* congestion markers */}
          {props.congestionData &&
            props.congestionData[selectedDistrict].map((congestion, i) => (
              <Marker
                key={i}
                position={{
                  lat: congestion.latitude,
                  lng: congestion.longitude,
                }}
                icon={CongestionIcon}
                title="Incident Marker"
                onClick={() => {
                  setSelectedMarker(congestion);
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
