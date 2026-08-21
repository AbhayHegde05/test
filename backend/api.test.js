const request = require('supertest');
const app = require('./server');
const mongoose = require('mongoose');
const User = require('./models/User');

describe('Registration API', () => {
  beforeAll(async () => {
    await User.deleteMany({});
  });

  afterAll(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  it('should register a user and return 201', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: `test${Date.now()}@example.com`,
        password: 'password123'
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe("Registration successful");
  });
});