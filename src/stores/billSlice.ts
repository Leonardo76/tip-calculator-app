import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

export type BillState = {
   billValue: number,
   numberOfPeople: number,
   tip: number,
   reset: boolean,
}

const initialState: BillState = {
   billValue: 0,
   numberOfPeople: 0,
   tip: 0,
   reset: true,
}

export const billSlice = createSlice({
   name: "bill",
   initialState,
   reducers: {
      setBill(state, action: PayloadAction<number>) {
         state.billValue = action.payload;
         state.reset = false;
      },
      setNumberOfPeople(state, action: PayloadAction<number>) {
         state.numberOfPeople = action.payload;
         state.reset = false;
      },
      resetBill(state) {
         state.billValue = 0;
         state.numberOfPeople = 0;
         state.billValue = 0;
         state.tip = 0;
         state.reset = true;
      },
      setTip(state, action: PayloadAction<number>) {
         state.tip = action.payload;
      },
   }
})

export const {
   setBill,
   setNumberOfPeople,
   resetBill,
   setTip,
} = billSlice.actions;
export default billSlice;