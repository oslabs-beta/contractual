import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ModalsState = {
  showModalNotification: boolean;
}

const initialState: ModalsState = {
  showModalNotification: false
}

export const modalsSlice = createSlice({
  name: 'newContract',
  initialState,
  reducers: {
    showNotification: (state/*, action: PayloadAction<boolean>*/) => {
      state.showModalNotification = true;
    },
    hideNotification: (state/*, action: PayloadAction<boolean>*/) => {
      state.showModalNotification = false;
    },
  }
});

export const { showNotification, hideNotification } = modalsSlice.actions;

export default modalsSlice.reducer;

/** NOT BEING USED */