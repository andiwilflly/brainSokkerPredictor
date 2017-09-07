const path = require('path');
const Express = require('express');
const React = require('react');
import handleRender from '../built/server.js';


const app = Express();
// Serve built files with express static files middleware
console.log('==========3', path.join(__dirname, 'built'));
app.use('/built', Express.static(path.join(__dirname, '../built')));

// Serve normal requests with our handleRender function
app.use('/static', Express.static(path.join(__dirname, '../static')));


app.get('*', handleRender);


app.listen(3000);
console.log('=== Go to http://localhost:3000 ===');
