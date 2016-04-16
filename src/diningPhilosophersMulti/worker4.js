"use strict";

const Fork = require('./fork');
const Philosopher = require("./philosopher");

let philosopher = new Philosopher(4, 3, 5, null, new Fork(4));