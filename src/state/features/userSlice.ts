import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";


type UserState = {
  user: string,
  isLoggedIn: boolean
}

const initialState: UserState = {
  user: '',
  isLoggedIn: false
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
  }
})
