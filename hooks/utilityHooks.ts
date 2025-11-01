import utilityService from "@/services/utilityService";
import { GenerateOtpBodyType } from "@/types/authTypes";
import { useMutation } from "@tanstack/react-query";



export const useSendOtp = () => useMutation({
  mutationFn: (body: GenerateOtpBodyType) => utilityService.generateOtp(body),
})