const assert = require('assert');
const request = require('supertest');
const { app } = require('../../../app');
const { Project } = require ('../../../models/Project');
const { User } = require ('../../../models/User');
const { ProjectServie } = require ('../../../services/ProjectService');
const { UserServie } = require ('../../../services/UserService');

describe('Test POST project/addUserToProject', () => {
    let idUser;
    let idProject;
    beforeEach('Add new user,new Project for test', async() => {
        const user =  await UserServie.signUp('thanh489@gmail.com', '123', 'Thanh');
        const project = await ProjectServie.add('Pro1', 'Dessssssssssssss1');
        idUser = user._id;
        idProject = project._id;
    });
    it('Can add member to project', async () => {
        const body = { idUser, idProject };
        await request(app).put('/project/addUserToProject').send(body);
        const project = await Project.findOne({ name: 'Pro1' });
        assert.equal(project.users.length, 1);
    });
});