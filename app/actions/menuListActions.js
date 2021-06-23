import { ActionTypes } from "./actionTypes";

export function loadMenu(menus){
  return { type: ActionTypes.LOAD_MENU, payload: menus };
}

export function addMenu(menu) {
  return { type: ActionTypes.ADD_MENU, payload: menu };
}

export function editMenu(menu){
  return { type: ActionTypes.EDIT_MENU, payload: menu };
}

export function removeMenu(menu){
  return { type: ActionTypes.REMOVE_MENU, payload: menu };
}
