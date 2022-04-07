import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators, State } from '../state';


export default function CounterContainer () {

  const dispatch = useDispatch();

  const { incrementCounter, decrementCounter } = bindActionCreators(actionCreators, dispatch)
  const counter = useSelector((state: State) => state.counter)

  return (
    <div>
      <h1>{counter.counter}</h1>
      <button type="button" onClick={() => {incrementCounter(counter.counter)}}>iiiiiiiiincrement</button>
      <button type="button" onClick={() => {decrementCounter(counter.counter)}}>decrement</button>
    </div>
  );
}

