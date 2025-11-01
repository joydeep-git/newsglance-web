"use client";

import MaxWidthWrapper from "@/components/maxWidthWrapper";
import { setLoginState } from "@/redux/slices/uiSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";


const Layout = ({ children }: { children: ReactNode }) => {

  const router = useRouter();
  const dispatch = useAppDispatch();
  
  const { isAuth, user } = useAppSelector(state => state.auth);


  if (!isAuth || !user) {
    router.back();
    dispatch(setLoginState(true));
  } else {
    return <MaxWidthWrapper>abcd</MaxWidthWrapper>;
  }

}

export default Layout;