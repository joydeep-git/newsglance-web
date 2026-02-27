"use client";

import { memo, ReactNode } from "react";
import Footer from "@/components/footer-components/footer";
import Navbar from "@/components/navbar-components/navbar";
import NavbarOptionsBar from "@/components/navbar-components/navbar-options";
import AuthPopup from "@/components/auth-components/auth-popup";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthWrapper from "./authWrapper";

const LayoutWrapper = ({ children }: { children: ReactNode }) => {

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>

      <AuthWrapper className="flex flex-col relative pt-[48px] flex-1 h-screen overflow-y-auto">

        <Navbar />
        <NavbarOptionsBar />

        <div className="flex flex-col overflow-y-auto flex-1">
          {children}
        </div>

      </AuthWrapper>

      <Footer />

      <AuthPopup />

    </QueryClientProvider>
  )
}

export default memo(LayoutWrapper);
