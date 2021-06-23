import initialState from "./initialState";
import { ActionTypes } from "../actions/actionTypes";

export default function AppListReducer(state = initialState.applications, action){
  let newState;
  let applications = state;
  let newApplications;
  switch (action.type) {
    case ActionTypes.LOAD_APPLICATIONS:
      console.log('Load Applications');
      newApplications = action.payload && action.payload.app && action.payload.app.currentApplication ? action.payload.app : applications;
      newState = {
        ...state,
        appList: newApplications.appList,
        currentApplication: newApplications.currentApplication
      }
      return newState;
    case ActionTypes.ADD_APPLICATION:
      console.log('add application')
      newApplications = {
        appList: [...applications.appList, action.payload],
        currentApplication: action.payload
      }
      newState = {
        ...state,
        ...newApplications
      }
      return newState;
    case ActionTypes.SWITCH_APPLICATION:
      console.log('switch application');
      newState = {
        ...state,
        currentApplication: action.payload
      }
      return newState;
    case ActionTypes.EDIT_APPLICATION:
      console.log('Edit application');

      const newAppList = state.appList.map((app) => {
        if(app.id === action.payload.id){
          app = action.payload
        }
        return app;
      })

      newState = {
        ...state,
        appList: newAppList,
        currentApplication: action.payload
      }
      return newState;
    default:
      return state;
  }
}
