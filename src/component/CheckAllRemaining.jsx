import React from "react";

const CheckAllRemaining = ({ remainCount, checkAllHandler }) => {
  return (
    <div className="check-all-container">
      <div>
        <div className="button" onClick={checkAllHandler}>
          Check All
        </div>
      </div>

      <span>
        {remainCount} item{remainCount > 1 ? "s" : ""} remaining
      </span>
    </div>
  );
};

export default CheckAllRemaining;
