import { ActionType } from "../action-types/actionTypes";
import { Dispatch } from 'redux';
import { Action } from "../actions/actions";

export const incrementCounter = (num: number) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.INCREMENT,
      payload: num
    })
  }
}

export const decrementCounter = (num: number) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.DECREMENT,
      payload: num
    })
  }
}