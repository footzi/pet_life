import request from 'supertest';
import randomstring from 'randomstring';
import app from '../src/app';
import { dbConnection, mockUser } from './index';

describe('Регистрация', () => {
  dbConnection();

  it('При успехе получаем 200, id пользователя и новый токен', async () => {
    const result = await request(app)
      .post('/api/signup')
      .field('name', randomstring.generate())
      .field('password', randomstring.generate());

    const { user } = result.body;

    expect(result.statusCode).toEqual(200);
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('token');
  });

  it('С cуществующим name получаем 500, и сообщение об ошибке', async () => {
    const result = await request(app)
      .post('/api/signup')
      .field('name', mockUser.name)
      .field('password', mockUser.password);
    const { error } = JSON.parse(result.error.text);

    expect(result.statusCode).toEqual(500);
    expect(error).toHaveProperty('message');
    expect(error).toHaveProperty('stack');
  });
});
