"use client";

import { ReactNode } from "react";
import MaxWidthWrapper from "@/components/maxWidthWrapper";
import { useAppSelector } from "@/redux/store";
import AuthWall from "@/components/auth-components/auth-wall";


const Layout = ({ children }: { children: ReactNode }) => {

  const { isAuth } = useAppSelector(state => state.auth);

  if (!isAuth) {
    return <AuthWall />;
  }

  return <MaxWidthWrapper className="mt-8 md:mt-12">{children}</MaxWidthWrapper>;

};

export default Layout;