require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('./helpers/error-handler');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());    





app.use('/cost-explorer', require("./Project/project.controller.js"));

//error handler
app.use(errorHandler);


const port =  4000;
 app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
