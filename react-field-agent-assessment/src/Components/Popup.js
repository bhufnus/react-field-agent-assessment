import React from "react";
import("./AgentList.css");

function Popup({ handleDeleteTrue, handleDeleteFalse }) {
  return (
    <div className="popup">
      <div className="popup-contents">
        <p>Are you sure you want to delete? </p>
        <button onClick={handleDeleteFalse} className="popup-cancel">
          Cancel
        </button>
        <button onClick={handleDeleteTrue} className="popup-confirm">
          Confirm
        </button>
      </div>
    </div>
  );
}

export default Popup;
