"use client";

import { memo, ReactNode } from "react";
import Footer from "@/components/footer-components/footer";
import Navbar from "@/components/navbar-components/navbar";
import NavbarOptionsBar from "@/components/navbar-components/navbar-options";
import AuthPopup from "@/components/auth-components/auth-popup";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthWrapper from "./authWrapper";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import AudioPlayer from "@/components/audioPlayer";
import { deleteAudioFile } from "@/redux/slices/newsSlice";

const LayoutWrapper = ({ children }: { children: ReactNode }) => {

  const queryClient = new QueryClient();

  const dispatch = useAppDispatch();

  const { audioFile } = useAppSelector(state => state.news);

  return (
    <QueryClientProvider client={queryClient}>

      {/* Single scroll */}
      <AuthWrapper className="flex flex-col relative pt-[48px] min-h-screen">

        <Navbar />
        <NavbarOptionsBar />

        <div className="flex flex-col flex-1">
          {children}
        </div>

      </AuthWrapper>

      <Footer />

      <AuthPopup />

      {
        audioFile &&
        <AudioPlayer
          audioTrack={audioFile}
          onClose={() => dispatch(deleteAudioFile())}
        />
      }

    </QueryClientProvider>
  )
}

export default memo(LayoutWrapper);
