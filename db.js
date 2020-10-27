module.exports = () => {

    const projects = [
        { 
            slug: 'BOOKS',
            name: 'bookstore',
            description: 'a book project' 
        },
        {
            slug: 'BUGS',
            name: 'bugtracker',
            description: 'a bugtracker project'
        },
    ];

    const users = [
        {
            name: 'Jean Paul',
            email: 'jeanpaul@cbwa.com',
            usertype: 'user',
            key: 'new password',
        },
        {
            name: 'Dave',
            email: 'dave@cbwa.com',
            usertype: 'user',
            key: 'new password',
        },
    ];

    return {
        projects,
        users,
    }
}