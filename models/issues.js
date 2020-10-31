const db = require('../db')();
const COLLECTION = 'issues';


module.exports = () => {
  const get = async (issueNumber = null) => {
    console.log('   inside issues model');
    if (!issueNumber) {
      const issues = await db.get(COLLECTION);
      return issues;
    }

    const issues = await db.get(COLLECTION, { issueNumber });
    return issues;
  };

  //AGGREGATE WITH PROJECTS
  const getBySlug = async (slug) => {
    const PIPELINE = [
      {
        $lookup: {
          from: 'issues',
          localField: '_id',
          foreignField: 'project_id',
          as: 'issues',
        },
      },
      {
        $match: { slug },
      },
      {
        $project: {
          'issues.project_id': 0,
        },
      },
    ];
    
    const issueBySlug = await db.aggregate('projects', PIPELINE);
    return issueBySlug;
  };

//not done yet
  const add = async (slug, title, description, status) => {
    const project = await db.get('projects', { slug });
    const { project_id, slugName } = project;
    const issueCount = await db.count(COLLECTION);
    const results = await db.add(COLLECTION, {
      issueNumber: `${slugName}-${issueCount + 1}`,
      title: title,
      description: description,
      status: status,
      project_id: project_id,
      comment: [],
    });
    return results.result;
  };

  const updateStatus = async (issueNumber, status) => {
    const PIPELINE = [
      { issueNumber: issueNumber },
      { $set: { status: status } },
    ];
    const results = await db.update(COLLECTION, PIPELINE);
    return results.result;
  };

  return {
    get,
    getBySlug,
    add,
    updateStatus,
  };
};
