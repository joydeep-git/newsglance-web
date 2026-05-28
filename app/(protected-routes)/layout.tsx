"use client";

import { ReactNode } from "react";
import MaxWidthWrapper from "@/components/maxWidthWrapper";
import { useAppSelector } from "@/redux/store";
import AuthWall from "@/components/auth-components/auth-wall";
import { Loader2 } from "lucide-react";


const Layout = ({ children }: { children: ReactNode }) => {

  const { isAuth, isLoading } = useAppSelector(state => state.auth);

  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!isAuth) {
    return <AuthWall />;
  }

  return <MaxWidthWrapper className="mt-8 md:mt-12">{children}</MaxWidthWrapper>;

};

export default Layout;