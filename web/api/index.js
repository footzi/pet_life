import { toSignIn } from 'store';
import { setCookie, getCookie } from 'store/utils';

export default class Api {
  static setToken(token) {
    setCookie('token', token);
  }

  static getToken() {
    return getCookie('token');
  }

  static signIn(data) {
    console.log(toSignIn)
    toSignIn({ data , setToken: Api.setToken })
  }
}
