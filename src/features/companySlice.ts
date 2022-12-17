import { createSlice } from "@reduxjs/toolkit";
import CompanyData from "../companyData.json";

const initialState: Company[] = CompanyData;

export interface Company {
  Id: number;
  Company_Name: string;
  Legal_Number: string;
  Country: string;
  User: string;
}

const companySlice = createSlice({
  name: "companies",
  initialState: initialState,
  reducers: {
    edit: (state, action) => {
      state = action.payload;
    },
  },
});

export default companySlice.reducer;
export const { edit } = companySlice.actions;
