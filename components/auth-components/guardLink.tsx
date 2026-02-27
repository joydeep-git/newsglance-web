"use client";


import Link from "next/link";
import { MouseEvent } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setLoginState } from "@/redux/slices/uiSlice";
import { GuardLinkProps } from "@/types/authTypes";

const GuardLink = ({ href, children, ...rest }: GuardLinkProps) => {

  const dispatch = useAppDispatch();

  const { isAuth } = useAppSelector(s => s.auth);

  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!isAuth) {
      e.preventDefault();
      dispatch(setLoginState(true));
    }
  };

  return (
    <Link href={href} onClick={onClick} {...rest}>
      {children}
    </Link>
  );
}

export default GuardLink;