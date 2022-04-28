import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ModalsState = {
  modalNotification: boolean;
}

const initialState: ModalsState = {
  modalNotification: false
}

export const modalsSlice = createSlice({
  name: 'newContract',
  initialState,
  reducers: {
    showNotification: (state/*, action: PayloadAction<boolean>*/) => {
      state.modalNotification = true;
    },
    hideNotification: (state/*, action: PayloadAction<boolean>*/) => {
      state.modalNotification = false;
    },
  }
});

export const { showNotification, hideNotification } = modalsSlice.actions;

export default modalsSlice.reducer;

/** NOT BEING USED */