var express = require('express');
var app = express();
const api = require('./api');
const cors = require('cors');
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());


app.use("/api", api);
//app.use(cors())
//app.use(bodyParser.json());
app.get('/', function (req, res) {
});

app.listen(3001, function () {
    console.log('Example app listening');
});

// Error Handling
app.use((req, res, next) => {
    next(createError(404));
});

app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});

module.exports = app;