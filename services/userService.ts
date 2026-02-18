
import { UserDataType } from "@/types/authTypes";
import ApiService from "./apiService";
import { ApiSuccessResponse, UpdateUserBodyType } from "@/types/globalTypes";


class UserService extends ApiService {

  constructor() {

    super("/user");

  }

  public async updateImage(file: File): Promise<ApiSuccessResponse<UserDataType>> {

    const formData = new FormData();

    formData.append("avatar", file);

    return this.api.patch("/avatar", formData);
  }


  public async deleteImage(): Promise<ApiSuccessResponse<UserDataType>> {
    return this.api.delete("/avatar");
  }


  public async updateUser(data: UpdateUserBodyType) : Promise<ApiSuccessResponse<UserDataType>> {
    return this.api.patch("/update", data);
  }


}


const userService = new UserService();

export default userService;