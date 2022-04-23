import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { string } from "yup";

///// THUNK FUNCTIONS


////// SHOULD MOVE TYPES TO ANOTHER FILE
type CurrentContract = {
  [key: string]: Contracts
}
type Contracts = {
  [key: string]: string
}

type LoadContract = {
  token: string,
  contract: CurrentContract
}
type AddContract = {
  name: string,
  token: string
}

type JoinContract = {
  name: string,
  token: string,
  contract: CurrentContract
}
type ContractState = {
  userName: string,
  userId: number,
  tokens: Contracts,
  owns: string[],
  currentContractToken: string,
  currentContract: CurrentContract,
  // frontEndPort: string
  // backEndPort: string
  // status: string
};


/////// SLICE
const initialState: ContractState = {
  userName: '',
  userId: 0,
  tokens: {},
  owns: [],
  currentContractToken: '',
  currentContract: {},
  // status: '',
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
    updateContract: (state, action: PayloadAction<CurrentContract>) => {
      state.currentContract = action.payload
    },
    // invoke on successful login
    getUserData: (state, action) => {
      state.userName = action.payload.userName,
      state.userId = action.payload.userId,
      state.tokens = action.payload.tokens,
      state.owns = action.payload.owns
    },
    loadContract: (state, action: PayloadAction<LoadContract>) => {
      state.currentContract = action.payload.contract;
      state.currentContractToken = action.payload.token;
    },
    addContract: (state, action: PayloadAction<AddContract>) => {
      state.currentContract = initialState.currentContract,
      state.currentContractToken = action.payload.token,
      state.owns.push(action.payload.token)
      state.tokens[action.payload.name] = action.payload.token
    },
    joinContract: (state, action: PayloadAction<JoinContract>) => {
      state.currentContract = action.payload.contract,
      state.currentContractToken = action.payload.token,
      state.tokens[action.payload.name] = action.payload.token
    },
    // changeCurrentContractToken: () => {},
    // createNewContractToken: () => {},
    // changeFrontEndPort: (state, action: PayloadAction<string>) => {
    //   state.frontEndPort = action.payload
    // },
    // changeBackEndPort: (state, action: PayloadAction<string>) => {
    //   state.backEndPort = action.payload
    // },
  //   deleteFromContract:,
  },
  // extraReducers(builder) {
  //   builder
  //     .addCase(getUserData.pending, (state, action) => {
  //       state.status = 'loading'
  //     })
  //     .addCase(getUserData.fulfilled, (state, action) => {
  //       state.status = 'success'
  //       //add functionality here
  //       state.userName = action.payload.userName,
  //       state.userId = action.payload.userId,
  //       state.contracts = action.payload.contracts,
  //       state.owner = action.payload.owner
  //     })
  //     .addCase(getUserData.rejected, (state, action) => {
  //       state.status = 'failed'
  //     })
  // }
  // this is where you can respond to actions from other slices or asyncThunk functions
  // use builder syntax
});

export const { getContract, updateContract, getUserData, loadContract, addContract, joinContract } = contractSlice.actions;

export default contractSlice.reducer;