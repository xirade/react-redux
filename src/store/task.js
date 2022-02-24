import faker from "@faker-js/faker";
import { createSlice } from "@reduxjs/toolkit";
import todoService from "../services/todoService";
import { setError } from "./errors";

const initialState = { entities: [], isLoading: true };

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    recived(state, action) {
      state.entities = action.payload;
      state.isLoading = false;
    },
    create(state, action) {
      state.entities.push({...action.payload, id: faker.datatype.number(100)});
      state.isLoading = false;
    },
    update(state, action) {
      const elementIndex = state.entities.findIndex(
        (el) => el.id === action.payload.id
      );
      state.entities[elementIndex] = {
        ...state.entities[elementIndex],
        ...action.payload
      };
    },
    remove(state, action) {
      state.entities = state.entities.filter(
        (el) => el.id !== action.payload.id
      );
    },
    taskRequested(state) {
      state.isLoading = true;
    },
    taskRequestFailed(state, action) {
      state.isLoading = false;
    }
  }
});

const { actions, reducer: taskReducer } = taskSlice;
const { update, remove, recived, create, taskRequested, taskRequestFailed } =
  actions;

export const loadTasks = () => async (dispatch) => {
  dispatch(taskRequested());
  try {
    const data = await todoService.fetch();
    dispatch(recived(data));
  } catch (error) {
    dispatch(taskRequestFailed());
    dispatch(setError(error.message));
  }
};

export const taskCreated = () => async (dispatch) => {
  dispatch(taskRequested());
  try {
    const data = await todoService.post();
    dispatch(create(data));
  } catch (error) {
    dispatch(taskRequestFailed());
    dispatch(setError(error.message));
  }
};

export function taskCompleted(id) {
  return update({ id, completed: true });
}

export function taskDeleted(id) {
  return remove({ id });
}

export function titleChanged(id) {
  return update({ id, title: `New Task ${id}` });
}

export const getTasks = () => (store) => store.tasks.entities;
export const getTasksLoadingStatus = () => (store) => store.tasks.isLoading;

export default taskReducer;
