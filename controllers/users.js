const users = require('../models/users')();

module.exports = () => {
  const getController = async (req, res) => {
    const { usersList, error } = await users.get();
    if (error) {
      console.log('====== ERROR GET::CONTROLLER USERS');
      return res.status(500).json({ error: "Oooops! Users::get is not working" });
    }
    res.json({ users: usersList });
  };

  const getByEmail = async (req, res) => {
    const { usersList, error } = await users.get(req.params.email);
    if (error) {
      console.log('====== ERROR GET::EMAIL::CONTROLLER USERS');
      return res
        .status(500)
        .json({ error: 'Oooops! Users::getByEmail is not working' });
    }
    res.json({ users: usersList });
  };

  const postController = async (req, res) => {
      const name = req.body.name;
      const email = req.body.email;
      const usertype = req.body.usertype;
      const key = req.body.key;
    
    try {
      const result = await users.add(name, email, usertype, key);
      res.json(result);
    } catch (ex) {
      console.log("====== ERROR POSTCONTROLLER USER");
      return res.status(500).json({ error: ex });
    }
  };

  return {
    getController,
    getByEmail,
    postController,
  };
};
