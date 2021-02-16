export type estado = '0' | '1';

export interface User{
    userID: string;
    userPassword: string;
}

export interface UserResponse{
    message: string;
    userID: string;
    token: string;
    status: estado;
}