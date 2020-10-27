const db = require("../db")();
const COLLECTION = "users";

module.exports = () => {
  const get = async () => {
    console.log('   inside users model');
    const users = await db.get(COLLECTION);
    return users;
  };

  const add = async (name, email, usertype, key) => {
    const userCount = await db.count(COLLECTION);
    const results = await db.add(COLLECTION, {
      id: userCount + 1,
      name: name,
      email: email,
      usertype: usertype,
      key: key,
    });
    return results.result;
  };
    
  const getByKey = async(key) => {
      if(!key) {
            console.log("   01: Missing key");
            return null;
        }

        const users = await db.get(COLLECTION, { key });
        if (users.length !== 1) {
            console.log("   02: Bad key");
            return null;
        }
        return users[0];
    };

    return {
        get,
        add,
        getByKey
    }
}