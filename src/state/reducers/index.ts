import { combineReducers } from 'redux';
import simpleReducer from './simpleReducer';


const reducers = combineReducers({
    counter: simpleReducer
  })
  
export default reducers;

export type State = ReturnType<typeof reducers>