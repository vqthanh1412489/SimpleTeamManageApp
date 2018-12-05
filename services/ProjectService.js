const { Project } = require('../models/Project');
const { User } = require('../models/User');
var _ = require('lodash');

class ProjectServie {
    static async add(name, des){
        const project = new Project({ name, des });
        await project.save();
        return project;
    }

    // static async delete(idProject){
    //     const project = await Project.findByIdAndRemove(idProject);
    //     if (!project) throw new Error('Project not found');
    //     return project;
    // }
    // static async updateName(idProject, name){
    //     const project = await Project.findByIdAndUpdate(idProject, { name }, { new: true });
    //     if (!project) throw new Error('Project not found');
    //     return project;
    // }
    // static async updateDes(idProject, des){
    //     const project = await Project.findByIdAndUpdate(idProject, { des }, { new: true });
    //     if (!project) throw new Error('Project not found');
    //     return project;
    // }
    static async addUserToProject(idProject, idUser){
        const newProject = await Project.findByIdAndUpdate(idProject, {
            $addToSet: {
                users: idUser
            }
        }, { new: true });
        if (!newProject) throw new Error('idProject not found');
        
        const newUser = await User.findByIdAndUpdate(idUser, {
            $addToSet: {
                projects: idProject
            }
        }, { new: true });
        
        if (!newUser) throw new Error('idUser not found');
        const user = await User.findById(idUser);
        const inforUser = user.toObject();
        delete inforUser.password;
        return  inforUser;
    }
    static async deleteUserFromProject(idProject, idUser){
        const newProject = await Project.findByIdAndUpdate(idProject, {
            $pull: {
                users: idUser
            }
        }, { new: true });
        if (!newProject) throw new Error('idProject not found');
        
        const newUser = await User.findByIdAndUpdate(idUser, {
            $pull: {
                projects: idProject
            }
        }, { new: true });
        
        if (!newUser) throw new Error('idUser not found');

        const user = await User.findById(idUser);
        const inforUser = user.toObject();
        delete inforUser.password;

        return inforUser;
    }

    static async showProjectDetail(idProject){
        const project = await Project.findById(idProject);
        if (!project) throw new Error('idProject not found');
        return project;
    }
    static async getAllProjects(){
        return await Project.find({});
    }
    static async getIdNameUsers(idProject){
        const project = await Project.findById(idProject).populate('users');
        if (!project) throw new Error('idProject not found');
        const arrUsers = [];
        project.users.forEach(element => {
            arrUsers.push({ _id: element._id, name: element.name });
        });
        return arrUsers;
    }
    static async getUserNotProject(idProject){
        const project = await Project.findById(idProject).populate('users');
        if (!project) throw new Error('idProject not found');
        const arrUsersOfProject = [];
        project.users.forEach(element => {
            arrUsersOfProject.push({_id: element._id.toString(), name: element.name.toString()});
        });
        const arr = [];
        const users = await User.find({});
        const arr1 = [];
        users.forEach(element => {
            arr1.push({_id: element._id.toString(), name: element.name.toString()});
        });
        
        return _.differenceBy(arr1, arrUsersOfProject, '_id')
    }
}

module.exports = { ProjectServie };

