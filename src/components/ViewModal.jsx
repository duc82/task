import React from "react";
import PropTypes from "prop-types";
import Overlay from "./Overlay";

const ViewModal = ({ active, closeActiveView, task }) => {
  return (
    <>
      <Overlay active={active} onClick={closeActiveView} />
      <div className={active ? "view active" : "view"}>
        <ul>
          <li>Id: {task?.id}</li>
          <li>Tên nhiệm vụ: {task?.name}</li>
          <li>
            Cấp độ:{" "}
            <span style={{ textTransform: "capitalize" }}>{task?.level}</span>
          </li>
        </ul>
      </div>
    </>
  );
};

ViewModal.propTypes = {
  active: PropTypes.bool,
  closeActiveView: PropTypes.func,
  task: PropTypes.object,
};

export default ViewModal;
