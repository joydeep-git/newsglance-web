import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import uiReducer from "@/redux/slices/uiSlice";
import authReducer from './slices/authSlice';
import newsReducer from './slices/newsSlice';



export const store = configureStore({
  reducer: {
    ui: uiReducer,
    auth: authReducer,
    news: newsReducer
  },
  middleware: (defaultMiddleware) => defaultMiddleware({ serializableCheck: false }),
});


export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;