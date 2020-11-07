const db = require("../db")();
const COLLECTION = "users";

module.exports = () => {
  const get = async ( email = null ) => {
    console.log('   inside users model');
    if (!email) {
      try {
        const users = await db.get(COLLECTION);
        console.log(users);
        return { usersList: users };
      } catch (ex) {
        console.log('========= USERS GET ERROR');
        return { error: ex };
      }
    }
    
    try {
      const users = await db.get(COLLECTION, { email });
      return { usersList: users };
    } catch (ex) {
      return { error: ex };
    }
  };

  const add = async (name, email, usertype, key) => {
    const results = await db.add(COLLECTION, {
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
        if (users.length !== 2) {
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