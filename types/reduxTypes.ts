import { UserDataType } from "./authTypes";
import { FileDataType } from "./globalTypes";
import { ArticleCard } from "./newsTypes";


export interface ReduxUiSliceType {
  darkMode: boolean,
  showLogin: boolean,
  showSearchBar: boolean,
}


export interface ReduxAuthSliceType {
  user: UserDataType | null,
  isAuth: boolean,
}


export type NewsSliceType = {
  home: {
    featured: ArticleCard[];
    finance:  ArticleCard[];
    tech:     ArticleCard[];
  };
  audioFile: FileDataType | null;
};
