import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    login: (state, action: PayloadAction<object>) => {
      state = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { login } = userSlice.actions;
