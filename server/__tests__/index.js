import { createConnection } from 'typeorm';

const config = require('../../server.config.json');

export const mockUser = {
  id: 61,
  name: 'test',
  password: 'test',
  surname: 'test',
  access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjEsImlhdCI6MTU2ODU2MDgwMiwiZXhwIjoxNTY4NTYwODAyfQ.LCEa-zB5QifXZ3VVCFDS97X0ls0-zKkB6WytqwIM5w0",
  refresh_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjEsImtleSI6InU4bEZZNkxiTFFGMDJBT1ZtZ2ZQckEyNDk5TWRxRE1HIiwiaWF0IjoxNTY4NTYwODAyLCJleHAiOjE1NzExNTI4MDJ9.lD7dPKIXS4JLwGwkwUWmGSyUev3HSR7_D9SsX_MPyns"
};

const signInMockUser = async () => {
  const result = await request(app)
    .post('/api/signup')
    .field('login', 'test')
    .field('surname', 'test')
    .field('password', 'test');

  const { user } = result.body;

  
  console.log(user)
};

export const dbConnection = () => {
  let connection = '';

  beforeAll(async () => {
    connection = await createConnection(config.database);
    return signInMockUser();
  });

  afterAll(async () => {
    connection.close();
  });
};

