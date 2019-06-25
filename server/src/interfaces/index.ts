export interface IUser {
    id?: number;
    name: string;
    surname: string;
    createDate: string;
    password: string;
}

export interface IPayloadJWT {
    username: string;
    password: string;
}
