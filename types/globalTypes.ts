import { ElementType, ReactNode } from "react";


export type DateUnit = 'days' | 'weeks' | 'months' | 'years';
export type DateDirection = 'previous' | 'next';


export interface DateRangeOptions {
  unit: DateUnit;
  count: number;
  direction?: DateDirection;
}

export interface ISODateRangeOptions {
  count: number;
  unit: DateUnit;
  direction: DateDirection;
}


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
