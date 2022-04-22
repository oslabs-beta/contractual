//RTK follows the ducks pattern and combines reducers, actions, and constants in one file called a slice. Each slice will provide an initial state and a reducer function for an object in store.

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// define types of contents in your state object with interface or object type
type CounterState = {
  counter: number;
}

const initialState: CounterState = {
  counter: 0
}

// create slice builds reducers, actions, and action creators under the hood
export const counterSlice = createSlice({
  name: "counter",
  initialState,
  // add reducer methods here
  reducers: {
    // state provided by redux automatically
    // PayloadAction is built in type, specify with < >
    increment: (state, action: PayloadAction<number>) => {
      state.counter = action.payload + 1;
    },
    decrement: (state, action: PayloadAction<number>) => {
      state.counter = action.payload - 1;
    },
  }
});

// console.log(counterSlice) // to see what it provides

// export your actions here by destructuring counterSlice
export const { increment, decrement } = counterSlice.actions;

// export the reducer built by counterSlice // contains reducers methods
export default counterSlice.reducer;