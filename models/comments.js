const db = require('../db')();
const COLLECTION = 'issues';


module.exports = () => {
    const getComments = async () => {
        const PIPELINE = [
            {
                $project: {
                    _id: 0, // does not show _id
                    issueNumber: 1,
                    comment: 1,
                },
            },
        ];

        try {
            const allComments = await db.aggregate(COLLECTION, PIPELINE);
            return { commentsList: allComments };
        } catch (ex) {
            console.log('========= COMMENTS GET ERROR');
            return { error: ex }
        }
    };

    return {
        getComments,
    };

};