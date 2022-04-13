import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";


///// FUNCTIONS

// export const getUserData = createAsyncThunk(
//   // action type string
//   'contract/getUserData',
//   async (id) => {
//     const response = await fetch(`https://localhost:3000/contract/userid=${id}`)
//       .then((data) = data.json())
//   }
// )

////// SHOULD MOVE TYPES TO ANOTHER FILE
type Contracts = {
  [key: string]: string
}

type CurrentContract = {
  [key: string]: {}
};

type ContractState = {
  userName: string,
  userId: number,
  contracts: Contracts,
  owner: string[],
  currentContractToken: string,
  currentContract: CurrentContract,
  // status: string
};


/////// SLICE
const initialState: ContractState = {
  userName: '',
  userId: 0,
  contracts: {},
  owner: [],
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
    addToContract: (state, action: PayloadAction<CurrentContract>) => {
      state.currentContract = {...state.currentContract, ...action.payload}
    },
    getUserData: (state, action) => {
      state.userName = action.payload.userName,
      state.userId = action.payload.userId,
      state.contracts = action.payload.contracts,
      state.owner = action.payload.owner
    }
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
  //       state
  //     })
  //     .addCase(getUserData.rejected, (state, action) => {
  //       state.status = 'failed'
  //     })
  // }
  // this is where you can respond to actions from other slices or asyncThunk functions
  // use builder syntax
});

export const { getContract, addToContract, getUserData } = contractSlice.actions;

export default contractSlice.reducer;