import { API_URL } from './../http/index';
import { makeAutoObservable } from "mobx";
import { IUser } from "../models/response/IUser";
import AuthService from "../services/AuthService";
import UserService from "../services/UserService";
import axios from "axios";
import { AuthResponse } from "../models/response/AuthResponse";

export default class Store {
    user = {} as IUser;
    users: IUser[] = [];
    isAuth = false;
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }
    
    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setUser(user: IUser) {
        this.user = user;
    }

    setUsers(users: IUser[]) {
        this.users = users;
    }

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }

    async login(name: string, email: string, password: string) {
        try {
            const response = await AuthService.login(name, email, password);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async registration(name: string, email: string, password: string) {
        try {
            const response = await AuthService.registration(name, email, password);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async logout() {
        try {
            await AuthService.logout();
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({} as IUser);
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async checkAuth() {
        try {
            this.setLoading(true);
            if (!localStorage.getItem('token')) {
                this.setAuth(false);
                this.setUser({} as IUser);
                return;
            }

            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, { withCredentials: true });
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e: any) {
            console.log('Auth check failed:', e.response?.data?.message || e);
            this.setAuth(false);
            this.setUser({} as IUser);
        } finally {
            this.setLoading(false);
        }
    }

    async fetchUsers() {
        try {
            const response = await UserService.fetchUsers();
            const sortedUsers = response.data.sort((a: IUser, b: IUser) =>
                a.name.localeCompare(b.name, 'en', { sensitivity: 'base' })
            );
            this.setUsers(sortedUsers);
        } catch (e: any) {
            console.error("Error fetching users:", e.response?.data?.message || e);
        }
    }

    async blockUser(id: string) {
        await UserService.blockUser(id);
        await this.fetchUsers();
    }

    async unlockUser(id: string) {
        await UserService.unlockUser(id);
        await this.fetchUsers();
    }

    async deleteUser(id: string) {
        await UserService.deleteUser(id);
        await this.fetchUsers();
    }
}
