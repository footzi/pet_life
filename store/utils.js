import { Cookies } from 'react-cookie';
import Router from 'next/router';

const cookies = new Cookies();

/**
 * Устанавливает куки
 * @param {string} key - ключ
 * @param {string} value - значение
 * @param {string} path - путь для которого будет установлена кука
 */
export const setCookie = (key, value, path = '/') => {
  cookies.set(key, value, { path });
};

/**
 * Удаляет куки
 * @param {string} key - ключ
 * @param {string} path - путь для которого будет удалена кука
 */
export const removeCookie = (key, path = '/') => {
  cookies.remove(key, { path });
};

/**
 * Получает куки по ключу
 * @param {string} key - ключ
 */
export const getCookie = (key) => cookies.get(key);

/**
 * Устанавливает данные для авторизации взависимости от рендера на SSR или клиенте
 * @param {Object} req - объект запроса на сервер. Существует только при SSR.
 * @returns {Object} заголовок авторизации
 */
export const setAuthData = (req) => {
  const token = req ? req.cookies.token : getCookie('token');
  return { Authorization: `Bearer ${token}` };
};

/**
 * Перенаправляет на требуемую страницу при отсутствии прав (403)
 * @param {Object} res - объект ответа от сервера
 * @param {String} url - урл на который нужно перенаправить
 */
export const forbiddenRedirect = (res, url) => {
  if (res) {
    res.writeHead(302, {
      Location: url
    });
    res.end();
  } else {
    Router.push(url);
  }
};

/**
 * Перенаправляет на требуемую страницу
 * @param {String} url - урл на который нужно перенаправить
 */
export const redirect = (url) => {
  Router.push(url);
};
