"use strict";

const express = require('express');
const app = express();

app.get('/:message', function (req, res) {
  res.send(req.params.message);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});