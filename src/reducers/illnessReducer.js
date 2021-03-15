import {
  DISPLAY_FETCHED_ILLNESS,
  CREATE_ILLNESS, DELETE_ILLNESS, UPDATE_ILLNESS,
} from '../actions/illness';

let updateObj = {};
let objIndex = {};
let updatedState = [];

export default function illnessReducer(state = [], action) {
  switch (action.type) {
    case DISPLAY_FETCHED_ILLNESS:
      return action.payload;
    case CREATE_ILLNESS:
      return [...state, action.data];
    case DELETE_ILLNESS:
      return state.filter(el => el.id !== action.payload.id);
    case UPDATE_ILLNESS:
      objIndex = state.findIndex(obj => obj.id === action.payload.id);
      updateObj = {
        ...state[objIndex],
        description: action.payload.description,
        name: action.payload.name,
      };

      updatedState = [
        ...state.slice(0, objIndex),
        updateObj,
        ...state.slice(objIndex + 1),
      ];
      return updatedState;
    default:
      return state;
  }
}
