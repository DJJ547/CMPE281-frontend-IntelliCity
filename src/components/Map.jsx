import React, { useState } from "react";
import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
  MarkerClusterer,
} from "@react-google-maps/api";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

import { districts } from "../utils/mapDistrictCoordinates";

const clusterGridSize = 50;

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

const deviceClustererOptions = {
  imagePath:
    "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
  styles: [
    {
      textColor: "white", // Text color of the cluster icon
      textSize: 16, // Text size of the cluster icon
      url: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m3.png", // URL to the cluster icon image
      height: 45, // Height of the cluster icon image
      width: 45, // Width of the cluster icon image
    },
  ],
};

const incidentClustererOptions = {
  imagePath:
    "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
  styles: [
    {
      textColor: "white", // Text color of the cluster icon
      textSize: 16, // Text size of the cluster icon
      url: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m2.png", // URL to the cluster icon image
      height: 45, // Height of the cluster icon image
      width: 45, // Width of the cluster icon image
    },
  ],
};

const congestionClustererOptions = {
  imagePath:
    "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
  styles: [
    {
      textColor: "white", // Text color of the cluster icon
      textSize: 16, // Text size of the cluster icon
      url: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m1.png", // URL to the cluster icon image
      height: 45, // Height of the cluster icon image
      width: 45, // Width of the cluster icon image
    },
  ],
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
  const [address, setAddress] = useState("");
  const [selectedMarker, setSelectedMarker] = useState(null);
  // State to store the selected district
  const [selectedDistrict, setSelectedDistrict] = useState(districts[0]);
  const [mapCenter, setMapCenter] = useState({
    lat: selectedDistrict.lat,
    lng: selectedDistrict.lng,
  });
  const [mapZoom, setMapZoom] = useState(selectedDistrict.zoom);

  const handleSearch = async (value) => {
    try {
      const results = await geocodeByAddress(value);
      const latLng = await getLatLng(results[0]);
      setSelectedDistrict(districts[0]);
      setAddress(value);
      setMapCenter(latLng);
      setMapZoom(15);
    } catch (error) {
      alert("Invalid input. Please enter a valid address.");
      // You can use other methods to display a popup window or handle the error.
    }
  };

  // Function to handle change in selected district
  const handleDistrictChange = (event) => {
    setSelectedDistrict(districts[event.target.value]);
    setMapCenter({
      lat: districts[event.target.value].lat,
      lng: districts[event.target.value].lng,
    });
    setMapZoom(districts[event.target.value].zoom);
  };
  return (
    <div>
      <div className="space-x-3">
        <label className="font-bold" htmlFor="district">
          Select District:
        </label>
        <select
          className="bg-gray-300"
          id="district"
          value={selectedDistrict.id}
          onChange={handleDistrictChange}
        >
          <option key={0} value={0}>
            All Districts
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
      <div className="flex-grow relative">
        <LoadScript
          googleMapsApiKey="AIzaSyCBdsxfnuAQqHRDm-G3ykk2RQDFsYjZl-g"
          libraries={["places"]}
        >
          <PlacesAutocomplete
            value={address}
            onChange={setAddress}
            onSelect={handleSearch}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading,
            }) => (
              <div className="flex mb-2">
                <label className="font-bold" htmlFor="district">
                  Enter Address/Location:
                </label>
                <div className="flex-col">
                  <input
                    className="w-80 bg-gray-300 ml-3"
                    {...getInputProps({ placeholder: "Search Places..." })}
                  />
                  <div
                    className="absolute w-80 top-5 left-48 z-10"
                    style={{ marginTop: "5px" }}
                  >
                    {loading ? <div>Loading...</div> : null}
                    {suggestions.map((suggestion) => {
                      const style = {
                        backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                        cursor: "pointer",
                      };
                      return (
                        <div {...getSuggestionItemProps(suggestion, { style })}>
                          {suggestion.description}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </PlacesAutocomplete>
          <GoogleMap
            mapContainerStyle={{
              width: props.container_width,
              height: props.container_height,
            }}
            center={mapCenter}
            zoom={mapZoom}
          >
            {/* all markers on dashboard */}
            {Object.keys(props.deviceData)[0] === "all" ? (
              <MarkerClusterer
                gridSize={clusterGridSize}
                options={deviceClustererOptions}
              >
                {(clusterer) =>
                  props.deviceData.all[selectedDistrict.id].map((device, i) =>
                    device.type === "camera" ? (
                      <Marker
                        key={i}
                        position={{
                          lat: device.latitude,
                          lng: device.longitude,
                        }}
                        label={{
                          text: device.status === "active" ? "\ue412":"\uf1a8",
                          fontFamily: "Material Icons, sans-serif",
                          color:
                          device.status === "active" ? "#ffffff" : "#000000",
                          fontSize: "20px",
                        }}
                        title="Camera Marker"
                        onClick={() => {
                          setSelectedMarker(device);
                          props.getMapCoordinates(device.latitude, device.longitude);
                          setMapCenter({
                            lat: device.latitude,
                            lng: device.longitude,
                          });
                        }}
                        clusterer={clusterer}
                      />
                    ) : device.type === "iot" ? (
                      <Marker
                        key={i}
                        position={{
                          lat: device.latitude,
                          lng: device.longitude,
                        }}
                        label={{
                          text: device.status === "active" ? "\ue51e" : "\uf239",
                          fontFamily: "Material Icons, sans-serif",
                          color:
                            device.status === "active" ? "#ffffff" : "#000000",
                          fontSize: "20px",
                        }}
                        title="Iot Marker"
                        onClick={() => {
                          setSelectedMarker(device);
                          props.getMapCoordinates(device.latitude, device.longitude);
                          setMapCenter({
                            lat: device.latitude,
                            lng: device.longitude,
                          });
                        }}
                        clusterer={clusterer}
                      />
                    ) : device.type === "drone" ? (
                      <Marker
                        key={i}
                        position={{
                          lat: device.latitude,
                          lng: device.longitude,
                        }}
                        label={{
                          text: device.status === "active" ? "\ue539": "\ue194",
                          fontFamily: "Material Icons, sans-serif",
                          color:
                            device.status === "active" ? "#ffffff" : "#000000",

                          fontSize: "20px",
                        }}
                        title="Drone Marker"
                        onClick={() => {
                          setSelectedMarker(device);
                          props.getMapCoordinates(device.latitude, device.longitude);
                          setMapCenter({
                            lat: device.latitude,
                            lng: device.longitude,
                          });
                        }}
                        clusterer={clusterer}
                      />
                    ) : (
                      <></>
                    )
                  )
                }
              </MarkerClusterer>
            ) : // camera markers on camera manager
            Object.keys(props.deviceData)[0] === "cameras" ? (
              <MarkerClusterer
                gridSize={clusterGridSize}
                options={deviceClustererOptions}
              >
                {(clusterer) =>
                  props.deviceData.cameras[selectedDistrict.id].map(
                    (device, i) => (
                      <Marker
                        key={i}
                        position={{
                          lat: device.latitude,
                          lng: device.longitude,
                        }}
                        label={{
                          text: device.status === "active" ? "\ue412":"\uf1a8",
                          fontFamily: "Material Icons, sans-serif",
                          color:
                            device.status === "active" ? "#ffffff" : "#000000",
                          fontSize: "20px",
                        }}
                        title="Camera Marker"
                        onClick={() => {
                          props.camerashot(device.id);
                          setSelectedMarker(device);
                          props.getMapCoordinates(device.latitude, device.longitude);
                          setMapCenter({
                            lat: device.latitude,
                            lng: device.longitude,
                          });
                        }}
                        clusterer={clusterer}
                      />
                    )
                  )
                }
              </MarkerClusterer>
            ) : // iot markers on iot manager
            Object.keys(props.deviceData)[0] === "iots" ? (
              <MarkerClusterer
                gridSize={clusterGridSize}
                options={deviceClustererOptions}
              >
                {(clusterer) =>
                  props.deviceData.iots[selectedDistrict.id].map(
                    (device, i) => (
                      <Marker
                        key={i}
                        position={{
                          lat: device.latitude,
                          lng: device.longitude,
                        }}
                        label={{
                          text: device.status === "active" ? "\ue51e" : "\uf239",
                          fontFamily: "Material Icons, sans-serif",
                          color:
                            device.status === "active" ? "#ffffff" : "#000000",
                          fontSize: "20px",
                        }}
                        title="Iot Marker"
                        onClick={() => {
                          setSelectedMarker(device);
                          props.getMapCoordinates(device.latitude, device.longitude);
                          setMapCenter({
                            lat: device.latitude,
                            lng: device.longitude,
                          });
                        }}
                        clusterer={clusterer}
                      />
                    )
                  )
                }
              </MarkerClusterer>
            ) : // drone markers on drone manager
            Object.keys(props.deviceData)[0] === "drones" ? (
              <MarkerClusterer
                gridSize={clusterGridSize}
                options={deviceClustererOptions}
              >
                {(clusterer) =>
                  props.deviceData.drones[selectedDistrict.id].map(
                    (device, i) => (
                      <Marker
                        key={i}
                        position={{
                          lat: device.latitude,
                          lng: device.longitude,
                        }}
                        label={{
                          text: device.status === "active" ? "\ue539": "\ue194",
                          fontFamily: "Material Icons, sans-serif",
                          color:
                            device.status === "active" ? "#ffffff" : "#000000",

                          fontSize: "20px",
                        }}
                        title="Drone Marker"
                        onClick={() => {
                          setSelectedMarker(device);
                          props.getMapCoordinates(device.latitude, device.longitude);
                          setMapCenter({
                            lat: device.latitude,
                            lng: device.longitude,
                          });
                        }}
                        clusterer={clusterer}
                      />
                    )
                  )
                }
              </MarkerClusterer>
            ) : (
              <></>
            )}

            {/* incident markers */}
            <MarkerClusterer
              gridSize={clusterGridSize}
              options={incidentClustererOptions}
            >
              {(clusterer) =>
                props.incidentData &&
                props.incidentData[selectedDistrict.id] &&
                props.incidentData[selectedDistrict.id].map((incident, i) => (
                  <Marker
                    key={i}
                    position={{
                      lat: incident.latitude,
                      lng: incident.longitude,
                    }}
                    icon={IncidentIcon}
                    title="Incident Marker"
                    onClick={() => {
                      setSelectedMarker(incident);
                      props.getMapCoordinates(incident.latitude, incident.longitude);
                      setMapCenter({
                        lat: incident.latitude,
                        lng: incident.longitude,
                      });
                    }}
                    clusterer={clusterer} // Pass the clusterer prop to the Marker component
                  />
                ))
              }
            </MarkerClusterer>

            {/* congestion markers */}
            <MarkerClusterer
              gridSize={clusterGridSize}
              options={congestionClustererOptions}
            >
              {(clusterer) =>
                props.congestionData &&
                props.congestionData[selectedDistrict.id] &&
                props.congestionData[selectedDistrict.id].map(
                  (congestion, i) => (
                    <Marker
                      key={i}
                      position={{
                        lat: congestion.latitude,
                        lng: congestion.longitude,
                      }}
                      icon={CongestionIcon}
                      title="Congestion Marker"
                      onClick={() => {
                        setSelectedMarker(congestion);
                        props.getMapCoordinates(congestion.latitude, congestion.longitude);
                        setMapCenter({
                          lat: congestion.latitude,
                          lng: congestion.longitude,
                        });
                      }}
                      clusterer={clusterer} // Pass the clusterer prop to the Marker component
                    />
                  )
                )
              }
            </MarkerClusterer>

            {/* marker pop up window */}
            {selectedMarker && (
              <InfoWindow
                position={{
                  lat: selectedMarker.latitude,
                  lng: selectedMarker.longitude,
                }}
                onCloseClick={() => {
                  setMapCenter({
                    lat: selectedMarker.latitude,
                    lng: selectedMarker.longitude,
                  });
                  setSelectedMarker(null);
                  props.getMapCoordinates(null, null);
                }}
                options={{
                  pixelOffset: new window.google.maps.Size(0, -35),
                  disableAutoPan: true,
                }}
              >
                <div className="w-50 text-md">
                  <h1>ID: {selectedMarker.id}</h1>
                  <h1>District ID: {selectedMarker.dist_id}</h1>
                  <h1>Status: {selectedMarker.status}</h1>
                  <h1>Latitude: {selectedMarker.latitude}</h1>
                  <h1>Longitude: {selectedMarker.longitude}</h1>
                  {selectedMarker.type && <h1>Type: {selectedMarker.type}</h1>}
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
}

export default React.memo(Map);
