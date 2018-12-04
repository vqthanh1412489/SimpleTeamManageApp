const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const uri = 'mongodb://vqthanh1412489:sinhvien1T@ds123834.mlab.com:23834/testpv3009';

function getDatabaseUri() {
    if (process.env.NODE_ENV === 'test') return 'mongodb://localhost/projectpv-test';
    if (process.env.NODE_ENV === 'production') return uri;
    return 'mongodb://localhost/projectpv';
}


mongoose.connect(getDatabaseUri(), { useNewUrlParser: true })
.then(() => console.log('Connect Success'))
.catch(err => console.log(err));