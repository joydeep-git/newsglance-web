"use client";

import { useVerifyToken } from "@/hooks/authHooks";
import { setUser } from "@/redux/slices/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { ReactNode, useEffect } from "react";



const AuthWrapper = ({ children, className }: { children: ReactNode; className: string; }) => {

  const { user, isAuth } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  const { refetch, data } = useVerifyToken();


  // run first time on website open and page loads, sendint token to backend and getting user data
  useEffect(() => {
    if (!user &&!isAuth) {
      refetch();
    }
  }, [refetch, user, isAuth]);

  useEffect(() => {
    if (data?.data) {
      dispatch(setUser(data.data));
    }
  }, [data, dispatch]);


  return (
    <div className={className}>
      {children}
    </div>
  )
};

export default AuthWrapper;