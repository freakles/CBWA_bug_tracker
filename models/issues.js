const db = require('../db')();
const COLLECTION = 'issues';
const ObjectID = require('mongodb').ObjectID;

module.exports = () => {
  const get = async (issueNumber = null) => {
    console.log('   inside issues model');
    if (!issueNumber) {
      try {
        const issues = await db.get(COLLECTION);
        console.log(issues);
        return { issuesList: issues };
      } catch (ex) {
        console.log('========= ISSUES GET ERROR');
        return { error: ex };
      }
    }

    try {
      const issues = await db.get(COLLECTION, { issueNumber });
      return { issuesList: issues };
    } catch (ex) {
      console.log('========= ISSUES GET { issueNumber } ERROR');
      return { error: ex };
    }
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

    try {
      const issueBySlug = await db.aggregate('projects', PIPELINE);
      return issueBySlug;
    } catch (ex) {
      console.log('========= ISSUES AGGREGATE W/PROJECTS ERROR');
      return { error: ex };
    }
    
  };

  //not done yet
  /*  const add = async (slug, title, description, status) => {
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
  };*/

  const add = async (slug, title, description, status, project_id) => {
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

    const issueCount = await db.count('projects', PIPELINE);

    try {
      const results = await db.add(
        COLLECTION,
        {
          issueNumber: `${slug}-${issueCount - 2}`,
          title: title,
          description: description,
          status: status,
          project_id: new ObjectID(project_id),
          comment: [],
        },
        {
          $match: { project_id },
        }
      );
      return results.result;

    } catch (ex) {
      console.log('========= ISSUES ADD ERROR');
      return { error: ex };
    }
  };

  const updateStatus = async (issueNumber, status) => {
    const PIPELINE = [
      { issueNumber: issueNumber },
      { $set: { status: status } },
    ];
    try {
      const results = await db.update(COLLECTION, PIPELINE);
      return results.result;
    } catch (ex) {
      console.log('========= ISSUES STATUS ERROR');
      return { error: ex };
    }
  };

  return {
    get,
    getBySlug,
    add,
    updateStatus,
  };
};
