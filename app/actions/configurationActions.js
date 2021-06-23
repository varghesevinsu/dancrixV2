import { ActionTypes } from "./actionTypes";

export function loadConfiguration(configuration) {
  return { type: ActionTypes.LOAD_CURRENT_CONFIGURATION, payload: configuration }
}

export function saveConfiguration(configuration) {
  return { type: ActionTypes.SAVE_CURRENT_CONFIGURATION, payload: configuration }
}
