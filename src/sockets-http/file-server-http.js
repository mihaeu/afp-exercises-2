"use strict";

const express = require('express');
const app = express();

const fs = require('fs');
const Promise = require("bluebird");
const readFile = Promise.promisify(require("fs").readFile);

app.get('/:filename', function (req, res) {
  readFile(req.params.filename, 'utf8')
    .then(data => res.status(200).send(data))
    .catch(error => res.status(404).send(error.message));
});

app.listen(3000, function () {
  console.log('File server listening on port 3000!');
});