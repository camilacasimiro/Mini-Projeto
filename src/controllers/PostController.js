const clientMongo = require('../database/mongo');

const createdPost = async (request, response) => {

    const post = {
        email: request.body.email,
        title: request.body.title,
        text: request.body.text
    }

    try { 
        const blog = clientMongo.db(`${process.env.MONGO_DATABASE}`).collection('postBlog');

        await blog.insertOne(post).then(() => {
            response.status(200).send({ message: "Post created successfully!" });

        }).catch((err) => {
            response.status(400).send(err);

        });

    } catch (err) {
        response.send(err);
    }

}

const getPost = async (request, response) => {

    try {
        const blog = clientMongo.db(`${process.env.MONGO_DATABASE}`).collection('postBlog');

        const filter = { email: request.body.email };
        const post = [];

        await blog.find(filter).forEach(c => post.push(c));

        if (post.length > 0) {
            response.status(200).send(post);

        }
        else {
            response.status(400).send("There is no registered post!");
            
        }

    } catch (err) {
        response.send(err)
    }

}

module.exports = {
    createdPost,
    getPost
}
