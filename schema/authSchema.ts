

import * as Yup from 'yup';

export const LoginFormSchema = Yup.object().shape({
  email: Yup.string().email("Invalid Email!").required("Email Required!"),
  password: Yup.string().required("Password Required!"),
  otp: Yup.string().length(6, "OTP must be 6 digits!").required("OTP required!")
})



export const SignupFormSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email!").required("Email required!"),
  username: Yup.string().required("Username required!"),
  name: Yup.string().required("Name required!"),
  password: Yup.string().min(6, "Too short password!").required("Password required!"),
  confirmPassword: Yup.string().oneOf([Yup.ref('password')], "Passwords do not match!").required("Please confirm your password!"),
  otp: Yup.string().length(6, "OTP must be 6 digits!").required("OTP required!"),
});
