import { createSlice } from "@reduxjs/toolkit";

const serviceProviderSlice = createSlice({
    name: "service",
    initialState: {
        service : [],
    },
    reducers: {
        setCreatService: (state, action) => {
           
            state.service.push(action.payload)
        },
        setUpdateService: (state, action) => {
            console.log(action.payload)
            state.service = state.service.map((elem,i)=>{
                if(elem.id == action.payload.id){
                    elem.title = action.payload.title
                    elem.description = action.payload.description
                    elem.address = action.payload.address
                    elem.img = action.payload.img
                    elem.price = action.payload.price
                    
                }
                return elem
            })
        },
        
        setAllService: (state, action) => {
            state.service = action.payload
        },
        setDeleteService: (state, action) => {
            console.log(action.payload)
           state.service= state.service.filter(elem => elem.id !== action.payload)
        },
    },



})

export const { setCreatService,setUpdateService,setAllService,setDeleteService } = serviceProviderSlice.actions;
export default serviceProviderSlice.reducer;