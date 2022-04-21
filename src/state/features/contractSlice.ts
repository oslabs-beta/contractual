import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

///// FUNCTIONS
// const retrieve  = async (id) => {
//   const response = await axios.post(`https://localhost:3000/contract/userid=${id}`)
//   return response.data;
// }

// export const getUserData = createAsyncThunk(
//   // action type string
//   'contract/getUserData',
//   async (id, thunkAPI) => {
//     try {
//       return await retrieve(id)
//     } catch (error) {
//       const message = (error.response && error.response.data && error.response.data.message || error.message || error.toString()
//       return thunkAPI.rejectWithValue(message)
//     }
//   }
// )

////// SHOULD MOVE TYPES TO ANOTHER FILE
type Contracts = {
  [key: string]: string
}

type CurrentContract = {

};

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

export const { getContract, updateContract, getUserData } = contractSlice.actions;

export default contractSlice.reducer;