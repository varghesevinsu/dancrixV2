import { ActionTypes } from "./actionTypes";

export function loadApplications(applications) {
  return { type: ActionTypes.LOAD_APPLICATIONS, payload: applications }
}

export function addApplication(application) {
  return { type: ActionTypes.ADD_APPLICATION, payload: application }
}

export function switchApplication(application) {
  return { type: ActionTypes.SWITCH_APPLICATION, payload: application }
}

export function editApplication(application){
  return { type: ActionTypes.EDIT_APPLICATION, payload: application }
}
