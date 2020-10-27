const db = require('../db')();
const COLLECTION = "projects";

module.exports = () => {

    const get = async ( slug = "" ) => {
        console.log('   inside projects model');
        if (!slug) {
            const projects = await db.get(COLLECTION);
            return projects;
        }
        
        const projects = await db.get(COLLECTION, { slug }); //db.projects.find( projects => projects.slug );
        return projects;
    }

    const add = async (slug, name, description) => {
        const projectCount = await db.count(COLLECTION);
        const results = await db.add(COLLECTION, {
            id: projectCount + 1,
            slug: slug,
            name: name,
            description: description
        });
        return results.result;
    }

    return {
        get,
        add,
    }
    
};