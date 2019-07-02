import { createConnection } from 'typeorm';
import request from 'supertest';
import randomstring from 'randomstring';
import app from '../src/app';

const config = require('../../server.config.json');

describe('Регистрация, авторизация, аутентификация', () => {
  let connection = '';
  const mockUser = {
    name: 'test',
    password: 'test',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJwYXNzd29yZCI6IiQyYiQxMCRXQlBVaHRYLm1VUnFvRkpZdXFGdi9lWkxsUW1aN1NheHI0RHBXVGhMVmxKdzBQdldLUnhvZSIsImlhdCI6MTU2MjA0MjIyMH0.kEh5KxrIIgGUs0DgBgjzJRXrPm4yc0Pzyl_ROVMU2Cc'
  };

  beforeAll(async () => {
    connection = await createConnection(config.database);
  });

  afterAll(async () => {
    connection.close();
  });

  it('При регистрации нового пользователя получаем 200, его id и новый токен', async () => {
    const result = await request(app)
      .post('/api/signup')
      .field('name', randomstring.generate())
      .field('password', randomstring.generate());

    expect(result.statusCode).toEqual(200);
    expect(result.body.id).toBeTruthy();
    expect(result.body.token).toBeTruthy();
  });

  it('При регистрации нового пользователя c неверными данными получаем 500 и сообщение об ошибке', async () => {
    const result = await request(app)
      .post('/api/signup')
      .field('name', randomstring.generate())
      .field('password', []);
    const { error } = JSON.parse(result.error.text);

    expect(result.statusCode).toEqual(500);
    expect(error.message).toBeTruthy();
    expect(error.stack).toBeTruthy();
  });

  it('При успешной авторизации получаем 200, id и токен пользователя', async () => {
    const result = await request(app)
      .post('/api/signin')
      .field('name', mockUser.name)
      .field('password', mockUser.password);

    expect(result.statusCode).toEqual(200);
    expect(result.body.id).toBeTruthy();
    expect(result.body.token).toBeTruthy();
  });

  it('При несуществующем name во время авторизации получаем 403, и сообщение об ошибке', async () => {
    const result = await request(app)
      .post('/api/signin')
      .field('name', randomstring.generate())
      .field('password', randomstring.generate());

    const { error } = JSON.parse(result.error.text);

    expect(result.statusCode).toEqual(403);
    expect(error.message).toBeTruthy();
    expect(error.stack).toBeTruthy();
  });

  it('При неверном пароле во время авторизации получаем 403, и сообщение об ошибке', async () => {
    const result = await request(app)
      .post('/api/signin')
      .field('name', mockUser.name)
      .field('password', randomstring.generate());

    const { error } = JSON.parse(result.error.text);

    expect(result.statusCode).toEqual(403);
    expect(error.message).toBeTruthy();
    expect(error.stack).toBeTruthy();
  });

  it('При некорретных данных во время авторизации получаем 500, и сообщение об ошибке', async () => {
    const result = await request(app)
      .post('/api/signin')
      .field('name', mockUser.name)
      .field('password', []);

    const { error } = JSON.parse(result.error.text);

    expect(result.statusCode).toEqual(500);
    expect(error.message).toBeTruthy();
    expect(error.stack).toBeTruthy();
  });

  // it('При загрузке данных профиля для авторизированного пользователя получаем 200 и data', async () => {
  //   const result = await request(app)
  //     .post('/pages/profile')
  //     .field('name', mockUser.name)
  //     .field('password', []);

  //   const { error } = JSON.parse(result.error.text);

  //   expect(result.statusCode).toEqual(500);
  //   expect(error.message).toBeTruthy();
  //   expect(error.stack).toBeTruthy();
  // });
});
