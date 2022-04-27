import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ModalsState = {
  newContract: boolean;
}

const initialState: ModalsState = {
  newContract: false
}

export const modalsSlice = createSlice({
  name: 'newContract',
  initialState,
  reducers: {
    show: (state, action: PayloadAction<boolean>) => {
      state.newContract = true;
    },
    hide: (state, action: PayloadAction<boolean>) => {
      state.newContract = false;
    },
  }
});

export const { show, hide } = modalsSlice.actions;

export default modalsSlice.reducer;

/** NOT BEING USED */