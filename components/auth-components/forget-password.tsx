"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { AuthPageTypes } from "@/types/authTypes";
import { useFormik } from "formik";
import { LoginFormSchema } from "@/schema/authSchema";
import { useForgetPasswordVerify, useResetPassword } from "@/hooks/authHooks";
import { useSendOtp } from "@/hooks/utilityHooks";

const ForgetPassword = ({ changeState }: { changeState: (val: AuthPageTypes) => void }) => {


  const { mutate: verifyForget, isPending: isVerifyLoading } = useForgetPasswordVerify();
  const { mutate: resetPassword, isPending: isResetLoading } = useResetPassword();
  const { mutate: otpSendMutation, isPending: otpLoading } = useSendOtp();

  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(0);
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  // formik
  const formik = useFormik({

    initialValues: {
      email: "",
      otp: "",
      password: "",
    },

    validationSchema: LoginFormSchema,

    onSubmit: async (values) => {

      if (step !== 2) return;

      if (values.password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      resetPassword(values, {
        onSuccess: (data) => {
          if (!data?.error && data?.success) {
            toast.success(data?.message ?? "Password reset completed. Please login!");
            changeState("login");
          }
        },
        onError: (err) => toast.error(err.message),
      });
    },
  });


  // countdown
  useEffect(() => {
    if (timer <= 0) return;
    const id = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [timer]);


  const sendOtp = (email: string) => {

    if (!email) {
      toast.error("Enter your email");
      return;
    }

    otpSendMutation(
      { email, type: "forget-password" },
      {
        onSuccess: (data) => {
          setOtpSent(true);
          setTimer(60);
          setStep(1);
          toast.success(data.message || "OTP sent!");
        },
        onError: (err) => toast.error(err.message || "Failed to send OTP"),
      }
    );
  };

  const verifyForgetPassword = async () => {

    formik.setTouched({ email: true, otp: true }, true);

    const errors = await formik.validateForm();

    if (errors.email || errors.otp) return;

    const { email, otp } = formik.values;

    verifyForget(
      { email, otp },
      {
        onSuccess: (data) => {
          if (data.success && !data.error) {
            toast.success(data.message ?? "OTP verified");
            setStep(2);
          }
        },
        onError: (err) => toast.error(err.message),
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
          onSubmit={formik.handleSubmit}
          className="p-1 sm:px-3 py-8 flex flex-col gap-6"
        >
          <div className="text-center">
            <h1 className="text-2xl font-bold">Reset Password</h1>
          </div>


          {step !== 2 && (
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
                    {otpLoading ? "Sending..." : "Send OTP"}
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
              {!otpSent && formik.values.email.length > 0 && (
                <p className="text-xs text-red-500">Verify Email address!</p>
              )}
              {formik.touched.email && formik.errors.email && (
                <p className="text-xs text-red-500">{formik.errors.email}</p>
              )}
            </div>
          )}

          {/* OTP (step 1) */}
          {otpSent && step === 1 && (
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
                onChange={(val) => formik.setFieldValue("otp", val.toUpperCase())}
              >
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

              <Button
                type="button"
                className="w-full"
                disabled={formik.values.otp.length !== 6 || isVerifyLoading}
                onClick={verifyForgetPassword}
              >
                {isVerifyLoading ? <Loader className="animate-spin" /> : "Verify OTP"}
              </Button>
            </motion.div>
          )}

          {/* PASSWORD + CONFIRM (step 2) */}
          {step === 2 && (
            <>
              <div className="grid gap-3">
                <Label htmlFor="password">New Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="New password"
                  {...formik.getFieldProps("password")}
                />
                {formik.touched.password && formik.errors.password && (
                  <p className="text-xs text-red-500">{formik.errors.password}</p>
                )}
              </div>

              <div className="grid gap-3">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="text"
                  placeholder="Re-enter password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {confirmPassword.length > 0 &&
                  confirmPassword !== formik.values.password && (
                    <p className="text-xs text-red-500">Passwords do not match</p>
                  )}
              </div>

              <Button type="submit" className="w-full" disabled={isResetLoading}>
                {isResetLoading ? <Loader className="animate-spin" /> : "Reset Password"}
              </Button>
            </>
          )}

          <div className="text-center text-sm">
            Remember password?{" "}
            <Button
              type="button"
              variant="link"
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

export default ForgetPassword;
