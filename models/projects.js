const db = require('../db')();
const COLLECTION = "projects";

module.exports = () => {

    const get = async (slug = null) => {
        console.log('   inside projects model');
        if (!slug) {
            try {
                const projects = await db.get(COLLECTION);
                console.log(projects)
                return { projectsList: projects };
            } catch (ex) {
                console.log("========= PROJECTS GET ERROR")
                return { error: ex };
            }
        }
        
        try {
            const projects = await db.get(COLLECTION, { slug });
            return { projectsList: projects };
        } catch (ex) {
            return { error: ex };
        }
    };

    const add = async (slug, name, description) => {
        const results = await db.add(COLLECTION, {
            slug: slug,
            name: name,
            description: description
        });
        return results.result;
    };

    
    return {
        get,
        add,
        
    }
    
};