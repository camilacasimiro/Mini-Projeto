require('dotenv').config();
const express = require('express');

const user = require('./src/routes/userRoutes');
const draft = require('./src/routes/draftRoutes');

const app = express();

app.use(express.json());
app.use('/blog', user);
app.use('/blog', draft);


const port = process.env.PORT || 3333;


app.listen(port, () => {
    console.log('Server listening on port', port);
});
