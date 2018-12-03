const express = require('express');

const { userRouter } = require('./controllers/user.router');
const { projectRouter } = require('./controllers/project.router');

const app = express();

require('./db');

app.use('/user', userRouter);
app.use('/project', projectRouter);

module.exports = { app };