import { Cookies } from 'react-cookie';
import Router from 'next/router';

const cookies = new Cookies();

export default class Utils {
  /**
   * Устанавливает в куки токен полученный от сервера
   * @param {string} token
   */
  static setCookieToken(token) {
    cookies.set('token', token);
  }

  /**
   * Удаляет куки при разлогировании
   */
  static removeCookieToken() {
    cookies.remove('token', { path: '/' });
  }

  /**
   * Устанавливает в куки id пользователя полученный от сервера
   * @param {string} id
   */
  static setCookieUserID(id) {
    cookies.set('id', id);
  }

  /**
   * Получает куки по ключу
   * @param {string} key
   */
  static getCookie(key) {
    cookies.get(key);
  }

  /**
   * Устанавливает данные для авторизации взависимости от рендера на SSR или клиенте
   * @param {Object} req - объект запроса на сервер. Существует только при SSR.
   * @returns {Object} заголовок авторизации
   */
  static setAuthData(req) {
    const token = req ? req.cookies.token : this.getCookie('token');
    return { Authorization: `Bearer ${token}` };
  }

  /**
   * Перенаправляет на требуемую страницу при отсутствии прав (403)
   * @param {Object} res - объект ответа от сервера
   * @param {String} url - урл на который нужно перенаправить
   */
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

  /**
   * Перенаправляет на требуемую страницу
   * @param {String} url - урл на который нужно перенаправить
   */
  static redirect(url) {
    Router.push(url);
  }
}
