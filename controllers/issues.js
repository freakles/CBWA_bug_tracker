const issues = require('../models/issues')();

module.exports = () => {
  const getController = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.json(issues.get());
  };

  const getByID = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.json(issues.get(req.params.id));
  };

  const postController = (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    issues.add(title, description);
    return res.end(`POST: ${(title, description)}`);
  };

  return {
    getController,
    postController,
    getByID,
  };
};
