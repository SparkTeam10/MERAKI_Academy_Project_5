import { createSlice } from "@reduxjs/toolkit";
const rateSlice = createSlice({
  name: "rates",
  initialState: {
    rates: [],
    myRate:[],
    rateJoined:[],
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
     deleteRateByUserId: (state, action) => {
      const { user_id } = action.payload;
      console.log(action.payload);
      state.rates = state.rates.filter((elem, i) => {
        console.log(user_id,elem.id);
        user_id !== elem.id;
      });
    },
    setMyRate: (state,action)=>{
        state.myRate = action.payload; 
        console.log(action.payload);
    } ,
    
    setRateJoined:(state,action)=>{
state.rateJoined=action.payload   
console.log(action.payload);         
    }
    
    
  },
});
export const {setRate,addRate,updateRateByUserId,deleteRateByUserId,setMyRate,setRateJoined}=rateSlice.actions
export default rateSlice.reducer