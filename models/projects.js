const db = require('../db')();

module.exports = () => {

    const get = ( slug ) => {
        console.log('   inside projects model');
        if(!slug) {
            return db.projects;
        }
        return db.projects.find( projects => projects.slug );
    }

    const add = (slug, name, description) => {
        return db.projects.push({
            slug: slug,
            name: name,
            description: description
        });
    }

    return {
        get,
        add,
    }
    
};