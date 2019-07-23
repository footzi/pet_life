import { toSignIn, toSignUp, toSignOut, loadHomeData, loadProfileData, loadAboutData, refreshTokens} from 'store';
import { setCookie, removeCookie, getCookie } from 'store/utils';
import Router from 'next/router';
import jwt from 'jsonwebtoken';

const SECRET = require('../../server.config.json').secret;

export default class Api {
  static setToken(access_token, refresh_token) {
    setCookie('access_token', access_token);
    setCookie('refresh_token', refresh_token);
  }

  static removeToken() {
    removeCookie('access_token');
    removeCookie('refresh_token');
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

  static setAuthData(req, refresh = false) {
    const key = refresh ? 'refresh_token' : 'access_token';
    const token = req ? req.cookies[key] : getCookie(key);

    return { Authorization: `Bearer ${token}`};
  }

  static checkAccessToken() {
    const access_token = getCookie('access_token');

    jwt.verify(access_token, SECRET, (err) => {
      if (err) {
        const settings = {
          headers: Api.setAuthData(req, true),
          withCredentials: true
        }
        refreshTokens({ settings, setToken});
      }
    })
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
    Api.checkAccessToken();

    const redirect = () => Api.forbiddenRedirect(res, '/')
    const settings = {
      headers: Api.setAuthData(req),
      withCredentials: true
    }
    return loadAboutData({ settings, redirect })
  }
}
