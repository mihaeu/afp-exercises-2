"use strict";

const Fork = require('./fork');
const Philosopher = require("./philosopher");

let philosopher = new Philosopher(2, 1, 3, new Fork(2), null);