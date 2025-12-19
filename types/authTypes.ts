import { LinkProps } from "next/link";
import { PropsWithChildren } from "react";


export type AuthPageTypes = "login" | "signup" | "forget";
export type OtpGenerateType = "register" | "login" | "forget-password" | "delete-account";


export type UserDataType = {
  id: string;
  name: string;
  username: string;
  email: string;
  password?: string;
  avatarId: string | null;
  newsBalance: number;
  audioBalance: number;
  isPremium: boolean;
  planExpiryDate: Date | null;
  defaultCountry: string | null;
  createdAt: Date;
  updatedAt: Date;
  emailVerified?: Date | null;
}

export type OtpType = "register" | "login" | "forget-password" | "delete-account";

export type RegisterBodyType = {
  username: string;
  email: string;
  name: string;
  password: string;
  confirmPassword?: string;
  otp: string;
}

export type GenerateOtpBodyType = {
  email: string;
  type: OtpGenerateType;
}

export type LoginBodyType = {
  email: string;
  password: string;
  otp: string;
}

export type ResetPassBodyType = {
  email: string;
  otp: string;
}

export type GoogleAuthResponseType = {
  clientId: string;
  client_id: string;
  credential: string;
  select_by: string;
}


export type MenuRowProps = {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  className?: string;
};


export type GuardLinkProps = LinkProps & PropsWithChildren & { className?: string };