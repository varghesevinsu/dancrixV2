import initialState from "./initialState";
import { ActionTypes } from "../actions/actionTypes";

export default function CurrentRecordReducer (state = initialState, action) {
  let newState;
  switch (action.type) {
    case ActionTypes.UPDATE_CURRENT_RECORD:
      console.log('Load current configuration');
      return action.payload;

    default:
      return state;
  }
};
