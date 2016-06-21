const http = require('http');
const app = require('./app');
app.listen(process.env['PORT'], function(){
	console.log(`api running on port ${process.env['PORT']}`);
});
