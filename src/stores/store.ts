import {configureStore} from "@reduxjs/toolkit";
import billSlice from "./billSlice.ts";

export const store = configureStore({
   reducer: billSlice.reducer,
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
