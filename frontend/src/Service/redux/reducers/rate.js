import { createSlice } from "@reduxjs/toolkit";
const rateSlice = createSlice({
  name: "rates",
  initialState: {
    rates: [],
  },
  reducers: {
    setRate: (state, action) => {
      console.log(action.payload);
      state.rates = action.payload;
    },
    addRate: (state, action) => {
      console.log(action.payload);
      state.rates.push(action.payload);
    },
    updateRateByUserId: (state, action) => {
      const { user_id } = action.payload;
    },
    /* deleteRateByUserId: (state, action) => {
      const { user_id } = action.payload;
      state.rates = state.rates.filter((elem, i) => {
        user_id !== id;
      });
    }, */
  },
});
export const {setRate,addRate,updateRateByUserId,deleteRateByUserId}=rateSlice.actions
export default rateSlice.reducer