import { UserDataType } from "./authTypes";


export interface ReduxUiSliceType {
  darkMode: boolean,
  showLogin: boolean,
  showSearchBar: boolean,
}


export interface ReduxAuthSliceType {
  user: UserDataType | null,
  isAuth: boolean,
}