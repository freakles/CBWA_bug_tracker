const projects = require('../models/projects')();

module.exports = () => {

    const getController = async (req, res) => {
        const { projectsList, error } = await projects.get();
        if (error) {
            return res.status(500).json({ error });
        }
        res.json({ projects: projectsList });
    };

    const getBySlug = async (req, res) => {
        res.json(await projects.get(req.params.slug));
    };

    const postController = async (req, res) => {
        const slug = req.body.slug;
        const name = req.body.name;
        const description = req.body.description;
        const result = await projects.add(slug, name, description);
        res.json(result);
        
    };

    return {
        getController,
        postController,
        getBySlug,
    }
}
