import { configureStore } from "@reduxjs/toolkit";
// importing the default export from counterSlice, this is a reducer
import counterReducer from "./features/counterSlice";
import contractReducer from "./features/contractSlice"; 

export const store = configureStore({
  reducer: {
    // add reducers from each slice
    contract: contractReducer,
    counter: counterReducer,
  }
})

// state type for typescript
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;