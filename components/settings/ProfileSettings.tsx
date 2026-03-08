"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "sonner";
import { Loader } from "lucide-react";

import { useAppSelector, useAppDispatch } from "@/redux/store";
import { setUser } from "@/redux/slices/authSlice";
import { useUpdateUser } from "@/hooks/userHooks";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { ProfileSettingsValidationSchema } from "@/schema/userSchema";
import PhoneInputWithCountry from "@/components/auth-components/PhoneInputWithCountry";


const ProfileSettings = () => {

  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { mutate: updateUser, isPending } = useUpdateUser();

  // ── Initial values ────────────────────────────────────────────────────────

  const initialValues = useMemo(() => {
    if (!user) {
      return { name: "", username: "", phoneNumber: "", defaultCountry: "IN" };
    }
    return {
      name: user.name || "",
      username: user.username || "",
      phoneNumber: user.phoneNumber || "",
      defaultCountry: user.defaultCountry || "IN",
    };
  }, [user]);

  // ── Change detection ──────────────────────────────────────────────────────

  const hasChanges = (values: typeof initialValues) =>
    values.name !== initialValues.name ||
    values.username !== initialValues.username ||
    values.phoneNumber !== initialValues.phoneNumber ||
    values.defaultCountry !== initialValues.defaultCountry;

  // ── Submit ────────────────────────────────────────────────────────────────

  const handleSubmit = (values: typeof initialValues) => {

    if (!hasChanges(values)) {
      toast.info("No changes to save");
      return;
    }

    // Only send fields that actually changed
    const updateData: Partial<typeof initialValues> = {};

    if (values.name !== initialValues.name) updateData.name = values.name;
    if (values.username !== initialValues.username) updateData.username = values.username;
    if (values.phoneNumber !== initialValues.phoneNumber) updateData.phoneNumber = values.phoneNumber;
    if (values.defaultCountry !== initialValues.defaultCountry) updateData.defaultCountry = values.defaultCountry;

    updateUser(updateData, {
      onSuccess: (response) => {
        if (response.data) {
          dispatch(setUser(response.data));
          toast.success(response.message);
        } else {
          toast.error("Failed to update profile");
        }
      },
      onError: (error) => {
        toast.error(error?.message || "Failed to update profile");
      },
    });
  };

  // ── Skeleton ──────────────────────────────────────────────────────────────

  if (!user) {
    return (
      <Card className="max-w-lg">
        <CardContent className="p-6 space-y-6">
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-80" />
          </div>
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-9 w-full" />
              </div>
            ))}
            <Skeleton className="h-10 w-32" />
          </div>
        </CardContent>
      </Card>
    );
  }

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <Card className="max-w-lg overflow-hidden">
      <CardContent>
        <Formik
          initialValues={initialValues}
          validationSchema={ProfileSettingsValidationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ values, errors, touched, setFieldValue, setFieldTouched }) => {

            const hasFormChanges = hasChanges(values);

            const isEmpty = (value: string) => !value || value.trim() === "";

            return (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="p-1 sm:px-3 py-8 flex flex-col gap-6"
              >

                {/* ── Header ── */}
                <div className="text-center">
                  <h1 className="text-2xl font-bold">Profile Settings</h1>
                  <p className="text-muted-foreground text-balance text-sm mt-1">
                    Update your name, username and phone number.
                  </p>
                </div>

                <Form className="flex flex-col gap-6">

                  {/* ── Name ── */}
                  <div className="grid gap-3">
                    <Label htmlFor="name">Name</Label>
                    <Field
                      as={Input}
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your name"
                      disabled={isPending}
                      className={touched.name && errors.name ? "border-destructive" : ""}
                    />
                    <ErrorMessage name="name" component="p" className="text-xs text-red-500" />
                  </div>

                  {/* ── Username ── */}
                  <div className="grid gap-3">
                    <Label htmlFor="username">Username</Label>
                    <Field
                      as={Input}
                      id="username"
                      name="username"
                      type="text"
                      placeholder="Enter your username"
                      disabled={isPending}
                      className={touched.username && errors.username ? "border-destructive" : ""}
                    />
                    <ErrorMessage name="username" component="p" className="text-xs text-red-500" />
                  </div>

                  {/* ── Phone Number + Country (combined) ── */}
                  <div className="grid gap-3">
                    <Label htmlFor="phoneNumber">Phone Number</Label>

                    <PhoneInputWithCountry
                      id="phoneNumber"
                      value={values.phoneNumber}
                      onChange={(val) => {
                        setFieldValue("phoneNumber", val || "");
                        setFieldTouched("phoneNumber", true, false);
                      }}
                      onCountryChange={(country) => {
                        setFieldValue("defaultCountry", country || "IN");
                        // Mark phone as touched so its validation shows immediately
                        setFieldTouched("phoneNumber", true, false);
                      }}
                      defaultCountry={values.defaultCountry}
                      disabled={isPending}
                      aria-invalid={!!errors.phoneNumber}
                    />

                    {errors.phoneNumber && (
                      <p className="text-xs text-red-500">{errors.phoneNumber}</p>
                    )}
                  </div>

                  {/* ── Submit ── */}
                  <div className="flex flex-col items-start gap-3">
                    <Button
                      type="submit"
                      disabled={isPending || !hasFormChanges || isEmpty(values.phoneNumber) }
                      className="min-w-[120px] cursor-pointer"
                    >
                      {isPending ? (
                        <>
                          <Loader className="animate-spin" />
                          Saving...
                        </>
                      ) : (
                        "Save Changes"
                      )}
                    </Button>

                    {hasFormChanges && (
                      <p className="text-xs text-muted-foreground">You have unsaved changes</p>
                    )}
                  </div>

                </Form>
              </motion.div>
            );
          }}
        </Formik>
      </CardContent>
    </Card>
  );
};

export default ProfileSettings;