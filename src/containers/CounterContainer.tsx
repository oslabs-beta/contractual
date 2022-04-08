import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { increment, decrement } from '../state/features/counterSlice';

export default function CounterContainer () {

  const counter = useSelector((state: RootState) => state.counter.counter);
  const dispatch = useDispatch();
  const incrementCounter = () => dispatch(increment(counter));
  const decrementCounter = () => dispatch(decrement(counter));
  

  return (
    <div>
      <h1>{counter}</h1>
      <button type="button" onClick={incrementCounter}>increment</button>
      <button type="button" onClick={decrementCounter}>decrement</button>
    </div>
  );
}

