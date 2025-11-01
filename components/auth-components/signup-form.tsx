"use client";


import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { toast } from "sonner";


import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthPageTypes } from "@/types/authTypes";
import { useSignup } from "@/hooks/authHooks";
import { SignupFormSchema } from "@/schema/authSchema";
import { useSendOtp } from "@/hooks/utilityHooks";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { Loader } from "lucide-react";
import GoogleAuthButton from "./googleAuthButton";


const SignupForm = ({ changeState }: { changeState: (val: AuthPageTypes) => void }) => {


  // tanstack query call
  const { mutate: otpMutate, isPending: otpLoading } = useSendOtp();
  const { mutate: signUp, isPending: signUpLoading } = useSignup();


  // otp related states
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(0);

  // countdown timer logic
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);


  // formik setup
  const formik = useFormik({

    initialValues: {
      username: "",
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      otp: "",
    },

    validationSchema: SignupFormSchema,

    onSubmit: (values) => {

      if (!otpSent) {
        toast.error("Verify email!");
        return;
      }

      signUp(values, {
        onSuccess: (data) => {
          changeState("login");
          toast.success(data?.message);
        },
        onError: (err) => toast.error(err.message),
      });
    },
  });


  // send otp handler
  const sendOtp = () => {

    const email = formik.values.email;
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !pattern.test(email)) {
      return formik.setFieldError("email", "Enter a valid email first!");
    }

    otpMutate(
      { email, type: "register" },
      {
        onSuccess: () => {
          setOtpSent(true);
          setTimer(60);
        },
        onError: (err) => formik.setFieldError("email", err?.message),
      }
    );
  };


  return (
    <Card className="overflow-hidden">

      <CardContent>

        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-1 sm:px-3 py-8 flex flex-col gap-6"
          onSubmit={formik.handleSubmit}
        >

          <div className="text-center">
            <h1 className="text-2xl font-bold">Welcome to Newsglance</h1>
            <p className="text-muted-foreground text-balance">Create an account</p>
          </div>


          {/* USERNAME */}
          <div className="grid gap-3">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="john"
              {...formik.getFieldProps("username")}
            />
            {formik.touched.username && formik.errors.username && (
              <p className="text-xs text-red-500">{formik.errors.username}</p>
            )}
          </div>


          {/* NAME */}
          <div className="grid gap-3">
            <Label htmlFor="name">Full Name</Label>
            <Input type="text" id="name" placeholder="John Doe" {...formik.getFieldProps("name")} />
            {formik.touched.name && formik.errors.name && (
              <p className="text-xs text-red-500">{formik.errors.name}</p>
            )}
          </div>


          {/* EMAIL + VERIFY */}
          <div className="grid gap-3">

            <Label htmlFor="email">Email</Label>

            <div className="flex items-center gap-1 border rounded-md">

              <Input
                id="email"
                type="email"
                placeholder="john@email.com"
                {...formik.getFieldProps("email")}
                className="border-none"
              />

              {!otpSent ? (

                <Button
                  type="button"
                  variant="link"
                  disabled={!formik.values.email || otpLoading}
                  onClick={() => sendOtp()}
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
                  onClick={() => sendOtp()}
                  className="text-blue-600 w-min"
                >
                  Resend
                </Button>
              )}
            </div>

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

              {
                formik.touched.otp && formik.errors.otp && (
                  <p className="text-xs text-red-500">{formik.errors.otp}</p>
                )
              }
            </motion.div>
          )}


          {/* PASSWORD */}
          <div className="grid gap-3">

            <Label htmlFor="password">Password</Label>

            <Input
              id="password"
              type="password"
              placeholder="password"
              {...formik.getFieldProps("password")}
            />

            {
              formik.touched.password && formik.errors.password && (
                <p className="text-xs text-red-500">{formik.errors.password}</p>
              )
            }
          </div>


          {/* CONFIRM PASSWORD */}
          <div className="grid gap-3">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="text"
              placeholder="confirm password"
              {...formik.getFieldProps("confirmPassword")}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <p className="text-xs text-red-500">{formik.errors.confirmPassword}</p>
            )}
          </div>


          {/* REGISTER BUTTON */}
          <Button
            type="submit"
            className="w-full"
            disabled={signUpLoading || !otpSent}
          >
            {signUpLoading ? <Loader className="animate-spin" /> : "Register"}
          </Button>


          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:flex after:items-center after:border-t">
            <span className="bg-card text-muted-foreground relative z-10 px-2">
              Or continue with
            </span>
          </div>


          <GoogleAuthButton />


          <div className="text-center text-sm">
            Already have an account?{" "}
            <Button
              type="button"
              variant={"link"}
              onClick={() => changeState("login")}
              className="underline underline-offset-4"
            >
              Login
            </Button>
          </div>

        </motion.form>

      </CardContent>

    </Card>
  );
};

export default SignupForm;
