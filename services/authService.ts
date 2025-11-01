import ApiService from "./apiService";
import { LoginBodyType, RegisterBodyType, UserDataType } from "@/types/authTypes";
import { ApiBaseResponse, ApiSuccessResponse, LoginSuccessResponse } from "@/types/globalTypes";


class AuthService extends ApiService {

  constructor() {
    super("/auth");
  }


  public async credentialSignUp(body: RegisterBodyType): Promise<ApiSuccessResponse<UserDataType> | null> {
    return await this.api.post("/cr/register", body);
  }


  public async credentialLogin(body: LoginBodyType): Promise<LoginSuccessResponse<UserDataType> | null> {
    return await this.api.post("/cr/login", body);
  }

  public async signOut(): Promise<ApiBaseResponse> {
    return await this.api.get("/cr/logout");
  }


  public async verifyToken(): Promise<LoginSuccessResponse<UserDataType> | null>{
    return await this.api.get("/verify-token");
  }


  public async googleLogin(token: string): Promise<LoginSuccessResponse<UserDataType>> {

    return await this.api.post("/google/authorize", { googleToken: token });

  }

}

const authService = new AuthService();

export default authService;