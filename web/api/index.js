import { toSignIn, toSignUp, toSignOut, loadHomeData, loadProfileData, loadAboutData} from 'store';
import { setCookie, removeCookie, getCookie } from 'store/utils';
import Router from 'next/router';

export default class Api {
  static setToken(token) {
    setCookie('token', token);
  }

  static removeToken() {
    removeCookie('token');
  }

  static getToken() {
    return getCookie('token');
  }

  static redirect(url) {
    return Router.push(url);
  }

  static forbiddenRedirect(res, url) {
    if (res) {
      res.writeHead(302, {
        Location: url
      });
      res.end();
    } else {
      Router.push(url);
    }
  }

  static setAuthData(req) {
    const token = req ? req.cookies.token : getCookie('token');
    return { Authorization: `Bearer ${token}` };
  }

  static signIn(body) {
    const setToken = Api.setToken;
    const redirect = (id) => Api.redirect(`/profile/${id}`);
  
    return toSignIn({ body , setToken, redirect })
  }

  static signUp(body) {
    const setToken = Api.setToken;
    const redirect = (id) => Api.redirect(`/profile/${id}`);
  
    return toSignUp({ body , setToken, redirect })
  }

  static signOut() {
    const removeToken = Api.removeToken;
    const redirect = () => Api.redirect(`/`);

    return toSignOut({ removeToken , redirect })
  }

  static getHomeData(req) {
    const settings = {
      headers: Api.setAuthData(req),
      withCredentials: true
    }
    return loadHomeData({ settings })
  }

  static getProfileData(res, req, id) {
    const redirect = () => Api.forbiddenRedirect(res, '/')
    const settings = {
      headers: Api.setAuthData(req),
      withCredentials: true
    }
    return loadProfileData({ settings, id, redirect})
  }

  static getAboutData(res, req) {
    const redirect = () => Api.forbiddenRedirect(res, '/')
    const settings = {
      headers: Api.setAuthData(req),
      withCredentials: true
    }
    return loadAboutData({ settings, redirect })
  }
}
