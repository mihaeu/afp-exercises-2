"use strict";

const Fork = require('./fork');
const Philosopher = require("./philosopher");

let philosopher = new Philosopher(2, 1, 3, null, new Fork(2));