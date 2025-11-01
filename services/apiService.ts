import axios, { AxiosInstance } from "axios";

class ApiService {

  protected api: AxiosInstance;

  constructor(url: string) {

    this.api = axios.create({
      baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`,
      withCredentials: true,
    });

    this.api.interceptors.response.use(
      (res) => res.data,
      (err) => {
        if (err.response?.data) {
          return Promise.reject(err.response.data);
        }
        return Promise.reject({ success: false, error: true, message: "Frontend API service error!" });
      }
    );

  }
}

export default ApiService;
