import React from "react";
import PropTypes from "prop-types";
import { XMarkIcon } from "@heroicons/react/24/solid";

const ModalAction = ({
  active,
  type,
  closeActive,
  addNewTask,
  values,
  setValues,
  updateTask,
}) => {
  const title = type === "Sản phẩm mới" ? "Sản phẩm mới" : "Cập nhật sản phẩm";
  const titleButton =
    type === "Sản phẩm mới" ? "Thêm sản phẩm" : "Cập nhật sản phẩm";

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === "Sản phẩm mới") {
      addNewTask({ ...values, id: parseInt(values.id) });
      setValues({ id: "", name: "", level: "small" });
    } else {
      updateTask();
    }
    closeActive();
  };

  return (
    <div className={active ? "modal active" : "modal"}>
      <div className="modal-title">
        <p>{title}</p>
        <button type="button" onClick={closeActive}>
          <XMarkIcon width={20} height={20} />
        </button>
      </div>
      <form className="modal-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="id">Id</label>
          <input
            type="text"
            id="id"
            name="id"
            placeholder="Nhập id"
            className="input-search"
            value={values.id}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="name">Tên nhiệm vụ</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Nhập tên nhiệm vụ"
            className="input-search"
            value={values.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="level">Cấp độ</label>
          <select
            name="level"
            id="level"
            className="input-search"
            value={values.level}
            onChange={handleChange}
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <button type="submit" className="button success">
          {titleButton}
        </button>
      </form>
    </div>
  );
};

ModalAction.propTypes = {
  active: PropTypes.bool,
  type: PropTypes.string,
  closeActive: PropTypes.func,
  addNewTask: PropTypes.func,
  values: PropTypes.object,
  setValues: PropTypes.func,
  updateTask: PropTypes.func,
};

export default ModalAction;
