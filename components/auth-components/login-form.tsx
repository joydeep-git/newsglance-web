"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthPageTypes } from "@/types/authTypes";
import { LoginFormSchema } from "@/schema/authSchema";
import utilityService from "@/services/utilityService";
import { setLoginState } from "@/redux/slices/uiSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useSendOtp } from "@/hooks/utilityHooks";
import { useLogin } from "@/hooks/authHooks";
import { Loader } from "lucide-react";
import { setUser } from "@/redux/slices/authSlice";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import GoogleAuthButton from "./googleAuthButton";



const LoginForm = ({ changeState }: { changeState: (val: AuthPageTypes) => void }) => {

  const dispatch = useAppDispatch();

  const { mutate: otpSendMutation, isPending: otpLoading } = useSendOtp();
  const { mutate: login, isPending: loginLoading } = useLogin();


  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(0);

  // resend timer
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);


  const sendOtp = (email: string) => {

    otpSendMutation({ email, type: "login" }, {
      onSuccess: (data) => {
        setOtpSent(true);
        setTimer(60);
        toast.success(data.message || "OTP sent!");
      },
      onError: (err) => toast.error(err.message || "Failed to send OTP"),
    });

  }

  // formik
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      otp: "",
    },

    validationSchema: LoginFormSchema,

    onSubmit: async (values) => {

      login(values, {
        onSuccess: (data) => {

          if (!data?.error && data?.success && data.data) {
            toast.success(data?.message ?? "Logged in!");
            dispatch(setLoginState(false));
            dispatch(setUser(data.data));
          }

        },
        onError: (err) => toast.error(err.message),
      })
    },
  });

  return (
    <Card className="overflow-hidden">
      <CardContent>
        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          onSubmit={formik.handleSubmit}
          className="p-1 sm:px-3 py-8 flex flex-col gap-6"
        >
          <div className="text-center">
            <h1 className="text-2xl font-bold">Welcome Back 👋</h1>
            <p className="text-muted-foreground text-balance">
              Login to your Newsglance account
            </p>
          </div>

          
          {/* EMAIL */}
          <div className="grid gap-3">
            <Label htmlFor="email">Email</Label>
            <div className="flex items-center gap-1 border rounded-md">
              <Input
                id="email"
                type="email"
                placeholder="email@example.com"
                {...formik.getFieldProps("email")}
                className="border-none"
              />

              {!otpSent ? (
                <Button
                  type="button"
                  variant="link"
                  disabled={!formik.values.email || otpLoading}
                  onClick={() => sendOtp(formik.values.email)}
                  className="w-fit"
                >
                  {otpLoading ? "Sending..." : "Verify"}
                </Button>
              ) : timer > 0 ? (
                <span className="text-xs text-muted-foreground px-2">{timer}s</span>
              ) : (
                <Button
                  type="button"
                  variant="link"
                  onClick={() => sendOtp(formik.values.email)}
                  className="text-blue-600 w-fit"
                >
                  Resend
                </Button>
              )}
            </div>
            {
              !otpSent && formik.values.email.length > 0 && <p className="text-xs text-red-500">Verify Email address!</p>
            }
            {formik.touched.email && formik.errors.email && (
              <p className="text-xs text-red-500">{formik.errors.email}</p>
            )}
          </div>

          {/* OTP */}
          {otpSent && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="grid gap-3"
            >
              <Label htmlFor="otp">OTP</Label>

              <InputOTP
                maxLength={6}
                id="otp"
                name="otp"
                type="text"
                value={formik.values.otp}
                onChange={(val) => formik.setFieldValue("otp", val)} >

                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                </InputOTPGroup>

                <InputOTPGroup>
                  <InputOTPSlot index={1} />
                </InputOTPGroup>

                <InputOTPGroup>
                  <InputOTPSlot index={2} />
                </InputOTPGroup>

                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                </InputOTPGroup>

                <InputOTPGroup>
                  <InputOTPSlot index={4} />
                </InputOTPGroup>

                <InputOTPGroup>
                  <InputOTPSlot index={5} />
                </InputOTPGroup>

              </InputOTP>

              {formik.touched.otp && formik.errors.otp && (
                <p className="text-xs text-red-500">{formik.errors.otp}</p>
              )}
            </motion.div>
          )}

          {/* PASSWORD */}
          <div className="grid gap-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Button
                type="button"
                variant="link"
                onClick={() => changeState("forget")}
                className="text-sm underline-offset-2 hover:underline"
              >
                Forgot password?
              </Button>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-xs text-red-500">{formik.errors.password}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={!otpSent || loginLoading}>
            {loginLoading ? <Loader className="animate-spin" /> : "Login"}
          </Button>

          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:flex after:items-center after:border-t">
            <span className="bg-card text-muted-foreground relative z-10 px-2">
              Or continue with
            </span>
          </div>


          {/* google */}
          <GoogleAuthButton title="Login with Google" />

          <div className="text-center text-sm">
            Don’t have an account?{" "}
            <Button
              type="button"
              variant="link"
              onClick={() => changeState("signup")}
              className="underline underline-offset-4"
            >
              Sign up
            </Button>
          </div>
        </motion.form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
