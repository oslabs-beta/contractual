import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { increment, decrement } from '../state/features/counterSlice';

export default function CounterContainer() {
  // non-destructured version
  // const counter = useSelector((state: RootState) => state.counter.counter);
  const { counter } = useSelector((state: RootState) => state.counter);

  const dispatch = useDispatch();

  // can pass these functions into button instead if desired
  // const incrementCounter = () => dispatch(increment(counter));
  // const decrementCounter = () => dispatch(decrement(counter));

  return (
    <div>
      <h1>{counter}</h1>
      <button type='button' onClick={() => dispatch(increment(counter))}>
        increment
      </button>
      <button type='button' onClick={() => dispatch(decrement(counter))}>
        decrement
      </button>
    </div>
  );
}
