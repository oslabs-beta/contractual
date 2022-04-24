import { configureStore } from '@reduxjs/toolkit';
// importing the default export from counterSlice, this is a reducer
import counterReducer from './features/counterSlice';
import contractReducer from './features/contractSlice';
import modalsReducer from './features/modalsSlice';
import frontLogReducer from './features/frontLogSlice';

export const store = configureStore({
  reducer: {
    // add reducers from each slice
    contract: contractReducer,
    counter: counterReducer,
    modals: modalsReducer,
    frontLog: frontLogReducer,
  }
})

// state type for typescript
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;