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
const libraries = ["places"];

const deviceClustererOptions = {
  imagePath: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
  styles: [{
    textColor: "white",
    textSize: 16,
    url: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m3.png",
    height: 45,
    width: 45,
  }],
};

function IOTMap(props) {
  const [address, setAddress] = useState("");

  const setMapCenter = (coordinates) => {
    props.updateMapCoordinatesCallback(coordinates.lat, coordinates.lng);
  };

  const setMapZoom = (zoom) => {
    props.updateMapZoomCallback(zoom);
  };

  const setSelectedMarker = (marker) => {
    props.updateSelectedMarkerCallback(marker);
  };

  const [selectedDistrict, setSelectedDistrict] = useState(districts[0]);

  const handleSearch = async (value) => {
    try {
      const results = await geocodeByAddress(value);
      const latLng = await getLatLng(results[0]);
      setAddress(value);
      setMapCenter(latLng);
      setMapZoom(15);
    } catch (error) {
      alert("Invalid input. Please enter a valid address.");
    }
  };

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
     {/* <div className="flex mb-2">
        <label className="font-bold" htmlFor="addressInput">Enter Address/Location:</label>
        <PlacesAutocomplete
          value={address}
          onChange={setAddress}
          onSelect={handleSearch}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div className="flex-col">
              <input
                className="w-80 bg-gray-300 ml-3"
                {...getInputProps({ placeholder: "Search Places..." })}
              />
              <div className="absolute w-80 top-5 left-48 z-10" style={{ marginTop: "5px" }}>
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion) => (
                  <div {...getSuggestionItemProps(suggestion, { style: suggestion.active ? { backgroundColor: '#41b6e6', cursor: 'pointer' } : { backgroundColor: '#fff', cursor: 'pointer' } })}>
                    {suggestion.description}
                  </div>
                ))}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
      </div>*/}
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
      </div>
      <div className="flex-grow relative">
        <LoadScript
          googleMapsApiKey="AIzaSyCBdsxfnuAQqHRDm-G3ykk2RQDFsYjZl-g"
          libraries={libraries}
        >
          <GoogleMap
            mapContainerStyle={{ width: '55vw', height: '68vh' }}
            center={{ lat: props.centerLatState, lng: props.centerLngState }}
            zoom={props.mapZoomState}
          >
            <MarkerClusterer
              gridSize={clusterGridSize}
              options={deviceClustererOptions}
            >
              {(clusterer) =>
                props.deviceData.map((device, i) => (
                  <Marker
                    key={device.id}
                    position={{ lat: device.latitude, lng: device.longitude }}
                    onClick={() => {
                      props.Selected(device.id);
                      setSelectedMarker(device);
                      setMapCenter({ lat: device.latitude, lng: device.longitude });
                    }}
                    clusterer={clusterer}
                    label={{
                      text:
                        device.enabled ? "\ue51e" : "\ue51f",
                      fontFamily: "Material Icons, sans-serif",
                      color:
                        device.enabled ? "#ffffff" : "#000000",
                      fontSize: "20px",
                    }}
                  />
                ))
              }
            </MarkerClusterer>
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
}

export default React.memo(IOTMap);
