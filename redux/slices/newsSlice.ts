import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NewsSliceType } from "@/types/reduxTypes";
import { ArticleCard, HomeResponse } from "@/types/newsTypes";
import { FileDataType } from "@/types/globalTypes";


const initialState: NewsSliceType = {
  home: {
    featured: [],
    finance: [],
    tech: [],
  },
  audioFile: null,
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {

    setHomeFeed: (state, action: PayloadAction<HomeResponse>) => {
      state.home.featured = action.payload.featured;
      state.home.finance = action.payload.finance;
      state.home.tech = action.payload.tech;
    },


    setAudioFile: (state: NewsSliceType, action: PayloadAction<FileDataType>) => {
      state.audioFile = action.payload;
    },

    deleteAudioFile: (state: NewsSliceType) => {
      state.audioFile = null;
    }

  },
});

const newsReducer = newsSlice.reducer;

export const { setHomeFeed, setAudioFile, deleteAudioFile } = newsSlice.actions;

export default newsReducer;