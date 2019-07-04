import { createConnection } from 'typeorm';

const config = require('../../server.config.json');

export const mockUser = {
  id: 541,
  name: 'test',
  password: 'test',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJwYXNzd29yZCI6IiQyYiQxMCRXQlBVaHRYLm1VUnFvRkpZdXFGdi9lWkxsUW1aN1NheHI0RHBXVGhMVmxKdzBQdldLUnhvZSIsImlhdCI6MTU2MjA0MjIyMH0.kEh5KxrIIgGUs0DgBgjzJRXrPm4yc0Pzyl_ROVMU2Cc'
};

export const dbConnection = () => {
  let connection = '';

  beforeAll(async () => {
    connection = await createConnection(config.database);
  });

  afterAll(async () => {
    connection.close();
  });
};