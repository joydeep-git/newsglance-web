import paymentService from "@/services/paymentService";
import { useQuery } from "@tanstack/react-query";



export const useCreatePaymentProduct = () => useQuery({
  queryKey: ["payment-product"],
  queryFn: () => paymentService.createPaymentProduct(),
  enabled: false,
  retry: false,
  refetchOnWindowFocus: false,
  refetchOnMount: false,
  refetchOnReconnect: false,
})


export const useVerifyPayment = (orderId: string) => useQuery({
  queryKey: ["verify-payment", orderId],
  queryFn: () => paymentService.verifyPayment(orderId),
  enabled: !!orderId,
  retry: false,
  refetchOnWindowFocus: false,
  refetchOnMount: false,
  refetchOnReconnect: false,
})


export const usePaymentHistory = () => useQuery({
  queryKey: ["payment-history"],
  queryFn: () => paymentService.getPaymentHistory(),
  retry: false,
  refetchOnWindowFocus: false,
})
