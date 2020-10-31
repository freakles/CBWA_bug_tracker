const comments = require('../models/comments')();

module.exports = () => {
    const getComments = async (req, res) => {
        res.json(await comments.getComments());
    };

    return {
        getComments,
    };
};