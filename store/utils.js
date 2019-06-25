import { Cookies } from 'react-cookie';
import Router from 'next/router';

const cookies = new Cookies();

export default class Utils {
  /**
   * Устанавливает токен полученный от сервера в куки
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
   * Устанавливает токен авторизации взависимости от рендера на SSR или клиенте
   * @param {Object} req - объект запроса на сервер. Существует только при SSR.
   * @returns {Object} заголовок авторизации
   */
  static setAuthToken(req) {
    const token = req ? req.cookies.token : cookies.get('token');
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
