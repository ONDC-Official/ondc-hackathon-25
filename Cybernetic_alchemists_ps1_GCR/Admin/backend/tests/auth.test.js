const request = require('supertest');
const app = require('../server'); // Assuming server.js exports the Express app
const User = require('../models/User');

describe('Authentication Routes', () => {
    beforeAll(async () => {
        await User.deleteMany(); // Clear the user collection before tests
    });

    it('should register a new user and return a JWT', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                username: 'testuser',
                email: 'test@example.com',
                password: 'password123',
                role: 'user'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    });

    it('should log in an existing user and return a JWT', async () => {
        await request(app)
            .post('/api/auth/register')
            .send({
                username: 'testuser',
                email: 'test@example.com',
                password: 'password123',
                role: 'user'
            });

        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'test@example.com',
                password: 'password123'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    });

    it('should access a protected route with a valid token', async () => {
        const registerRes = await request(app)
            .post('/api/auth/register')
            .send({
                username: 'testuser',
                email: 'test@example.com',
                password: 'password123',
                role: 'user'
            });

        const token = registerRes.body.token;

        const res = await request(app)
            .get('/api/auth/me')
            .set('x-auth-token', token);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('username', 'testuser');
    });
});
