const users = require('../models/users')();

module.exports = () => {
  const getController = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.json(users.get());
  };

  const getByEmail = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.json(users.get(req.params.email));
  };

  const postController = (req, res) => {
      const name = req.body.name;
      const email = req.body.email;
      const usertype = req.body.usertype;
      const key = req.body.key;

    users.add(name, email, usertype, key);
    return res.end(`POST: ${(name, email, usertype, key)}`);
  };

  return {
    getController,
    postController,
    getByEmail,
  };
};
