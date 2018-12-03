const mongooes = require('mongoose');

const uri = 'mongodb://vqthanh1412489:sinhvien1T@ds123834.mlab.com:23834/testpv3009';

mongooes.connect(uri, { useNewUrlParser: true })
.then(() => console.log('Connect Success'))
.catch(err => console.log(err));