import { ActionTypes } from "./actionTypes";

export function updateRecord(record) {
  return { type: ActionTypes.UPDATE_CURRENT_RECORD, payload: record }
}
