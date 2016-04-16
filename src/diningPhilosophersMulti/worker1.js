"use strict";

const Fork = require('./fork');
const Philosopher = require("./philosopher");

let philosopher = new Philosopher(1, 5, 2, new Fork(5), new Fork(1));