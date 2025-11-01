import { ApiBaseResponse } from "@/types/globalTypes";
import ApiService from "./apiService";
import { GenerateOtpBodyType } from "@/types/authTypes";


class UtilityService extends ApiService {

  constructor() {

    super("");

  }


  public async generateOtp(body: GenerateOtpBodyType): Promise<ApiBaseResponse> {
    return await this.api.post("/generate-otp", body);
  }


}

const utilityService = new UtilityService();

export default utilityService;