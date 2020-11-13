const issues = require('../models/issues')();

module.exports = () => {
  const getController = async (req, res) => {
    const { issuesList, error } = await issues.get();
    if (error) {
      console.log('====== ERROR GET::CONTROLLER ISSUES');
      return res
        .status(500)
        .json({ error: 'Oooops! Issues::get is not working' });
    }
    res.json({ issues: issuesList });
  };

  const getByID = async (req, res) => {
    const { issuesList, error } = await issues.get(req.params.issueNumber);
    if (error) {
      console.log('====== ERROR GET::ID::CONTROLLER ISSUES');
      return res
        .status(500)
        .json({ error: 'Oooops! Issues::getByID is not working' });
    }
    res.json({ issues: issuesList });
  };

  //AGGREGATE WITH PROJECTS
  const getBySlug = async (req, res) => {
    const { issuesList, error } = await issues.getBySlug(req.params.slug);
    if (error) {
      console.log('====== ERROR GET::SLUG::CONTROLLER ISSUES');
      return res
        .status(500)
        .json({ error: 'Oooops! Issues::getBySLug is not working' });
    }
    res.json({ issues: issuesList });
  };

  const postController = async (req, res) => {
    let slugName = req.params.slugName;
    let title = req.body.title;
    let description = req.body.description;
    let status = req.body.status;
    let project_id = req.body.project_id;
    
    try {
      let result = await issues.add(
        slugName,
        title,
        description,
        status,
        project_id
      );
      res.json(result);
    } catch (ex) {
      console.log('====== ERROR POSTCONTROLLER ISSUES');
      return { error: ex };
    }
    
  };

  const updateStatus = async (req, res) => {
    let { issueNumber, status } = req.params;

    try {
      const result = await issues.updateStatus(issueNumber, status);
      res.json(result);
    } catch (ex) {
      console.log('====== ERROR STATUS::CONTROLLER ISSUES');
      return { error: ex };
    }
    
  }

  return {
    getController,
    getByID,
    getBySlug,
    postController,
    updateStatus,
  };
};
