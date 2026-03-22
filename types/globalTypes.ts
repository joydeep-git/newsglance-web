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
