import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import { bindActionCreators } from 'redux';
// next line for vanilla redux
// import { actionCreators, State } from '../state';

// next line for RTK implementation
import { RootState } from '../state/store';
import { increment, decrement } from '../state/features/counterSlice';

export default function CounterContainer () {

  // works with vanilla redux
  // const dispatch = useDispatch();
  // const { incrementCounter, decrementCounter } = bindActionCreators(actionCreators, dispatch)
  // const counter = useSelector((state: State) => state.counter)

  // RTK test going to storeTK, accessing counter in reducers object, accessing counter value in state of counterSlice
  const counter = useSelector((state: RootState) => state.counter.counter);
  const dispatch = useDispatch();
  const incrementCounter = () => dispatch(increment(counter));
  const decrementCounter = () => dispatch(decrement(counter));
  

  return (
    // functional with vanilla Redux
    // <div>
    //   <h1>{counter.counter}</h1>
    //   <button type="button" onClick={() => {incrementCounter(counter.counter)}}>increment</button>
    //   <button type="button" onClick={() => {decrementCounter(counter.counter)}}>decrement</button>
    // </div>

    // RTK test
    <div>
      <h1>{counter}</h1>
      <button type="button" onClick={incrementCounter}>increment</button>
      <button type="button" onClick={decrementCounter}>decrement</button>
    </div>
  );
}

