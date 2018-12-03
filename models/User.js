const mongooes = require('mongoose');

const Schema = mongooes.Schema;

const UserSchema = new Schema({
    email: { type: String, unique: true, required: true, trim: true },
    password: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    projects: [{ type: Schema.Types.ObjectId, ref: 'project' }],
});

const User = mongooes.model('user', UserSchema);

module.exports = { User };  

