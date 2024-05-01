import React, { useState } from "react";
import PopupWindow from "../components/PopupWindow";
import AddDevice from "../components/AddDevice";
import ViewDevice from "../components/ViewDevice";

export default function ButtonCRUD(props) {
  //show the add window
  const [showAddWindow, setShowAddWindow] = useState(false);
  function ViewAddWindow() {
    setShowAddWindow(true);
  }
  //show the popup window
  const [showPopup, setShowPopup] = useState(false);
  function ViewPopUp() {
    setShowPopup(true);
  }
  const [showView, setShowView] = useState(false);
  function ViewView() {
    setShowView(true);
  }

  function handleOnClick() {
    //if the button is view, do nothing
    if (props.text === "View") {
      ViewView();
      return;
    }
    //if the button is add, show the add window
    if (props.text === "Add") {
      ViewAddWindow();
      return;
    }
    //if the button is delete or update, show the manament window
    else {
      ViewPopUp();
      return;
    }
  }
  return (
    <div>
      <button
        onClick={handleOnClick}
        className="flex items-center justify-center w-60 h-25 bg-white shadow-lg transform transition duration-500 ease-in-ou hover:scale-110 active:scale-90"
      >
        <img
          src={props.imgSrc}
          alt={props.altText}
          className="w-16 h-16 mr-2 shadow-sm p-2"
        />
        {props.text}
      </button>

      {showPopup && (
        <PopupWindow
          onClick={() => setShowPopup(false)}
          data={props.data}
          callback={props.callback_switch_status}
          callback2={props.callback_delete_device}
        />
      )}

      {showAddWindow && (
        <AddDevice
          onClick={() => setShowAddWindow(false)}
          data={props.data}
          callback3={props.callback3}
          callback4={props.callback4}
        />
      )}
      {showView && (
        <ViewDevice
          data = {props.data}
          onClick={() => setShowView(false)}
          callback_view_device={props.callback_view_device}
        />
      )}
    </div>
  );
}