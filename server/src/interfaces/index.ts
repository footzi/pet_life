export interface IUser {
  id: number;
  name: string;
  surname: string;
  createDate: string;
  password: string;
}

export interface IPayloadAccessToken {
  username: string;
  password: string;
}

export interface IPayloadRefreshToken {
  id: number;
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

export interface IToken {
  userId: number;
  refresh: string;
}