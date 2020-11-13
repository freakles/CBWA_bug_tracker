const projects = require('../models/projects')();

module.exports = () => {

    const getController = async (req, res) => {
        const { projectsList, error } = await projects.get();
        if (error) {
            console.log('====== ERROR GET::CONTROLLER PROJECTS');
            return res.status(500).json({ error: "Oooops! Projects::get is not working" });
        }
        res.json({ projects: projectsList });
    };

    const getBySlug = async (req, res) => {
        const { projectsList, error } = await projects.get(req.params.slug);
        if (error) {
          console.log('====== ERROR  GET::SLUG::CONTROLLER PROJECTS');
          return res.status(500).json({ error: "Oooops! Projects::getBySlug is not working" });
        }
        res.json({ projects: projectsList });
    };

    const postController = async (req, res) => {
        const slug = req.body.slug;
        const name = req.body.name;
        const description = req.body.description;
        try {
            const result = await projects.add(slug, name, description);
            res.json(result);
        } catch (ex) {
            console.log('====== ERROR POSTCONTROLLER::PROJECTS');
            return res.status(500).json({ error: ex });
        }
        
        
    };

    return {
        getController,
        postController,
        getBySlug,
    }
}
