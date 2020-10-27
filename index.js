const express = require('express');
const bodyParser = require('body-parser');

const hostname = '0.0.0.0';
const port = process.env.PORT || 3000;

const projectsController = require('./controllers/projects')();
const usersController = require('./controllers/users')();
/*
let issues = ['i1', 'i2', 'i3'];
*/
const app = module.exports = express();

app.use((req, res, next) => {
    console.log('[%s] %s -- %s', new Date(), req.method, req. url);
    next();
});

app.use(bodyParser.json());

//get all projects
app.get('/projects', projectsController.getController);
//get a project
app.get('/projects/:slug', projectsController.getBySlug);
//add a project
app.post('/projects', projectsController.postController);

//get all users
app.get('/users', usersController.getController);
//get a project
app.get('/users/:email', usersController.getByEmail);
//add a project
app.post('/users', usersController.postController);


app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
});

app.use((req, res) => {
    res.status(404).json({
        error: 404,
        message: 'Route not found',
    });
});