const assert = require('assert');
const request = require('supertest');
const { app } = require('../../../app');
const { Project } = require ('../../../models/Project');
const { User } = require ('../../../models/User');
const { ProjectServie } = require ('../../../services/ProjectService');
const { UserServie } = require ('../../../services/UserService');

describe('Test POST project/deleteUserFromProject', () => {
    let idUser1;
    let idProject1;
    beforeEach('Add 2 new user, 2 new Project, Add 2 user to Project1 for test', async() => {
        const user1 =  await UserServie.signUp('thanh1@gmail.com', '123', 'Thanh1');
        const project1 = await ProjectServie.add('Pro1', 'Dessssssssssssss1');
        const user2 =  await UserServie.signUp('thanh2@gmail.com', '123', 'Thanh2');
        const project2 = await ProjectServie.add('Pro2', 'Dessssssssssssss2');
        idUser1 = user1._id;
        idProject1 = project1._id;
        idUser2 = user2._id;
        idProject2 = project2._id;

        await ProjectServie.addUserToProject(idProject1, idUser1);
        await ProjectServie.addUserToProject(idProject1, idUser2);
    });
    it('Can deleteUserFromProject user2 to project1', async () => {
        const body = { idUser: idUser2, idProject: idProject1 };
        await request(app).put('/project/deleteUserFromProject').send(body);
        const project = await Project.findOne({ name: 'Pro1' }).populate('users');
        assert.equal(project.users.length, 1);
        assert.equal(project.users[0].name, 'Thanh1');
    });
});