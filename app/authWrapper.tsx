"use client";

import { useVerifyToken } from "@/hooks/authHooks";
import { setLogout, setUser } from "@/redux/slices/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { ReactNode, useEffect } from "react";



const AuthWrapper = ({ children, className }: { children: ReactNode; className: string; }) => {

  const { user, isAuth } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();


  const { refetch, data, isFetched, isFetching } = useVerifyToken();


  // run on mount
  useEffect(() => {
    if (!user && !isAuth) {
      refetch();
    }
  }, [refetch, user, isAuth]);


  useEffect(() => {

    if (!isFetched || isFetching) return;

    if (data?.data) {
      dispatch(setUser(data.data));
    } else {
      dispatch(setLogout());
    }

  }, [data, dispatch, isFetched, isFetching]);


  return (
    <div className={className}>
      {children}
    </div>
  )
};

export default AuthWrapper;