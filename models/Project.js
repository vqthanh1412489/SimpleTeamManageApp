const mongooes = require('mongoose');

const Schema = mongooes.Schema;

const ProjectSchema = new Schema({
    name: { type: String, unique: true, required: true, trim: true },
    des: { type: String, required: true, trim: true },
    users: [{ type: Schema.Types.ObjectId, ref: 'user' }],
});

const ProjectMongo = mongooes.model('project', ProjectSchema);

class Project extends ProjectMongo {

};

module.exports = { Project };

