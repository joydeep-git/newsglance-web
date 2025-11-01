import { ElementType, ReactNode } from "react";


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
