import AsyncStorage from '@react-native-community/async-storage';
import { toSignIn } from 'store';

export default class Api {
  static setToken(token) {
    AsyncStorage.setItem('token', token);
  }

  static getToken() {
    AsyncStorage.getItem('token');
  }

  static signIn(body) {
    const setToken = Api.setToken;
    toSignIn({ body, setToken })
  }

  static getProfileData(res, req, id) {
    // const redirect = () => Api.forbiddenRedirect(res, '/')
    // const settings = {
    //   headers: Api.setAuthData(req),
    //   withCredentials: true
    // }
    // return loadProfileData({ settings, id, redirect})
  }

  static getAboutData(res, req) {
    // const redirect = () => Api.forbiddenRedirect(res, '/')
    // const settings = {
    //   headers: Api.setAuthData(req),
    //   withCredentials: true
    // }
    // return loadAboutData({ settings, redirect })
  }
}