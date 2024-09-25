import axios from "@/utils/axiosInstance";

export class AuthService {
    // Registro de usuarios
    async registerUser(user: any): Promise<any> {
      const response = await axios.post("/register", user);
      return response.data;
    }
  
    // Inicio de sesión
    async loginUser(credentials: { email: string; password: string }): Promise<any> {
      const response = await axios.post("/login", credentials);
      return response.data;
    }
}
