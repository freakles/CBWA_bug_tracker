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
      console.log('========= USERS GET { email } ERROR');
      return { error: ex };
    }
  };

  const add = async (name, email, usertype, key) => {
    let duplicate;
    try {
       duplicate = await db.find(COLLECTION, { email });
    } catch (ex) {
      console.log('========= USERS ADD UNIQUE ERROR');
      return { error: ex };
    }
    if (!duplicate) {
      try {
        if (!name || !email || !usertype || !key) {
          console.log('======== MUST FILL ALL THE FIELDS');
          return null;
        }
      } catch (ex) {
        return { error: ex };
      }

      try {
        const results = await db.add(COLLECTION, {
          name: name,
          email: email,
          usertype: usertype,
          key: key,
        });
        return results.result;
      } catch (ex) {
        console.log('========= USERS ADD ERROR');
        return { error: ex };
      }
    } else {
      return null;
    }
    
  };
    
  const getByKey = async(key) => {
      if(!key) {
            console.log("   01: Missing key");
            return null;
      } else {
        try {
          const users = await db.get(COLLECTION, { key });
          if (users.length !== 2) {
            console.log('   02: Bad key');
            return null;
          }
          return users[0];
        } catch (ex) {
          console.log('========= USERS KEY ERROR');
          return { error: ex };
        }
      }
    };

    return {
        get,
        add,
        getByKey
    }
}