export interface UserPayload {
    id: string;
    name: string;
    email: string;
}

export interface AuthResponse {
    user: UserPayload;
    token: string;
}
