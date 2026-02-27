import authService from "@/services/authService";
import { LoginBodyType, RegisterBodyType, ResetPassBodyType } from "@/types/authTypes";
import { useMutation, useQuery } from "@tanstack/react-query";


export const useSignup = () => useMutation({
  mutationFn: (data: RegisterBodyType) => authService.credentialSignUp(data),
})

export const useLogin = () => useMutation({
  mutationFn: (data: LoginBodyType) => authService.credentialLogin(data),
})

export const useSignOut = () => useQuery({
  queryKey: ["signOut!"],
  queryFn: () => authService.signOut(),
  enabled: false,
})


export const useForgetPasswordVerify = () => useMutation({
  mutationFn: (val: ResetPassBodyType) => authService.verifyForgetPassword(val),
})

export const useResetPassword = () => useMutation({
  mutationFn: (val: LoginBodyType) => authService.resetForgetPassword(val)
})

export const useDeleteAccount = () => useMutation({
  mutationFn: (body: LoginBodyType) => authService.deleteAccount(body),
})


export const useGoogleAuth = () => useMutation({
  mutationFn: (token: string) => authService.googleLogin(token),
})


export const useVerifyToken = () => useQuery({
  queryKey: ["verify-token"],
  queryFn: () => authService.verifyToken(),
  enabled: false,
  retry: false,
})