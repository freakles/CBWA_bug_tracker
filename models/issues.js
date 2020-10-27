const db = require('../db')();
const COLLECTION = 'issues';

module.exports = () => {
  const get = () => {
    console.log('   inside issues model');
    return db.issues;
  };

  const add = (title, description) => {
    return db.issues.push({
      title: title,
      description: description,
    });
  };

  return {
    get,
    add,
  };
};
