"use client";

import React, { useMemo } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "sonner";
import { useAppSelector, useAppDispatch } from "@/redux/store";
import { setUser } from "@/redux/slices/authSlice";
import { useUpdateUser } from "@/hooks/userHooks";
import { countryMap } from "@/utils/constants";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ProfileSettingsValidationSchema } from "@/schema/userSchema";
import { Loader } from "lucide-react";



const ProfileSettings = () => {


  const dispatch = useAppDispatch();


  const { user } = useAppSelector((state) => state.auth);


  const { mutate: updateUser, isPending } = useUpdateUser();


  // store initial values to compare changes
  const initialValues = useMemo(
    () => {
      if (!user) {
        return {
          name: "",
          username: "",
          defaultCountry: "",
        };
      }
      return {
        name: user.name || "",
        username: user.username || "",
        defaultCountry: user.defaultCountry || "",
      };
    }, [user]);


  // Check if form values have changed from initial values
  const hasChanges = (values: typeof initialValues) => {
    return (
      values.name !== initialValues.name ||
      values.username !== initialValues.username ||
      values.defaultCountry !== initialValues.defaultCountry
    );
  };



  const handleSubmit = (values: typeof initialValues) => {

    if (!hasChanges(values)) {
      toast.info("No changes to save");
      return;
    }

    // Build update payload with only changed fields
    const updateData: {
      name?: string;
      username?: string;
      defaultCountry?: string;
    } = {};

    if (values.name !== initialValues.name) {
      updateData.name = values.name;
    }
    if (values.username !== initialValues.username) {
      updateData.username = values.username;
    }
    if (values.defaultCountry !== initialValues.defaultCountry) {
      updateData.defaultCountry = values.defaultCountry;
    }

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



  // display skeleton
  if (!user) {

    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-9 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-9 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-9 w-full" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-900 mb-2">Profile</h1>
        <p className="text-sm text-slate-500">
          Update your name, username, and default country.
        </p>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={ProfileSettingsValidationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, errors, touched }) => {
          const hasFormChanges = hasChanges(values);
          const isFormValid = Object.keys(errors).length === 0;

          return (
            <Form className="space-y-6 max-w-lg">
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Field
                  as={Input}
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  disabled={isPending}
                  className={
                    touched.name && errors.name
                      ? "border-destructive"
                      : ""
                  }
                />
                <ErrorMessage
                  name="name"
                  component="p"
                  className="text-sm text-destructive"
                />
              </div>

              {/* Username Field */}
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Field
                  as={Input}
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Enter your username"
                  disabled={isPending}
                  className={
                    touched.username && errors.username
                      ? "border-destructive"
                      : ""
                  }
                />
                <ErrorMessage
                  name="username"
                  component="p"
                  className="text-sm text-destructive"
                />
              </div>

              {/* Default Country Field */}
              <div className="space-y-2">
                <Label htmlFor="defaultCountry">Default Country</Label>
                <Field
                  as="select"
                  id="defaultCountry"
                  name="defaultCountry"
                  disabled={isPending}
                  className={`flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ${touched.defaultCountry && errors.defaultCountry
                    ? "border-destructive"
                    : "border-input"
                    }`}
                >
                  <option value="">Select a country</option>
                  {Object.entries(countryMap)
                    .map(([code, name]) => (
                      <option key={code} value={code}>
                        {name}
                      </option>
                    ))}
                </Field>
                <ErrorMessage
                  name="defaultCountry"
                  component="p"
                  className="text-sm text-destructive"
                />
              </div>

              {/* Submit Button */}
              <div className="flex flex-col items-start gap-4">

                <Button type="submit" disabled={isPending || !hasFormChanges || !isFormValid}
                  className="min-w-[120px] cursor-pointer">
                  {isPending
                    ? <>
                      <Loader className="animate-spin" />
                      Saving...
                    </> 
                    : "Save Changes"}
                </Button>

                {hasFormChanges && (
                  <p className="text-sm text-muted-foreground">
                    You have unsaved changes
                  </p>
                )}

              </div>

            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default ProfileSettings;
