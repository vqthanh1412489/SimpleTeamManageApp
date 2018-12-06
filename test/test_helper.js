require('../db');
const { User } = require ('../models/User');
const { Project } = require ('../models/Project');
beforeEach('Remove all data before each test case', async () => {
    await User.remove({});
    await Project.remove({});
});
