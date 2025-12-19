
import ApiService from "./apiService";


class UserService extends ApiService {

  constructor() {

    super("/user");

  }

  public async updateProfile() {
    
  }

  


}


const userService = new UserService();

export default userService;