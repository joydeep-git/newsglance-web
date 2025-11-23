
import { ReduxUiSliceType } from '@/types/reduxTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const initialState: ReduxUiSliceType = {
  darkMode: false,
  showLogin: false,
  showSearchBar: false,
}


const uiSlice = createSlice({
  name: "uiSlice",
  initialState,
  reducers: {

    setLoginState: (state , action: PayloadAction<boolean>) => {
      state.showLogin = action.payload;
    },

    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
    },

    setSearchModal: (state, action: PayloadAction<boolean>) => {
      state.showSearchBar = action.payload;
    },
  }
})


const uiReducer = uiSlice.reducer;

export const { setLoginState, setDarkMode, setSearchModal } = uiSlice.actions;

export default uiReducer;