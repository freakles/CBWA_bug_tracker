const comments = require('../models/comments')();

module.exports = () => {
    const getComments = async (req, res) => {
        const { commentsList, error } = await comments.getComments();
        if (error) {
          console.log('====== ERROR GET::CONTROLLER COMMENTS');
          return res
            .status(500)
            .json({ error: 'Oooops! Comments::get is not working' });
        }
        res.json({ comments: commentsList });
    };

    return {
        getComments,
    };
};