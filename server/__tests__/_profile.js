import request from 'supertest';
import randomstring from 'randomstring';
import app from '../src/app';
import { dbConnection, mockUser } from './index';

describe('Профиль', () => {
  dbConnection();

  it('C корректным токеном получаем 200 и user и profile', async () => {
    const result = await request(app)
      .post('/pages/profile')
      .set('Authorization', `Bearer ${mockUser.token}`)
      .send({ id: mockUser.id });

    const { user, profile } = result.body;

    expect(result.statusCode).toEqual(200);
    expect(user).toBeTruthy();
    expect(user).toHaveProperty('id');
    expect(profile).toBeTruthy();
    expect(profile).toHaveProperty('name');
    expect(profile).toHaveProperty('createDate');
  });

  it('C отсутствующим id получаем 403 и сообщение об ошибке', async () => {
    const result = await request(app)
      .post('/pages/profile')
      .set('Authorization', `Bearer ${mockUser.token}`);

    const { error } = JSON.parse(result.error.text);

    expect(result.statusCode).toEqual(403);
    expect(error).toHaveProperty('message');
    expect(error).toHaveProperty('stack');
  });

  it('C неверным токеном получаем 403 и сообщение об ошибке', async () => {
    const result = await request(app)
      .post('/pages/profile')
      .set('Authorization', `Bearer ${randomstring.generate()}`)
      .send({ id: mockUser.id });

    const { error } = JSON.parse(result.error.text);

    expect(result.statusCode).toEqual(403);
    expect(error).toHaveProperty('message');
    expect(error).toHaveProperty('stack');
  });

  it('C правильном токеном, но с неверным id получаем 403 и сообщение об ошибке', async () => {
    const result = await request(app)
      .post('/pages/profile')
      .set('Authorization', `Bearer ${mockUser.token}`)
      .send({ id: randomstring.generate() });

    const { error } = JSON.parse(result.error.text);

    expect(result.statusCode).toEqual(403);
    expect(error).toHaveProperty('message');
    expect(error).toHaveProperty('stack');
  });
});
