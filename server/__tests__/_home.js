import request from 'supertest';
import randomstring from 'randomstring';
import app from '../src/app';
import { dbConnection, mockUser } from './index';

describe('Главная страница', () => {
  dbConnection();

  it('Без авторизации получаем пустой user и 200', async () => {
    const result = await request(app)
      .get('/pages/home');

    const { user } = result.body;

    expect(result.statusCode).toEqual(200);
    expect(user).toBeNull();
  });

  it('При успешной авторизации получаем user c id и 200', async () => {
    const result = await request(app)
      .get('/pages/home')
      .set('Authorization', `Bearer ${mockUser.token}`);

    const { user } = result.body;

    expect(result.statusCode).toEqual(200);
    expect(user).toHaveProperty('id');
  });

  it('При авторизации с неверным токеном получаем пустой user и 200', async () => {
    const result = await request(app)
      .get('/pages/home')
      .set('Authorization', `Bearer ${randomstring.generate()}`);

    const { user } = result.body;

    expect(result.statusCode).toEqual(200);
    expect(user).toBeNull();
  });
});
