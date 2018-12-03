const express = require('express');
var cors = require('cors');

const { userRouter } = require('./controllers/user.router');
const { projectRouter } = require('./controllers/project.router');

const app = express();

require('./db');

app.use('/user', userRouter);
app.use('/project', projectRouter);
app.use(cors());

module.exports = { app };