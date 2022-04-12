import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import counterSlice from "./counterSlice";

type Contract = {};

type ContractState = {
  contractToken: string;
  contract: Contract
};

const initialState: ContractState = {
  contractToken: '',
  contract: {}
};

export const contractSlice = createSlice({
  name: "contract",
  initialState,
  reducers: {
    getContract: (state, action: PayloadAction<string>) => {
      state.contractToken = action.payload;
      // axios request here? grab contract based on passed in token
      // state.contract = response data?
    },
  //   addToContract: (state, action), 
  //   deleteFromContract:,
  },
  // async reducers go in extra reducers
  // axios request here?
  // extraReducers: 
});

export const { getContract } = contractSlice.actions;

export default contractSlice.reducer;