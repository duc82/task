import React from "react";
import PropTypes from "prop-types";

const Overlay = ({ active, onClick }) => {
  return (
    <div
      className={active ? "overlay active" : "overlay"}
      onClick={onClick}
    ></div>
  );
};

Overlay.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Overlay;
