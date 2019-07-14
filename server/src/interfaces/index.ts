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

export interface IFormLogin {
    name: string;
    password: string;
}

export interface IFormCheckIn {
    name: string;
    surname?: string;
    password: string;
}

export interface IErrorMessage {
    error: {
        message: string;
        stack: string;
    };
}

export interface IErrorTypeMessage {
    type: string;
    content: Error;
}
