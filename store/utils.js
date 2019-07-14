import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const setCookie = (key, value, path = '/') => {
  cookies.set(key, value, { path });
};

export const removeCookie = (key, path = '/') => {
  cookies.remove(key, { path });
};

export const getCookie = (key) => cookies.get(key);
