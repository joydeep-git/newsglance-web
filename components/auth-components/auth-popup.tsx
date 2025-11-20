"use client";


import { useEffect, useState } from "react";
import LoginForm from "./login-form";
import SignupForm from "./signup-form";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Button } from "../ui/button";
import { setLoginState } from "@/redux/slices/uiSlice";
import { X } from "lucide-react";
import ForgetPassword from "./forget-password";
import { AuthPageTypes } from "@/types/authTypes";


const AuthPopup = () => {

  const dispatch = useAppDispatch();

  const { showLogin } = useAppSelector(state => state.ui);
  const { isAuth, user: userData } = useAppSelector(state => state.auth);
  const [currentPage, setCurrentPage] = useState<AuthPageTypes>("login");


  // checking and redirecting to router
  useEffect(() => {
    if (isAuth && userData) {
      dispatch(setLoginState(false));
    }
  }, [isAuth, dispatch, userData ]);


  const pages = {
    "login": <LoginForm changeState={(val) => setCurrentPage(val)} />,
    "signup": <SignupForm changeState={(val) => setCurrentPage(val)} />,
    "forget": <ForgetPassword changeState={(val) => setCurrentPage(val)} />
  }


  const handleClose = () => {
    dispatch(setLoginState(false));
    setCurrentPage("login");
  }


  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };


  if (showLogin) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={handleBackdropClick} >

        <div className="relative bg-transparent rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto hide-scrollbar">

          <Button onClick={handleClose} variant="ghost" size="icon"
            className="absolute top-2 right-2 z-10" >
            <X className="size-5 text-project" />
          </Button>

          {/* Form content */}
          <div>
            {pages[currentPage]}
          </div>

        </div>

      </div>
    )
  }

}

export default AuthPopup;