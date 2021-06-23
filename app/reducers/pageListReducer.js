import initialState from "./initialState";
import { ActionTypes } from "../actions/actionTypes";

export default function PagelistReducer (state = initialState.pages, action) {
  let newState;
  let pages = state;

  switch (action.type) {
    case ActionTypes.LOAD_PAGES:
      console.log('Load Page');
      return action.payload;
    case ActionTypes.ADD_PAGE:
      console.log('Add Page');

      newState = [...state, action.payload];
      return newState;
    case ActionTypes.REMOVE_PAGE:
      console.log('Remove Page');
      const filteredPages = pages.filter((page, key) => {
        return page.id != action.payload.id
      });
      return filteredPages;
    case ActionTypes.RENAME_PAGE:
      console.log('Rename Page');
      newState = {
        ...state,
        pages: pages
      }
      return newState;
    case ActionTypes.EDIT_PAGE:
      console.log('Edit Page');

      var fPages = state.filter( (page) => page.id !== action.payload.id )
      let finalPages = state.map( (page) => {
        if(page.id == action.payload.id){
          page = action.payload
        }
        return page;
      })

      newState = finalPages;

      return newState;
    default:
      return state;
  }
}
