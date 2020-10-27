const db = require('../db')();
const COLLECTION = 'issues';

module.exports = () => {
  const get = async () => {
    console.log('   inside issues model');
    const issues = await db.get(COLLECTION);
    return issues;
  };

  const add = async (title, description) => {
    const issueCount = await db.count(COLLECTION);
    const results = await db.add(COLLECTION, {
      id: issueCount + 1,
      title: title,
      description: description,
    });
    return results.result;
  };

  return {
    get,
    add,
  };
};
