import { CashfreeOrderType, PaymentHistoryType, PaymentStatusType } from "@/types/paymentTypes";
import ApiService from "./apiService";
import { ApiSuccessResponse } from "@/types/globalTypes";
import { UserDataType } from "@/types/authTypes";


class PaymentService extends ApiService {

  constructor() {

    super("/payment");

  }


  public async createPaymentProduct(): Promise<ApiSuccessResponse<CashfreeOrderType>> {

    return this.api.get("/create");

  }


  public async verifyPayment(orderId: string): Promise<ApiSuccessResponse<{ paymentStatus: PaymentStatusType; user: UserDataType | null; }>> {

    return this.api.get(`/verify/${orderId}`);

  }


  public async getPaymentHistory(): Promise<ApiSuccessResponse<PaymentHistoryType[]>> {

    return this.api.get("/history");

  }

}

const paymentService = new PaymentService();

export default paymentService;