import { createSlice } from "@reduxjs/toolkit";

const serviceProviderSlice = createSlice({
    name: "service",
    initialState: {
        service : [],
    },
    reducers: {
        setCreatService: (state, action) => {
            console.log(action.payload);
            state.service.push(action.payload)
        },
        setUpdateService: (state, action) => {
            state.service = state.service.map((elem,i)=>{
                if(elem.id == action.payload.id){
                    return action.payload
                }
                return elem
            })
        },
        
        setAllService: (state, action) => {
            state.service = action.payload
        },
        setDeleteService: (state, action) => {
            state.service.filter(elem => elem.id !== action.payload)
        },
    },



})

export const { setCreatService,setUpdateService,setAllService,setDeleteService } = serviceProviderSlice.actions;
export default serviceProviderSlice.reducer;