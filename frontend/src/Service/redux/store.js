import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/reducers/auth";
import bookingReduser from "../redux/reducers/booking"

export default configureStore({
  reducer: {
    auth: authReducer,
    booking : bookingReduser,

  },
});
