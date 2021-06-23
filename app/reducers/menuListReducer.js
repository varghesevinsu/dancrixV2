import initialState from './initialState'
import { ActionTypes } from '../actions/actionTypes'

export default function MenulistReducer (state = initialState.menu, action) {
  let newState
  switch (action.type) {
    case ActionTypes.LOAD_MENU:
      console.log('Load Menu')
      newState = action.payload
      return newState
    case ActionTypes.ADD_MENU:
      console.log('Add Menu')
      newState = [...state, action.payload]
      return newState
    case ActionTypes.EDIT_MENU:
      console.log('Edit Menu')

      newState = action.payload
      return newState
    case ActionTypes.REMOVE_MENU:
      console.log('Remove Menu')
      // eslint-disable-next-line no-case-declarations
      const filteredMenus = state.filter((menu, key) => {
        return menu.id != action.payload.id
      })
      return filteredMenus;
    default:
      return state
  }
}
