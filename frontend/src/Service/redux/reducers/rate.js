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
     /* deleteRateByUserId: (state, action) => {
      const { user_id } = action.payload; 
      state.rates = state.rates.filter((elem, i) => {
        console.log(user_id,elem.id);
        elem.id !== user_id ;
      });
    }, */
    setMyRate: (state,action)=>{
        state.myRate = action.payload; 
        console.log(action.payload);
    } ,
    
    setRateJoined:(state,action)=>{
state.rateJoined=action.payload   
       
    }
    
    
  },
});
export const {setRate,addRate,deleteRateByUserId,setMyRate,setRateJoined}=rateSlice.actions
export default rateSlice.reducer