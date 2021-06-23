import { ActionTypes } from "./actionTypes";

export function loadPages(pages) {
  return { type: ActionTypes.LOAD_PAGES, payload: pages };
}

export function addPage(page) {
  return { type: ActionTypes.ADD_PAGE, payload: page };
}

export function renamePage(page){
  return { type: ActionTypes.RENAME_PAGE, payload: page };
}

export function removePage(page){
  return { type: ActionTypes.REMOVE_PAGE, payload: page };
}

export function editPage(page){
  return { type: ActionTypes.EDIT_PAGE, payload: page };
}
