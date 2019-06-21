export interface IUser {
    id?: number;
    name: string;
    password: string;
}

export interface IPayloadJWT {
    username: string;
    password: string;
}
