import $api from "../http";
import { AuthResponse } from "../models/response/AuthResponse";

export default class AuthService {
    static async login(name: string,email: string, password: string) {
        return $api.post<AuthResponse>("/login", { name, email, password });
    }

    static async registration(name: string,email: string, password: string) {
        return $api.post<AuthResponse>("/registration", { name, email, password });
    }

    static async logout(){
        return $api.post<AuthResponse>("/logout");
    }
}