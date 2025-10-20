import $api from "../http";
import { IUser } from "../models/response/IUser";

export default class UserService {
    static fetchUsers() {
        return $api.get<IUser[]>('/users');
    }

    static blockUser(id: string) {
        return $api.patch(`/users/${id}/block`);
    }

    static unlockUser(id: string) {
        return $api.patch(`/users/${id}/unlock`);
    }

    static deleteUser(id: string) {
        return $api.delete(`/users/${id}`);
    }
}

