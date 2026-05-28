

import { UserDataType } from '@/types/authTypes';
import { ReduxAuthSliceType } from '@/types/reduxTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const initialState: ReduxAuthSliceType = {
  user: null,
  isAuth: false,
  isLoading: true, // true until the first token verify completes
}


const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {

    setUser: (state, action: PayloadAction<UserDataType>) => {
      state.user = action.payload;
      state.isAuth = true;
      state.isLoading = false;
    },

    setLogout: (state) => {
      state.user = null;
      state.isAuth = false;
      state.isLoading = false;
    },

  }
})


const authReducer = authSlice.reducer;

export const { setLogout, setUser } = authSlice.actions;

export default authReducer;