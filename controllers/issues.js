const issues = require('../models/issues')();

module.exports = () => {
  const getController = async (req, res) => {
    res.json( await issues.get());
  };

  const getByID = async (req, res) => {
    res.json({ error: "byId not implemented yet"});
  };

  const postController = async (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const result = await issues.add(title, description);
    
    res.json(result);
  };

  return {
    getController,
    postController,
    getByID,
  };
};
