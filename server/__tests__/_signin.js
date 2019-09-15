import request from 'supertest';
import randomstring from 'randomstring';
import app from '../src/app';
import { dbConnection, mockUser } from './index';

describe('Авторизация', () => {
  dbConnection();

  it('При успехе получаем 200, id и токены пользователя', async () => {
    const result = await request(app)
      .post('/api/signin')
      .field('login', mockUser.login)
      .field('password', mockUser.password);

    const { user } = result.body;

    expect(result.statusCode).toEqual(200);
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('access_token');
    expect(user).toHaveProperty('refresh_token');
  });

  it('При несуществующем login получаем 403, и сообщение об ошибке', async () => {
    const result = await request(app)
      .post('/api/signin')
      .field('login', randomstring.generate())
      .field('password', randomstring.generate());

    const { error } = JSON.parse(result.error.text);

    expect(result.statusCode).toEqual(403);
    expect(error).toHaveProperty('message');
    expect(error).toHaveProperty('stack');
  });

  it('При неверном пароле получаем 403, и сообщение об ошибке', async () => {
    const result = await request(app)
      .post('/api/signin')
      .field('login', mockUser.login)
      .field('password', randomstring.generate());

    const { error } = JSON.parse(result.error.text);

    expect(result.statusCode).toEqual(403);
    expect(error).toHaveProperty('message');
    expect(error).toHaveProperty('stack');
  });

  it('С некорректными данными получаем 403, и сообщение об ошибке', async () => {
    const result = await request(app)
      .post('/api/signin')
      .field('login', mockUser.login)
      .field('password', []);

    const { error } = JSON.parse(result.error.text);

    expect(result.statusCode).toEqual(403);
    expect(error).toHaveProperty('message');
    expect(error).toHaveProperty('stack');
  });
});
