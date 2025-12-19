"use client";

import { ReactNode, useEffect } from "react";
import MaxWidthWrapper from "@/components/maxWidthWrapper";
import { setLoginState } from "@/redux/slices/uiSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useRouter } from "next/navigation";


const Layout = ({ children }: { children: ReactNode }) => {

  const dispatch = useAppDispatch();
  const router = useRouter();

  const { isAuth, user } = useAppSelector(state => state.auth);


  useEffect(() => {
    if (!isAuth || !user) {
      dispatch(setLoginState(true));
      router.replace("/");
    }
  }, [isAuth, user, dispatch, router]);

  return <MaxWidthWrapper className="mt-8 md:mt-12">{children}</MaxWidthWrapper>

}

export default Layout;