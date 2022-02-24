import React, { useEffect } from "react";
import ReactDOM from "react-dom";

// styles
import "./styles.css"

// STORE
import {
  titleChanged,
  taskDeleted,
  taskCompleted,
  taskCreated,
  loadTasks,
  getTasks,
  getTasksLoadingStatus
} from "./store/task";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import { getError } from "./store/errors";

const App = (params) => {
  const state = useSelector(getTasks());
  const isLoading = useSelector(getTasksLoadingStatus());
  const error = useSelector(getError());
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTasks());
  }, [dispatch]);

  const changeTitle = (taskId) => {
    dispatch(titleChanged(taskId));
  };

  const createTask = () => {
    dispatch(taskCreated());
  };
  const deleteTask = (taskId) => {
    dispatch(taskDeleted(taskId));
  };

  const completedTask = (taskId) => {
    dispatch(taskCompleted(taskId));
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <h1>App</h1>
      <button onClick={() => createTask()}>Create Task</button>
      <ul>
        {state.map((el) => (
          <li key={`${el.id}`}>
            <p>{el.title}</p>
            <p>{`Completed: ${el.completed}`}</p>
            <button onClick={() => completedTask(el.id)}>Completed</button>
            <button onClick={() => changeTitle(el.id)}>Update</button>
            <button onClick={() => deleteTask(el.id)}>Delete</button>
            <hr />
          </li>
        ))}
      </ul>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
