import passport from 'passport';
import passportLocal from 'passport-local';
import jwt from 'jsonwebtoken';

const LocalStrategy = passportLocal.Strategy;

const initLocal = (): void => {
  passport.use(new LocalStrategy({
    usernameField: 'name',
    passwordField: 'password',
    session: false
  }, (username, password, done): void => {
    // тут проверка на наличие данного пользователя в БД
    const user = {
      username,
      password
    };

    return done(null, user);
  }));
};

export default initLocal;
