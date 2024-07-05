import React from "react";

const ClearComponent = ({ clearCompleted }) => {
  return (
    <div>
      <button className="button" onClick={clearCompleted}>
        Clear completed
      </button>
    </div>
  );
};

export default ClearComponent;
