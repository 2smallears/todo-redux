"use strict";

const express = require('express');

const bodyParser = require('body-parser');
const app = new express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('./views'));

app.use(express.static('./public'));
app.use(express.static('./dist'));

var server = app.listen(3000, function () {
    var port = server.address().port;
    console.log('listening at port %s', port);
});

