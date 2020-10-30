const express = require('express');
const bodyParser = require('body-parser');

const hostname = '0.0.0.0';
const port = process.env.PORT || 3000;

const projectsController = require('./controllers/projects')();
const usersController = require('./controllers/users')();
const issuesController = require('./controllers/issues')();

const users = require('./models/users')(); // users security layer

const app = module.exports = express();

app.use((req, res, next) => {
    console.log('[%s] %s -- %s', new Date(), req.method, req. url);
    next();
});

app.use(async (req, res, next) => {
  const FailedAuthMessage = {
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/401
    error: 'Failed Authentication',
    message: 'Go Away!',
    code: 'xxxx', // Some useful error code
  };

  const suppliedKey = req.headers['x-api-key'];
  const clientIp =
    req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  // Check Pre-shared key
  if (!suppliedKey) {
    console.log(
      '   [%s] FAILED AUTHENTICATION -- %s, No Key Supplied',
      new Date(),
      clientIp
    );
    FailedAuthMessage.code = '01';
    return res.status(401).json(FailedAuthMessage);
  }

  const user = await users.getByKey(suppliedKey);
  if (!user) {
    console.log(
      '   [%s] FAILED AUTHENTICATION -- %s, BAD Key Supplied',
      new Date(),
      clientIp
    );
    FailedAuthMessage.code = '02';
    return res.status(401).json(FailedAuthMessage);
  }

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
//get an user
app.get('/users/:email', usersController.getByEmail);
//add an user
app.post('/users', usersController.postController);

//get all issues with comments
app.get('/issues', issuesController.getController);
//get an issue
app.get('/issues/:issueNumber', issuesController.getByID); 
//get all issues for a project
app.get('/projects/:slug/issues', issuesController.getBySlug); //AGGREGATE WITH PROJECTS
//add an issue
app.post('/projects/:slugName/issues', issuesController.postController);
//update status
app.put('/projects/issues/:issueNumber/:status', issuesController.updateStatus);



app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
});

app.use((req, res) => {
    res.status(404).json({
        error: 404,
        message: 'Route not found',
    });
});