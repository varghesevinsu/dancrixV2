import { ActionTypes } from "./actionTypes";

export function loadCurrentDocument(document){
  return { type: ActionTypes.LOAD_CURRENT_DOCUMENT, payload: document };
}
