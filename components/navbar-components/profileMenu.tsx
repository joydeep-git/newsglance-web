"use client";

import { LoginButton } from "../loginButton";
import { setLoginState } from "@/redux/slices/uiSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import ProfileMenuOptions from "./profileMenuOptions";


const ProfileMenu = () => {

  const dispatch = useAppDispatch();

  const { isAuth, user } = useAppSelector((state) => state.auth);

  return isAuth ? (
    <ProfileMenuOptions data={user!} />
  ) : (
    <LoginButton onClick={() => dispatch(setLoginState(true))}>
      Login
    </LoginButton>
  );
};

export default ProfileMenu;
