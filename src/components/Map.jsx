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
import Switch from "react-switch";

import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

import { districts } from "../utils/mapDistrictCoordinates";

const clusterGridSize = 20;

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
  scale: 0.035,
};

const deviceClustererOptions = {
  imagePath:
    "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
  styles: [
    {
      textColor: "white", // Text color of the cluster icon
      textSize: 15, // Text size of the cluster icon
      url: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m3.png", // URL to the cluster icon image
      height: 40, // Height of the cluster icon image
      width: 40, // Width of the cluster icon image
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
  zIndex: 5,
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
  zIndex: 5,
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
  scale: 0.035,
  zIndex: 10,
};

function Map(props) {
  const [libraries] = useState(["places"]);
  const [address, setAddress] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState(districts[0]);
  const [switchClusters, setSwitchClusters] = useState(false);

  const setMapCenter = (coordinates) => {
    props.updateMapCoordinatesCallback(coordinates.lat, coordinates.lng);
  };

  const setMapZoom = (zoom) => {
    props.updateMapZoomCallback(zoom);
  };

  const setSelectedMarker = (marker) => {
    props.updateSelectedMarkerCallback(marker);
  };

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

  const handleSwitchClusters = (state) => {
    setSwitchClusters(!state);
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
      <div className="flex space-x-3">
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
        <label className="font-bold" htmlFor="district">
          Clusters Off/On
        </label>
        <Switch
          checked={switchClusters} // Specify the current state of the switch
          onChange={() => handleSwitchClusters(switchClusters)} // Handle switch state change
        />
      </div>
      <div className="flex-grow relative">
        <LoadScript
          googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}
          libraries={libraries}
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
            center={{ lat: props.centerLatState, lng: props.centerLngState }}
            zoom={props.mapZoomState}
          >
            {/* all markers on dashboard */}
            {Object.keys(props.deviceData)[0] === "all" ? (
              switchClusters ? (
                <MarkerClusterer
                  gridSize={clusterGridSize}
                  options={{
                    ...deviceClustererOptions,
                    zIndex: 5,
                  }}
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
                            text:
                              device.status === "active" ? "\ue412" : "\uf1a8",
                            fontFamily: "Material Icons, sans-serif",
                            color:
                              device.status === "active"
                                ? "#ffffff"
                                : "#000000",
                            fontSize: "20px",
                          }}
                          title="Camera Marker"
                          onClick={() => {
                            setSelectedMarker(device);
                            props.getMapCoordinates(
                              device.latitude,
                              device.longitude
                            );
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
                            text:
                              device.status === "active" ? "\ue51e" : "\ue51f",
                            fontFamily: "Material Icons, sans-serif",
                            color:
                              device.status === "active"
                                ? "#ffffff"
                                : "#000000",
                            fontSize: "20px",
                          }}
                          title="Iot Marker"
                          onClick={() => {
                            setSelectedMarker(device);
                            props.getMapCoordinates(
                              device.latitude,
                              device.longitude
                            );
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
                            text:
                              device.status === "active" ? "\ue539" : "\ue194",
                            fontFamily: "Material Icons, sans-serif",
                            color:
                              device.status === "active"
                                ? "#ffffff"
                                : "#000000",

                            fontSize: "20px",
                          }}
                          title="Drone Marker"
                          onClick={() => {
                            setSelectedMarker(device);
                            props.getMapCoordinates(
                              device.latitude,
                              device.longitude
                            );
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
              ) : (
                props.deviceData.all[selectedDistrict.id].map((device, i) =>
                  device.type === "camera" ? (
                    <Marker
                      key={i}
                      position={{
                        lat: device.latitude,
                        lng: device.longitude,
                      }}
                      label={{
                        text: device.status === "active" ? "\ue412" : "\uf1a8",
                        fontFamily: "Material Icons, sans-serif",
                        color:
                          device.status === "active" ? "#ffffff" : "#000000",
                        fontSize: "20px",
                      }}
                      title="Camera Marker"
                      onClick={() => {
                        setSelectedMarker(device);
                        props.getMapCoordinates(
                          device.latitude,
                          device.longitude
                        );
                        setMapCenter({
                          lat: device.latitude,
                          lng: device.longitude,
                        });
                      }}
                    />
                  ) : device.type === "iot" ? (
                    <Marker
                      key={i}
                      position={{
                        lat: device.latitude,
                        lng: device.longitude,
                      }}
                      label={{
                        text: device.status === "active" ? "\ue51e" : "\ue51f",
                        fontFamily: "Material Icons, sans-serif",
                        color:
                          device.status === "active" ? "#ffffff" : "#000000",
                        fontSize: "20px",
                      }}
                      title="Iot Marker"
                      onClick={() => {
                        setSelectedMarker(device);
                        props.getMapCoordinates(
                          device.latitude,
                          device.longitude
                        );
                        setMapCenter({
                          lat: device.latitude,
                          lng: device.longitude,
                        });
                      }}
                    />
                  ) : device.type === "drone" ? (
                    <Marker
                      key={i}
                      position={{
                        lat: device.latitude,
                        lng: device.longitude,
                      }}
                      label={{
                        text: device.status === "active" ? "\ue539" : "\ue194",
                        fontFamily: "Material Icons, sans-serif",
                        color:
                          device.status === "active" ? "#ffffff" : "#000000",

                        fontSize: "20px",
                      }}
                      title="Drone Marker"
                      onClick={() => {
                        setSelectedMarker(device);
                        props.getMapCoordinates(
                          device.latitude,
                          device.longitude
                        );
                        setMapCenter({
                          lat: device.latitude,
                          lng: device.longitude,
                        });
                      }}
                    />
                  ) : (
                    <></>
                  )
                )
              )
            ) : // camera markers on camera manager
            Object.keys(props.deviceData)[0] === "cameras" ? (
              switchClusters ? (
                <MarkerClusterer
                  gridSize={clusterGridSize}
                  options={{
                    ...deviceClustererOptions,
                    zIndex: 5,
                  }}
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
                            text:
                              device.status === "active" ? "\ue412" : "\uf1a8",
                            fontFamily: "Material Icons, sans-serif",
                            color:
                              device.status === "active"
                                ? "#ffffff"
                                : "#000000",
                            fontSize: "20px",
                          }}
                          title="Camera Marker"
                          onClick={() => {
                            setSelectedMarker(device);
                            props.getMapCoordinates(
                              device.latitude,
                              device.longitude
                            );
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
                props.deviceData.cameras[selectedDistrict.id].map(
                  (device, i) => (
                    <Marker
                      key={i}
                      position={{
                        lat: device.latitude,
                        lng: device.longitude,
                      }}
                      label={{
                        text: device.status === "active" ? "\ue412" : "\uf1a8",
                        fontFamily: "Material Icons, sans-serif",
                        color:
                          device.status === "active" ? "#ffffff" : "#000000",
                        fontSize: "20px",
                      }}
                      title="Camera Marker"
                      onClick={() => {
                        setSelectedMarker(device);
                        props.getMapCoordinates(
                          device.latitude,
                          device.longitude
                        );
                        setMapCenter({
                          lat: device.latitude,
                          lng: device.longitude,
                        });
                      }}
                    />
                  )
                )
              )
            ) : // iot markers on iot manager
            Object.keys(props.deviceData)[0] === "iots" ? (
              switchClusters ? (
                <MarkerClusterer
                  gridSize={clusterGridSize}
                  options={{
                    ...deviceClustererOptions,
                    zIndex: 5,
                  }}
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
                            text:
                              device.status === "active" ? "\ue51e" : "\ue51f",
                            fontFamily: "Material Icons, sans-serif",
                            color:
                              device.status === "active"
                                ? "#ffffff"
                                : "#000000",
                            fontSize: "20px",
                          }}
                          title="Iot Marker"
                          onClick={() => {
                            setSelectedMarker(device);
                            props.getMapCoordinates(
                              device.latitude,
                              device.longitude
                            );
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
                props.deviceData.iots[selectedDistrict.id].map((device, i) => (
                  <Marker
                    key={i}
                    position={{
                      lat: device.latitude,
                      lng: device.longitude,
                    }}
                    label={{
                      text: device.status === "active" ? "\ue51e" : "\ue51f",
                      fontFamily: "Material Icons, sans-serif",
                      color: device.status === "active" ? "#ffffff" : "#000000",
                      fontSize: "20px",
                    }}
                    title="Iot Marker"
                    onClick={() => {
                      setSelectedMarker(device);
                      props.getMapCoordinates(
                        device.latitude,
                        device.longitude
                      );
                      setMapCenter({
                        lat: device.latitude,
                        lng: device.longitude,
                      });
                    }}
                  />
                ))
              )
            ) : // drone markers on drone manager
            Object.keys(props.deviceData)[0] === "drones" ? (
              switchClusters ? (
                <MarkerClusterer
                  gridSize={clusterGridSize}
                  options={{
                    ...deviceClustererOptions,
                    zIndex: 5,
                  }}
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
                            text:
                              device.status === "active" ? "\ue539" : "\ue194",
                            fontFamily: "Material Icons, sans-serif",
                            color:
                              device.status === "active"
                                ? "#ffffff"
                                : "#000000",

                            fontSize: "20px",
                          }}
                          title="Drone Marker"
                          onClick={() => {
                            setSelectedMarker(device);
                            props.getMapCoordinates(
                              device.latitude,
                              device.longitude
                            );
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
                props.deviceData.drones[selectedDistrict.id].map(
                  (device, i) => (
                    <Marker
                      key={i}
                      position={{
                        lat: device.latitude,
                        lng: device.longitude,
                      }}
                      label={{
                        text: device.status === "active" ? "\ue539" : "\ue194",
                        fontFamily: "Material Icons, sans-serif",
                        color:
                          device.status === "active" ? "#ffffff" : "#000000",

                        fontSize: "20px",
                      }}
                      title="Drone Marker"
                      onClick={() => {
                        setSelectedMarker(device);
                        props.getMapCoordinates(
                          device.latitude,
                          device.longitude
                        );
                        setMapCenter({
                          lat: device.latitude,
                          lng: device.longitude,
                        });
                      }}
                    />
                  )
                )
              )
            ) : (
              <></>
            )}

            {/* incident markers */}
            {switchClusters ? (
              <MarkerClusterer
                gridSize={clusterGridSize}
                options={{
                  ...incidentClustererOptions,
                  zIndex: 5,
                }}
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
                        props.getMapCoordinates(
                          incident.latitude,
                          incident.longitude
                        );
                        setMapCenter({
                          lat: incident.latitude,
                          lng: incident.longitude,
                        });
                      }}
                      clusterer={clusterer}
                      zIndex={10}
                    />
                  ))
                }
              </MarkerClusterer>
            ) : (
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
                    props.getMapCoordinates(
                      incident.latitude,
                      incident.longitude
                    );
                    setMapCenter({
                      lat: incident.latitude,
                      lng: incident.longitude,
                    });
                  }}
                  zIndex={10}
                />
              ))
            )}

            {/* congestion markers */}
            {switchClusters ? (
              <MarkerClusterer
                gridSize={clusterGridSize}
                options={{
                  ...congestionClustererOptions,
                  zIndex: 5,
                }}
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
                          props.getMapCoordinates(
                            congestion.latitude,
                            congestion.longitude
                          );
                          setMapCenter({
                            lat: congestion.latitude,
                            lng: congestion.longitude,
                          });
                        }}
                        clusterer={clusterer}
                        zIndex={10}
                      />
                    )
                  )
                }
              </MarkerClusterer>
            ) : (
              props.congestionData &&
              props.congestionData[selectedDistrict.id] &&
              props.congestionData[selectedDistrict.id].map((congestion, i) => (
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
                    props.getMapCoordinates(
                      congestion.latitude,
                      congestion.longitude
                    );
                    setMapCenter({
                      lat: congestion.latitude,
                      lng: congestion.longitude,
                    });
                  }}
                  zIndex={10}
                />
              ))
            )}

            {/* marker pop up window */}
            {props.selectedMarkerState && (
              <InfoWindow
                position={{
                  lat: props.selectedMarkerState.latitude,
                  lng: props.selectedMarkerState.longitude,
                }}
                onCloseClick={() => {
                  setMapCenter({
                    lat: props.selectedMarkerState.latitude,
                    lng: props.selectedMarkerState.longitude,
                  });
                  setSelectedMarker(null);
                  props.getMapCoordinates(null, null);
                }}
                options={{
                  pixelOffset: new window.google.maps.Size(0, -35),
                  disableAutoPan: true,
                }}
              >
                <div className="flex-col w-36 text-md items-center">
                  {props.selectedMarkerState.timestamp && (
                    <h1>Time: {props.selectedMarkerState.timestamp.replace('T', ' ').replace('Z', '')}</h1>
                  )}
                  {props.selectedMarkerState.id && (
                    <h1>ID: {props.selectedMarkerState.id}</h1>
                  )}
                  {props.selectedMarkerState.dist_id && (
                    <h1>District ID: {props.selectedMarkerState.dist_id}</h1>
                  )}
                  {props.selectedMarkerState.status && (
                    <h1>Status: {props.selectedMarkerState.status}</h1>
                  )}
                  {props.selectedMarkerState.latitude && (
                    <h1>Latitude: {props.selectedMarkerState.latitude}</h1>
                  )}
                  {props.selectedMarkerState.longitude && (
                    <h1>Longitude: {props.selectedMarkerState.longitude}</h1>
                  )}
                  {props.selectedMarkerState.type && (
                    <h1>Type: {props.selectedMarkerState.type}</h1>
                  )}
                  {props.selectedMarkerState.description && (
                    <h1>
                      Description: {props.selectedMarkerState.description}
                    </h1>
                  )}
                  {props.selectedMarkerState.location && (
                    <h1>Location: {props.selectedMarkerState.location}</h1>
                  )}
                  {props.selectedMarkerState.area && (
                    <h1>Area: {props.selectedMarkerState.area}</h1>
                  )}
                  {props.selectedMarkerState.speed && (
                    <h1>Speed: {props.selectedMarkerState.speed}</h1>
                  )}
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
