import { ApiBaseResponse, ApiSuccessResponse, FuelDataType } from "@/types/globalTypes";
import ApiService from "./apiService";
import { GenerateOtpBodyType } from "@/types/authTypes";


class UtilityService extends ApiService {

  constructor() {

    super("");

  }


  public async generateOtp(body: GenerateOtpBodyType): Promise<ApiBaseResponse> {
    return await this.api.post("/generate-otp", body);
  }


  public async getFuelPrice(): Promise<ApiSuccessResponse<FuelDataType[]>> {

    const url = "/fuel-price";

    return await this.api.get(url);
  }

}

const utilityService = new UtilityService();

export default utilityService;