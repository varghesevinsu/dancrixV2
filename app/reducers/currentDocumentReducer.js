import initialState from "./initialState";
import { ActionTypes } from "../actions/actionTypes";

export default function CurrentDocumentReducer (state = initialState.currentDocument, action){
  let newState;
  switch (action.type) {

    case ActionTypes.LOAD_CURRENT_DOCUMENT:
      newState = action.payload;
      console.log(newState);
      return newState;
    default:
      return state
  }
}
