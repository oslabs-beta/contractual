import { Action } from '../actions/actions'
import { ActionType } from '../action-types/actionTypes'

interface State {
  counter: number
}

const initialState = {
  counter: 0,
};

const simpleReducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.INCREMENT: {
      const newCount = action.payload + 1;
      return { counter: newCount };
    }
    case ActionType.DECREMENT: {
      const newCount = action.payload - 1;
      return { counter: newCount };
    }
    default: {
      return state;
    }
  }
};

export default simpleReducer;
