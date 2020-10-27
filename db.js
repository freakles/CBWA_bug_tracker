const uri = process.env.MONGO_URI;
const MongoClient = require('mongodb').MongoClient;
const DB_NAME = 'bug-tracker';
const MONGO_OPTIONS = { useUnifiedTopology: true, useNewUrlParser: true };

module.exports = () => {
  const count = (collectionName) => {
    return new Promise((resolve, reject) => {
      MongoClient.connect(uri, MONGO_OPTIONS, (err, client) => {
        const db = client.db(DB_NAME);
        const collection = db.collection(collectionName);

        collection.countDocuments({}, (err, docs) => {
          resolve(docs);
          client.close();
        });
      });
    });
  };

  const get = (collectionName, query = {}) => {
    return new Promise((resolve, reject) => {
      MongoClient.connect(uri, MONGO_OPTIONS, (err, client) => {
        console.log(err);
        const db = client.db(DB_NAME);
        const collection = db.collection(collectionName);

        collection.find(query).toArray((err, docs) => {
          resolve(docs);
          client.close();
        });
      });
    });
  };

  const add = (collectionName, item) => {
    return new Promise((resolve, reject) => {
      MongoClient.connect(uri, MONGO_OPTIONS, (err, client) => {
        const db = client.db(DB_NAME);
        const collection = db.collection(collectionName);

        collection.insertOne(item, (err, result) => {
          resolve(result);
        });
      });
    });
  };

  const aggregate = (collectionName, pipeline = []) => {
    return new Promise((resolve, reject) => {
      MongoClient.connect(uri, MONGO_OPTIONS, (err, client) => {
        const db = client.db(DB_NAME);
        const collection = db.collection(collectionName);

        collection.aggregate(pipeline).toArray((err, docs) => {
          if (err) {
            console.log(' --- aggregate ERROR --- ');
            console.log(err);
          }
          resolve(docs);
          client.close();
        });
      });
    });
  };

  return {
    count,
    get,
    add,
    aggregate,
  };
};


/*
module.exports = () => {

    const projects = [
        { 
            slug: 'BOOKS',
            name: 'bookstore',
            description: 'a book project' 
        },
        {
            slug: 'BUGS',
            name: 'bugtracker',
            description: 'a bugtracker project'
        },
    ];

    const users = [
        {
            name: 'Jean Paul',
            email: 'jeanpaul@cbwa.com',
            usertype: 'user',
            key: 'new password',
        },
        {
            name: 'Dave',
            email: 'dave@cbwa.com',
            usertype: 'user',
            key: 'new password',
        },
    ];

    const issues = [
        {
            title: 'i1',
            description: 'first issue',
        },
        {
            title: 'i2',
            description: 'second issues',
        }
    ]

    return {
        projects,
        users,
        issues,
    }
}*/