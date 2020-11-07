const issues = require('../models/issues')();

module.exports = () => {
  const getController = async (req, res) => {
    const { issuesList, error } = await issues.get();
    if (error) {
      return res.status(500).json({ error });
    }
    res.json({ issues: issuesList });
  };

  const getByID = async (req, res) => {
    res.json(await issues.get(req.params.issueNumber));
  };

  //AGGREGATE WITH PROJECTS
  const getBySlug = async (req, res) => {
    res.json(await issues.getBySlug(req.params.slug));
 }

  const postController = async (req, res) => {
    let slugName = req.params.slugName;
    let title = req.body.title;
    let description = req.body.description;
    let status = req.body.status;
    let project_id = req.body.project_id;
    
    let result = await issues.add(slugName, title, description, status, project_id);
    
    res.json(result);
  };

  const updateStatus = async (req, res) => {
    let { issueNumber, status } = req.params;

    const result = await issues.updateStatus(issueNumber, status);
    res.json(result);
  }

  return {
    getController,
    getByID,
    getBySlug,
    postController,
    updateStatus,
  };
};
