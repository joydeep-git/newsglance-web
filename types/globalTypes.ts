import { ElementType, ReactNode } from "react";


export type DateUnit = 'days' | 'weeks' | 'months' | 'years';
export type DateDirection = 'previous' | 'next';


export interface FileDataType {
  id: string;
  name: string;
  url: string;
  fileSize: number;
  createdAt: Date;
  type: "image" | "audio";
  isDefaultFile: boolean;
  duration?: number | null;
};


export interface MaxWidthWrapperProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}



export interface ApiBaseResponse {
  success: boolean;
  error: boolean;
  message: string;
  statusCode?: number;
  stack?: string;
}

export type ApiErrorResponse = ApiBaseResponse;

export interface ApiSuccessResponse<T> extends ApiBaseResponse {
  data: T;
}

export interface LoginSuccessResponse<T> extends ApiSuccessResponse<T> {
  token: string;
}


export interface UpdateUserBodyType {
  name?: string;
  username?: string;
  phoneNumber?: string;
  defaultCountry?: string;
}


export type CountryMapType = {
  name: string;
  countrycode: string;
  currency: string;
  flag: string;
}


export type AudioPlayerType = {
  audioTrack: FileDataType | null;
  onClose: () => void;
}


export type ContactCardProps = {
  icon: React.ElementType;
  label: string;
  value: string;
  href?: string;
  copyable?: boolean;
  delay?: number;
}

export type SocialLinkItemProps = {
  icon: React.ElementType;
  label: string;
  href: string;
  delay?: number;
}