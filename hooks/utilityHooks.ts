import utilityService from "@/services/utilityService";
import { GenerateOtpBodyType } from "@/types/authTypes";
import { useMutation, useQuery } from "@tanstack/react-query";



export const useSendOtp = () => useMutation({
  mutationFn: (body: GenerateOtpBodyType) => utilityService.generateOtp(body),
})


export const useFuelPrice = () => useQuery({
  queryKey: ["fuel-price"],
  queryFn: () => utilityService.getFuelPrice(),
  enabled: true,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  staleTime: 1000 * 60 * 5,
  gcTime: 1000 * 60 * 5,
})
