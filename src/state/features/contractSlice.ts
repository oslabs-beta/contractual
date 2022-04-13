import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";


type Contracts = {
  [key: string]: string
}

type CurrentContract = {
  [key: string]: {}
};

type ContractState = {
  userName: string,
  userID: number,
  contracts: Contracts,
  owner: string[],
  currentContractToken: string;
  currentContract: CurrentContract
};

const initialState: ContractState = {
  userName: '',
  userID: 0,
  contracts: {},
  owner: [],
  currentContractToken: '',
  currentContract: {}
};

export const contractSlice = createSlice({
  name: "contract",
  initialState,
  reducers: {
    getContract: (state, action: PayloadAction<string>) => {
      state.currentContractToken = action.payload;
      // state.contract = response data?
      // this may need to be in extra reducers after building asyncThunk function
    },
    addToContract: (state, action: PayloadAction<CurrentContract>) => {
      state.currentContract = {...state.currentContract, ...action.payload}
    }, 
  //   deleteFromContract:,
  },
  // extraReducers:
  // this is where you can respond to actions from other slices or asyncThunk functions
  // use builder syntax
});

export const { getContract, addToContract } = contractSlice.actions;

export default contractSlice.reducer;