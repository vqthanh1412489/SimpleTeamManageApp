const mongooes = require('mongoose');

const uri = 'mongodb://localhost/test';

mongooes.connect(uri, { useNewUrlParser: true })
.then(() => console.log('Connect Success'))
.catch(err => console.log(err));