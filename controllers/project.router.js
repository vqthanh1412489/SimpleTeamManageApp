const { json } =  require('body-parser');
const { Router } = require('express');
const { ProjectServie } = require('../services/ProjectService');

const projectRouter = Router();
projectRouter.use(json());

projectRouter.post('/', (req, res) => {
    const { name, des } = req.body;
    ProjectServie.add(name, des)
    .then(project => res.send({ success: true, project }))
    .catch(err => res.send({ success: false, err }));
});

// projectRouter.delete('/:idProject', (req, res) => {
//     const { idProject } = req.params;
//     ProjectServie.delete(idProject)
//     .then(project => res.send({ success: true, project }))
//     .catch(err => res.send({ success: false, err }));
// });

// projectRouter.put('/updateName/:idProject', (req, res) => {
//     const { idProject } = req.params;
//     const { name } = req.body;
//     ProjectServie.updateName(idProject, name)
//     .then(project => res.send({ success: true, project }))
//     .catch(err => res.send({ success: false, err }));
// });

// projectRouter.put('/updateDes/:idProject', (req, res) => {
//     const { idProject } = req.params;
//     const { des } = req.body;
//     ProjectServie.updateDes(idProject, des)
//     .then(project => res.send({ success: true, project }))
//     .catch(err => res.send({ success: false, err }));
// });

projectRouter.put('/addUserToProject', (req, res) => {
    const { idProject, idUser } = req.body;
    ProjectServie.addUserToProject(idProject, idUser)
    .then(data => res.send({ success: true, data }))
    .catch(err => res.send({ success: false, err }));
});
projectRouter.put('/deleteUserFromProject', (req, res) => {
    const { idProject, idUser } = req.body;
    ProjectServie.deleteUserFromProject(idProject, idUser)
    .then(data => res.send({ success: true, data }))
    .catch(err => res.send({ success: false, err }));
});
projectRouter.get('/:idProject', (req, res) => {
    const { idProject } = req.params;
    ProjectServie.showProjectDetail(idProject)
    .then(project => res.send({ success: true, project }))
    .catch(err => res.send({ success: false, err }));
});
projectRouter.get('/', (req, res) => {
    ProjectServie.getAllProjects()
    .then(projects => res.send({ success: true, projects }))
    .catch(err => res.send({ success: false, err }));
});

module.exports = { projectRouter };