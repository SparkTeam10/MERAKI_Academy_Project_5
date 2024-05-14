import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../redux/reducers/auth"
import serviceprovider from '../redux/reducers/serviceprovider'
export default configureStore({
    reducer:{
        auth: authReducer,
        service: serviceprovider,
    }
})

import authReducer from "../redux/reducers/auth";
import rateReducer from "../redux/reducers/rate"
export default configureStore({
  reducer: {
    auth: authReducer,
    rates: rateReducer,
  },
});

