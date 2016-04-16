"use strict";

const Fork = require('./fork');
const Philosopher = require("./philosopher");

let philosopher = new Philosopher(3, 2, 4, null, new Fork(3));