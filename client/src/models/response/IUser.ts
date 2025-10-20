export interface IUser {
    _id: string;
    name: string;
    email: string;
    lastLogin: Date | null;
    isBlocked: boolean;
    isActivated: boolean;
  }