import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type LogSuccessItem = {
  endpoint: string,
  error: string[],
  method: string,
  pass: boolean,
  time: string
}

type LogErrorItem = {
  endpoint: string,
  error: string[],
  method: string, 
  pass: boolean,
  time: string
}

type LogItem = (LogSuccessItem | LogErrorItem)
type InitialState = LogItem[];

const initialState: InitialState = [];

export const backLogSlice = createSlice({
  name: "backLog",
  initialState,
  reducers: {
    updateLog: (state, action: PayloadAction<LogItem>) => {
      state.unshift(action.payload);
    },
    clearLog: (state) => {
      state = [];
    }
  }
})

export const { updateLog, clearLog } = backLogSlice.actions;

export default backLogSlice.reducer;