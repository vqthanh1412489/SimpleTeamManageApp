const { json } =  require('body-parser');
const { Router } = require('express');
const { UserServie } = require('../services/UserService');

const userRouter = Router();
userRouter.use(json());

userRouter.post('/signUp', (req, res) => {
    const { email, password, name } = req.body;
    UserServie.signUp(email, password, name)
    .then(user => res.status(200).send({ success: true, user }))
    .catch(err => res.status(404).send({ success: false, err }));
});

userRouter.post('/signIn', (req, res) => {
    const { email, password } = req.body;
    UserServie.signIn(email, password)
    .then(user => res.status(200).send({ success: true, user }))
    .catch(err => res.status(404).send({ success: false, err }));
});

module.exports = { userRouter };