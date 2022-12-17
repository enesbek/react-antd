import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import companySlice from "../features/companySlice";

const store = configureStore({
  reducer: {
    companies: companySlice
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const UseAppDispatch = () => useDispatch<AppDispatch>();
export const UseAppSelector: TypedUseSelectorHook<RootState> = useSelector;
