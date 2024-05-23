import { createSlice } from "@reduxjs/toolkit";
const googleAuthSlice = createSlice({
  name: "googleAuth",
  initialState: {
    isGoogleLoggedIn: false,
    googleUserData: null,
  },
  reducers: {
    setGoogleLogin: (state, action) => {
        state.isGoogleLoggedIn = true;
        state.googleUserData = action.payload;
      },
      setGoogleLogout: (state) => {
        state.isGoogleLoggedIn = false;
        state.googleUserData = null;
      },
   

  
  },
});
export const { setGoogleLogin, setGoogleLogout } = googleAuthSlice.actions;

export default googleAuthSlice.reducer;