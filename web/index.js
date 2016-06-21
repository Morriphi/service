const http = require('http');
const app = require('./src/server/app');

app.listen(process.env['PORT'], function(){
  console.log(`web running on port ${process.env['PORT']}`);
});
