import {createSlice} from "@reduxjs/toolkit"

export const bookingSlice = createSlice({
    name : "booking",
    initialState :   { booking: [] },

    reducers:{
        setBooking : ( state, action )=>{
           state.booking = action.payload
          
        },

        addBooking : (state , action)=>{
            state.booking.push(action.payload)
        },
      

        updateBookingById :(state , action)=>{
            state.booking =state.booking.map((booking)=>
                booking.id === action.payload.id ? action.payload : booking
            )
        },
        updateByUserId : (state , action)=>{
            state.booking = state.booking.map((booking)=>
                booking.user_id === booking.action.payload.user_id ? action.payload : booking
            )
        },



        deleteById : (state , action)=>{
            state.booking = state.booking.filter((booking) => booking.id !==action.payload)
        }

    }
})

export const {
    setBooking, 
    addBooking, 
    updateBookingById, 
    updateByUserId ,  
    deleteById } = bookingSlice.actions
export default bookingSlice.reducer