require('dotenv').config();
const express = require('express');

const user = require('./src/routes/userRoutes');
const draft = require('./src/routes/draftRoutes');
const post = require('./src/routes/postRoutes');

const app = express();

app.use(express.json());
app.use('/blog', user);
app.use('/blog', draft);
app.use('/blog', post);


const port = process.env.PORT || 8080;


app.listen(port, () => {
    console.log('Server listening on port', port);
});
