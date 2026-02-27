import { countryMap } from "@/utils/constants";
import * as Yup from "yup";


export const ProfileSettingsValidationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .required("Name is required"),
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be less than 30 characters")
    .matches(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    )
    .required("Username is required"),
  defaultCountry: Yup.string()
    .oneOf(Object.keys(countryMap), "Please select a valid country")
    .required("Default country is required"),
});