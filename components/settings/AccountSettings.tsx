 "use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Shield, Trash2, Loader, AlertTriangle } from "lucide-react";

import { useAppSelector, useAppDispatch } from "@/redux/store";
import { setLogout } from "@/redux/slices/authSlice";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useSendOtp } from "@/hooks/utilityHooks";
import { useForgetPasswordVerify, useResetPassword, useDeleteAccount } from "@/hooks/authHooks";

const AccountSettings = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);

  // ----- Change Password (reuse forget-password flow) -----
  const { mutate: sendResetOtp, isPending: isResetOtpLoading } = useSendOtp();
  const { mutate: verifyResetOtp, isPending: isVerifyResetLoading } = useForgetPasswordVerify();
  const { mutate: resetPassword, isPending: isResetPasswordLoading } = useResetPassword();

  const [resetStep, setResetStep] = useState<0 | 1 | 2>(0);
  const [resetOtp, setResetOtp] = useState("");
  const [resetTimer, setResetTimer] = useState(0);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  // Timer countdown for reset OTP
  useEffect(() => {
    if (resetTimer <= 0) return;
    const id = setInterval(() => setResetTimer((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [resetTimer]);

  const handleSendResetOtp = () => {
    if (!user?.email) {
      toast.error("Email not found. Please re-login.");
      return;
    }

    sendResetOtp(
      { email: user.email, type: "forget-password" },
      {
        onSuccess: (data: { message?: string }) => {
          toast.success(data.message || "OTP sent to your email");
          setResetStep(1);
          setResetTimer(60);
        },
        onError: (err: { message?: string }) => {
          toast.error(err?.message || "Failed to send OTP");
        },
      }
    );
  };

  const handleVerifyResetOtp = () => {
    if (!user?.email) return;
    if (resetOtp.length !== 6) {
      toast.error("Enter 6-digit OTP");
      return;
    }

    verifyResetOtp(
      { email: user.email, otp: resetOtp },
      {
        onSuccess: (data: { error: boolean; success: boolean; message?: string }) => {
          if (!data.error && data.success) {
            toast.success(data.message ?? "OTP verified");
            setResetStep(2);
          } else {
            toast.error(data.message || "OTP verification failed");
          }
        },
        onError: (err: { message?: string }) =>
          toast.error(err?.message || "OTP verification failed"),
      }
    );
  };

  const handleChangePassword = () => {
    if (!user?.email) return;

    if (!newPassword || newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      toast.error("Passwords do not match");
      return;
    }

    resetPassword(
      { email: user.email, password: newPassword, otp: resetOtp },
      {
        onSuccess: (data: { error: boolean; success: boolean; message?: string }) => {
          if (!data.error && data.success) {
            toast.success(data.message ?? "Password updated successfully");
            // reset local state
            setResetStep(0);
            setResetOtp("");
            setNewPassword("");
            setConfirmNewPassword("");
          } else {
            toast.error(data.message || "Failed to update password");
          }
        },
        onError: (err: { message?: string }) =>
          toast.error(err?.message || "Failed to update password"),
      }
    );
  };

  // ----- Delete Account (OTP + password with stepper) -----
  const { mutate: sendDeleteOtp, isPending: isDeleteOtpLoading } = useSendOtp();
  const { mutate: deleteAccount, isPending: isDeleteLoading } = useDeleteAccount();

  const [deleteStep, setDeleteStep] = useState<0 | 1>(0);
  const [deleteOtp, setDeleteOtp] = useState("");
  const [deletePassword, setDeletePassword] = useState("");
  const [deleteTimer, setDeleteTimer] = useState(0);

  // Timer countdown for delete OTP
  useEffect(() => {
    if (deleteTimer <= 0) return;
    const id = setInterval(() => setDeleteTimer((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [deleteTimer]);

  const handleSendDeleteOtp = () => {
    if (!user?.email) {
      toast.error("Email not found. Please re-login.");
      return;
    }

    sendDeleteOtp(
      { email: user.email, type: "delete-account" },
      {
        onSuccess: (data: { message?: string }) => {
          toast.success(data.message || "OTP sent to your email");
          setDeleteStep(1);
          setDeleteTimer(60);
        },
        onError: (err: { message?: string }) => {
          toast.error(err?.message || "Failed to send OTP");
        },
      }
    );
  };

  const handleDeleteAccount = () => {
    if (!user?.email) return;

    if (deleteOtp.length !== 6) {
      toast.error("Enter 6-digit OTP");
      return;
    }

    if (!deletePassword) {
      toast.error("Enter your password to confirm");
      return;
    }

    deleteAccount(
      { email: user.email, password: deletePassword, otp: deleteOtp },
      {
        onSuccess: (data: { error: boolean; success: boolean; message?: string }) => {
          if (!data.error && data.success) {
            toast.success(data.message || "Account deleted successfully");
            dispatch(setLogout());
            router.replace("/");
          } else {
            toast.error(data.message || "Failed to delete account");
          }
        },
        onError: (err: { message?: string }) => {
          toast.error(err?.message || "Failed to delete account");
        },
      }
    );
  };

  if (!user) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-4 w-64" />
        <Skeleton className="h-32 w-full max-w-xl" />
        <Skeleton className="h-32 w-full max-w-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-xl font-semibold text-slate-900 mb-2">Account</h1>
        <p className="text-sm text-slate-500">
          Manage your account security and critical actions.
        </p>
      </div>

      {/* Change password via OTP */}
      <Card className="max-w-xl">
        <CardHeader className="flex flex-row items-start justify-between gap-3">
          <div>
            <CardTitle className="flex items-center gap-2 text-base">
              <Shield className="h-4 w-4" />
              Change password
            </CardTitle>
            <CardDescription>
              Reset your password securely using an OTP sent to your email.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-1 text-sm">
            <p className="font-medium text-slate-700">Email</p>
            <p className="rounded-md border border-dashed bg-slate-50 px-3 py-2 text-xs text-slate-600">
              {user.email}
            </p>
          </div>

          {resetStep === 0 && (
            <div className="space-y-3">
              <p className="text-xs text-slate-500">
                We&apos;ll send a 6-digit OTP to your email. Use it to verify and set a new password.
              </p>
              <Button
                type="button"
                onClick={handleSendResetOtp}
                disabled={isResetOtpLoading}
                className="w-fit"
              >
                {isResetOtpLoading ? (
                  <>
                    <Loader className="h-4 w-4 animate-spin" />
                    <span>Sending OTP...</span>
                  </>
                ) : (
                  "Send OTP"
                )}
              </Button>
            </div>
          )}

          {resetStep === 1 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <Label htmlFor="reset-otp">Enter OTP</Label>
                {resetTimer > 0 ? (
                  <span className="text-xs text-muted-foreground">
                    Resend in {resetTimer}s
                  </span>
                ) : (
                  <Button
                    type="button"
                    variant="link"
                    className="px-0 text-xs"
                    onClick={handleSendResetOtp}
                    disabled={isResetOtpLoading}
                  >
                    Resend OTP
                  </Button>
                )}
              </div>
              <InputOTP
                maxLength={6}
                id="reset-otp"
                value={resetOtp}
                onChange={(val) => setResetOtp(val.toUpperCase())}
              >
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <InputOTPGroup key={index}>
                    <InputOTPSlot index={index} />
                  </InputOTPGroup>
                ))}
              </InputOTP>

              <Button
                type="button"
                className="w-fit"
                onClick={handleVerifyResetOtp}
                disabled={resetOtp.length !== 6 || isVerifyResetLoading}
              >
                {isVerifyResetLoading ? (
                  <Loader className="h-4 w-4 animate-spin" />
                ) : (
                  "Verify OTP"
                )}
              </Button>
            </div>
          )}

          {resetStep === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="new-password">New password</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-new-password">Confirm password</Label>
                <Input
                  id="confirm-new-password"
                  type="password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  placeholder="Re-enter new password"
                />
              </div>
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  onClick={handleChangePassword}
                  disabled={isResetPasswordLoading}
                >
                  {isResetPasswordLoading ? (
                    <Loader className="h-4 w-4 animate-spin" />
                  ) : (
                    "Update password"
                  )}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setResetStep(0);
                    setResetOtp("");
                    setNewPassword("");
                    setConfirmNewPassword("");
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete account with stepper */} 
      <Card className="max-w-xl border-destructive/40">
        <CardHeader className="flex flex-col gap-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <CardTitle className="flex items-center gap-2 text-base text-destructive">
                <Trash2 className="h-4 w-4" />
                Delete account
              </CardTitle>
              <CardDescription className="text-xs">
                Permanently delete your account and all associated data. This action cannot be undone.
              </CardDescription>
            </div>
          </div>

          {/* Simple stepper */} 
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div
                className={`flex h-6 w-6 items-center justify-center rounded-full border text-[11px] font-semibold ${
                  deleteStep === 0
                    ? "bg-destructive text-white border-destructive"
                    : "bg-destructive/10 text-destructive border-destructive/40"
                }`}
              >
                1
              </div>
              <span
                className={
                  deleteStep === 0
                    ? "text-destructive font-medium"
                    : "text-slate-500"
                }
              >
                Verify identity
              </span>
            </div>

            <div className="h-px flex-1 bg-slate-200" />

            <div className="flex items-center gap-2">
              <div
                className={`flex h-6 w-6 items-center justify-center rounded-full border text-[11px] font-semibold ${
                  deleteStep === 1
                    ? "bg-destructive text-white border-destructive"
                    : "bg-slate-100 text-slate-400 border-slate-300"
                }`}
              >
                2
              </div>
              <span
                className={
                  deleteStep === 1
                    ? "text-destructive font-medium"
                    : "text-slate-500"
                }
              >
                Confirm deletion
              </span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-5">
          {deleteStep === 0 && (
            <div className="space-y-3">
              <div className="flex items-start gap-2 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                <p>
                  To start the deletion process, we will send a one-time OTP code to{" "}
                  <span className="font-semibold">{user.email}</span>.
                </p>
              </div>

              {isDeleteOtpLoading ? (
                <div className="space-y-2">
                  <Skeleton className="h-9 w-40" />
                  <Skeleton className="h-4 w-56" />
                </div>
              ) : (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleSendDeleteOtp}
                  className="w-fit"
                >
                  Send OTP to email
                </Button>
              )}
            </div>
          )}

          {deleteStep === 1 && (
            <div className="space-y-5">
              <div className="flex items-center justify-between gap-2">
                <Label htmlFor="delete-otp">OTP</Label>
                {deleteTimer > 0 ? (
                  <span className="text-xs text-muted-foreground">
                    Resend in {deleteTimer}s
                  </span>
                ) : (
                  <Button
                    type="button"
                    variant="link"
                    className="px-0 text-xs"
                    onClick={handleSendDeleteOtp}
                    disabled={isDeleteOtpLoading}
                  >
                    Resend OTP
                  </Button>
                )}
              </div>

              <InputOTP
                maxLength={6}
                id="delete-otp"
                value={deleteOtp}
                onChange={(val) => setDeleteOtp(val.toUpperCase())}
              >
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <InputOTPGroup key={index}>
                    <InputOTPSlot index={index} />
                  </InputOTPGroup>
                ))}
              </InputOTP>

              <div className="space-y-2">
                <Label htmlFor="delete-password">Confirm with password</Label>
                <Input
                  id="delete-password"
                  type="password"
                  value={deletePassword}
                  onChange={(e) => setDeletePassword(e.target.value)}
                  placeholder="Enter your current password"
                />
              </div>

              <div className="flex flex-col gap-3">
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleDeleteAccount}
                  disabled={isDeleteLoading}
                  className="w-fit"
                >
                  {isDeleteLoading ? (
                    <>
                      <Loader className="h-4 w-4 animate-spin" />
                      <span>Deleting...</span>
                    </>
                  ) : (
                    "Delete my account"
                  )}
                </Button>
                <p className="text-[11px] text-slate-500">
                  This action is permanent. Your news history, saved data, and all associated
                  content will be removed and cannot be recovered.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountSettings;
