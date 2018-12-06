const assert = require('assert');
const request = require('supertest');
const { app } = require('../../../app');
const { Project } = require ('../../../models/Project');
const { ProjectServie } = require ('../../../services/ProjectService');

describe('Test POST /', () => {
    xit('Can add new Project with full info', async () => {
        const body = { name: 'project1', des: 'Prooooooooooo 11' };
        await request(app).post('/project').send(body);
        const project = await Project.findOne({ name: 'project1' });
        assert.equal(project.name, 'project1');
    });

    xit('Cannot add Project with dup name', async () => {
        await ProjectServie.add('pro11111', 'Dessssssssssssss 1');
        const body = { name: 'pro11111', des: 'Dessssssssssssss 1'};
        const res = await request(app).post('/project').send(body);
        assert.equal(res.body.success, false);
        assert.equal(res.status, 404);
    });
});