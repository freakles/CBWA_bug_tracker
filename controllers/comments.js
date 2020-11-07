const comments = require('../models/comments')();

module.exports = () => {
    const getComments = async (req, res) => {
        const { commentsList, error } = await comments.get();
        if (error) {
          return res.status(500).json({ error });
        }
        res.json({ comments: commentsList });
    };

    return {
        getComments,
    };
};