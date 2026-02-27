import { AxiosError } from 'axios';
import { ApiErrorResponse } from './../types/globalTypes';


export const errorHandler = (err: unknown): string => {

  if (err instanceof AxiosError) {
    const apiError = err.response?.data as ApiErrorResponse;
    return apiError?.message || err.message || "Something went wrong!";
  }

  if (err instanceof Error) return err.message;

  return "Unknown error occurred!";
}