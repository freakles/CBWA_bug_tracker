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
            console.log('========= PROJECTS GET { slug } ERROR');
            return { error: ex };
        }
    };

    const add = async (slug, name, description) => {
        let duplicate;
        try {
            duplicate = await db.find(COLLECTION, { slug }); 
        } catch (ex) {
            console.log('========= PROJECTS ADD UNIQUE ERROR');
            return { error: ex };
        }
        if (!duplicate) {
            try {
                if (!slug || !name || !description){
                    console.log('======== MUST FILL ALL THE FIELDS');
                    return null;
                }
            } catch (ex) {
                return {error: ex}
            }
            
            try {
                const results = await db.add(COLLECTION, {
                  slug: slug,
                  name: name,
                  description: description,
                });
                return results.result;
            } catch (ex) {
                console.log('========= PROJECTS ADD ERROR');
                return { error: ex };
            }
        } else {
            return null;
        }
        
    };

    
    return {
        get,
        add,
        
    }
    
};