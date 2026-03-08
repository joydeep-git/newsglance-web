import { countryMap } from "@/utils/constants";
import * as Yup from "yup";
import { isValidPhoneNumber } from "libphonenumber-js";


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

  phoneNumber: Yup.string()
    .test("valid-phone", "Enter a valid phone number!", (value) => {
      if (!value) return true; // optional in profile
      return isValidPhoneNumber(value);
    })
    .nullable(),

  defaultCountry: Yup.string()
    .oneOf([...countryMap.keys()], "Please select a valid country")
    .required("Default country is required"),
});