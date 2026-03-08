import * as Yup from 'yup';
import { isValidPhoneNumber } from 'libphonenumber-js';

export const LoginFormSchema = Yup.object().shape({
  email: Yup.string().email("Invalid Email!").required("Email Required!"),
  password: Yup.string().required("Password Required!"),
  otp: Yup.string().length(6, "OTP must be 6 digits!").required("OTP required!")
})



export const SignupFormSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email!").required("Email required!"),
  username: Yup.string().required("Username required!")
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters")
    .matches(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    ),
  name: Yup.string().required("Name required!"),

  phoneNumber: Yup.string().trim()
    .test("is-valid-phone", "Enter a valid phone number!",
      (value) => { return value ? isValidPhoneNumber(value) : false; })
    .required("Phone number is required").min(3, "Enter a valid phone number!"),

  defaultCountry: Yup.string().required("Country required!"),
  password: Yup.string().min(6, "Too short password!").required("Password required!"),
  confirmPassword: Yup.string().oneOf([Yup.ref('password')], "Passwords do not match!").required("Please confirm your password!"),
  otp: Yup.string().trim().length(6, "OTP must be 6 digits!").required("OTP required!"),
});


export const ChangePasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("New password is required"),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords do not match!")
    .required("Please confirm your password"),
});

export const DeleteAccountSchema = Yup.object().shape({
  deletePassword: Yup.string().required("Password is required to confirm deletion"),
});
