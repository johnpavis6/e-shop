var express = require('express');
var app = express.Router();

const dir = "user/";

app.get('/', function(req, res) {
    res.redirect('/admin');
});

module.exports = app;