const assert = require('assert');
const request = require('supertest');
const { app } = require('../../../app');
const { User } = require ('../../../models/User');
const { UserServie } = require ('../../../services/UserService');

describe('Test POST /signup', () => {
    xit('Can sign up with full info', async () => {
        const body = { email: 'vqthanhhh1@gmail.com', password: '123', name: 'Thanh 1' };
        await request(app).post('/user/signup').send(body);
        const user = await User.findOne({ email: 'vqthanhhh1@gmail.com' });
        assert.equal(user.name, 'Thanh 1');
    });

    xit('Cannot sign up with dup email', async () => {
        await UserServie.signUp('thanh489@gmail.com', '123', 'Thanh');
        const body = { email: 'thanh489@gmail.com', password: '123sfsf', name: 'Thanhsafsf' };
        const res = await request(app).post('/user/signup').send(body);
        assert.equal(res.body.success, false);
        assert.equal(res.status, 404);
    });
});