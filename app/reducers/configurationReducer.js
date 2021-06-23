import initialState from "./initialState";
import { ActionTypes } from "../actions/actionTypes";

export default function ConfigurationReducer (state = initialState.currentConfiguration, action) {
  let newState;
  switch (action.type) {
    case ActionTypes.LOAD_CURRENT_CONFIGURATION:
      console.log('Load current configuration');
      return action.payload;
    case ActionTypes.SAVE_CURRENT_CONFIGURATION:
      return action.payload;
    default:
      return state;
  }
};
