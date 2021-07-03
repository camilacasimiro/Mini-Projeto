const redis = require("redis");

const client = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
});

client.on("connect", () => {
    console.log("Connected redis!");
});

client.on("error", function(error){
    console.log(error);
});

module.exports = client;