"use client";

import { motion, AnimatePresence } from "motion/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { isValidPhoneNumber } from "libphonenumber-js";
import { toast } from "sonner";
import { Loader, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import PhoneInputWithCountry from "./PhoneInputWithCountry";
import { useGoogleUpdate } from "@/hooks/authHooks";
import { setUser } from "@/redux/slices/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";


// ─── Validation ──────────────────────────────────────────────────────────────

const AddNumberSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .trim()
    .required("Phone number is required")
    .test("is-valid-phone", "Enter a valid phone number!", (value) =>
      value ? isValidPhoneNumber(value) : false
    ),
  defaultCountry: Yup.string().required("Country is required"),
});


// ─── Component ───────────────────────────────────────────────────────────────

const AddNumberPopup = () => {

  const dispatch = useAppDispatch();
  const { isAuth, user } = useAppSelector((s) => s.auth);
  const { mutate, isPending } = useGoogleUpdate();

  const formik = useFormik({

    initialValues: {
      phoneNumber: "",
      defaultCountry: "IN",
    },
    validationSchema: AddNumberSchema,

    onSubmit: (values) => {
      mutate(
        values,
        {
          onSuccess: (data) => {
            dispatch(setUser(data.data));
            toast.success(data.message ?? "Phone number added successfully!");
          },
          onError: (err) => toast.error(err.message ?? "Something went wrong"),
        }
      );
    },
  });


  // Show only for authenticated Google users who haven't verified their number
  if (!isAuth || !user || !user.isGoogle || user.isNumVerified) return null;


  return (
    <AnimatePresence>
      <motion.div
        key="add-number-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-99 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 280, damping: 24 }}
          className="relative w-full max-w-sm mx-4 bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
        >

          {/* Top accent bar */}
          <div className="h-1 w-full bg-linear-to-r from-primary via-primary/70 to-primary/30" />

          <div className="p-8 flex flex-col gap-6">

            {/* Header */}
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold tracking-tight">One more step</h2>
                <p className="text-sm text-muted-foreground mt-1 text-balance">
                  Add your phone number to complete your account setup. This is required to continue.
                </p>
              </div>
            </div>


            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5" noValidate>

              <div className="grid gap-2">
                <Label htmlFor="addnum-phone">Phone Number</Label>

                <PhoneInputWithCountry
                  id="addnum-phone"
                  value={formik.values.phoneNumber}
                  onChange={(val) => formik.setFieldValue("phoneNumber", val ?? "")}
                  onCountryChange={(country) =>
                    formik.setFieldValue("defaultCountry", country ?? "IN")
                  }
                  defaultCountry={formik.values.defaultCountry}
                  placeholder="Enter your number"
                  aria-invalid={
                    !!(formik.touched.phoneNumber && formik.errors.phoneNumber)
                  }
                />

                {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-red-500"
                  >
                    {formik.errors.phoneNumber}
                  </motion.p>
                )}

                {formik.touched.defaultCountry && formik.errors.defaultCountry && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-red-500"
                  >
                    {formik.errors.defaultCountry}
                  </motion.p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  "Save & Continue"
                )}
              </Button>

            </form>


            {/* Non-closable notice */}
            <p className="text-center text-xs text-muted-foreground/60">
              This step is required — you cannot skip or close this dialog.
            </p>

          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AddNumberPopup;