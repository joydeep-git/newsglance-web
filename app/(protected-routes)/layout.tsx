"use client";

import { ReactNode, useEffect } from "react";
import MaxWidthWrapper from "@/components/maxWidthWrapper";
import { setLoginState } from "@/redux/slices/uiSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";


const Layout = ({ children }: { children: ReactNode }) => {

  const dispatch = useAppDispatch();

  const { isAuth, user } = useAppSelector(state => state.auth);


  useEffect(() => {
    if (!isAuth || !user) {
      dispatch(setLoginState(true));
    }
  }, [isAuth, user, dispatch]);

  return <MaxWidthWrapper>{children}</MaxWidthWrapper>

}

export default Layout;