import React, { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import Search from "./components/Search";
import taskData from "./data/tasks.json";
import ModalAction from "./components/ModalAction";
import Overlay from "./components/Overlay";
import toLowerCaseNonAccentVietnamese from "./utils/toLowerCaseNonAccentVietnamese";
import ViewModal from "./components/ViewModal";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [activeModal, setActiveModal] = useState(false);
  const [typeModal, setTypeModal] = useState("");
  const [values, setValues] = useState({
    id: "",
    name: "",
    level: "small",
  });
  const [activeView, setActiveView] = useState(false);
  const [taskView, setTaskView] = useState(null);

  const update = (task) => {
    openActiveModal("Cập nhật sản phẩm");
    setValues(task);
  };

  const openActiveModal = (type) => {
    setActiveModal(true);
    setTypeModal(type);
  };

  const closeActiveModal = () => setActiveModal(false);

  const addNewTask = (task) => {
    const newTask = [...tasks, task];
    setTasks(newTask);
    localStorage.setItem("tasks", JSON.stringify(newTask));
  };

  const updateTask = () => {
    const indexTask = tasks.findIndex((task) => task.id === values.id);
    const newTask = [...tasks];
    newTask[indexTask] = values;
    setTasks(newTask);
    localStorage.setItem("tasks", JSON.stringify(newTask));
  };

  const deleteTask = (id) => {
    const newTask = tasks.filter((task) => task.id !== id);
    setTasks(newTask);
    localStorage.setItem("tasks", JSON.stringify(newTask));
  };

  const searchTask = (keyword) => {
    if (keyword) {
      const newTasks = tasks.filter((task) =>
        toLowerCaseNonAccentVietnamese(task.name).includes(keyword)
      );
      setTasks(newTasks);
    }
  };

  const clearSearchTask = () => {
    const taskLocal = localStorage.getItem("tasks");
    if (taskLocal) {
      setTasks(JSON.parse(taskLocal));
    }
  };

  const openActiveView = (task) => {
    setActiveView(true);
    setTaskView(task);
  };

  const closeActiveView = () => {
    setActiveView(false);
  };

  useEffect(() => {
    const taskLocal = localStorage.getItem("tasks");
    if (!taskLocal) {
      localStorage.setItem("tasks", JSON.stringify(taskData));
      setTasks(taskData);
      return;
    }
    setTasks(JSON.parse(taskLocal));
  }, []);

  return (
    <main className="main">
      <ModalAction
        active={activeModal}
        closeActive={closeActiveModal}
        type={typeModal}
        addNewTask={addNewTask}
        values={values}
        setValues={setValues}
        updateTask={updateTask}
      />
      <Overlay active={activeModal} onClick={closeActiveModal} />
      <ViewModal
        active={activeView}
        task={taskView}
        closeActiveView={closeActiveView}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "50px",
        }}
      >
        <img
          src={reactLogo}
          width={150}
          height={150}
          alt="React Logo"
          loading="lazy"
          className="rotate"
        />
      </div>
      <div>
        <h2 style={{ marginBottom: "20px" }}>Danh sách nhiệm vụ</h2>
        <Search
          openActive={() => openActiveModal("Sản phẩm mới")}
          searchTask={searchTask}
          clearSearchTask={clearSearchTask}
        />
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th style={{ width: "15%" }}>Id</th>
                <th style={{ width: "40%" }}>Tên nhiệm vụ</th>
                <th style={{ width: "20%" }}>Cấp độ</th>
                <th style={{ width: "25%" }}>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.id}</td>
                  <td>{task.name}</td>
                  <td>
                    <span className={`level ${task.level}`}>{task.level}</span>
                  </td>
                  <td>
                    <div className="actions">
                      <button
                        type="button"
                        className="button success"
                        onClick={() => openActiveView(task)}
                      >
                        Xem
                      </button>
                      <button
                        type="button"
                        className="button warning"
                        onClick={() => update(task)}
                      >
                        Sửa
                      </button>
                      <button
                        type="button"
                        className="button high"
                        onClick={() => deleteTask(task.id)}
                      >
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default App;
