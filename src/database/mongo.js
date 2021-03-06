const { MongoClient } = require('mongodb');

const clientMongo = new MongoClient(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`,
    { useUnifiedTopology: true });

clientMongo.connect().then(() => {
    console.log("Connected mongo!")
}).catch((err) => {
    console.log(err)
})

module.exports = clientMongo;