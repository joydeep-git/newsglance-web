import ApiService from "./apiService";
import { LoginBodyType, RegisterBodyType, ResetPassBodyType, UserDataType } from "@/types/authTypes";
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
    return await this.api.get("/logout");
  }

  public async deleteAccount(body: LoginBodyType): Promise<ApiBaseResponse> {
    return await this.api.delete("/delete", { data: body });
  }


  public async verifyToken(): Promise<LoginSuccessResponse<UserDataType> | null> {
    return await this.api.get("/verify-token");
  }

  public async verifyForgetPassword(body: ResetPassBodyType): Promise<ApiBaseResponse> {
    return await this.api.post("/cr/forget/verify", body);
  }

  public async resetForgetPassword(body: LoginBodyType): Promise<ApiBaseResponse> {
    return await this.api.post("/cr/forget/update", body);
  }


  public async googleLogin(token: string): Promise<LoginSuccessResponse<UserDataType>> {
    return await this.api.post("/google/authorize", { googleToken: token });
  }

}

const authService = new AuthService();

export default authService;