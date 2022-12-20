import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import userSlice from "../features/userSlice";

const store = configureStore({
  reducer: {
    user: userSlice
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const UseAppDispatch = () => useDispatch<AppDispatch>();
export const UseAppSelector: TypedUseSelectorHook<RootState> = useSelector;
