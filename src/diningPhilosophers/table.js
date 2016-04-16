"use strict";
let Philosopher = require("./philosopher");
let Fork = require("./fork");

class Table {
    constructor() {
        this.forks = [new Fork(0), new Fork(1), new Fork(2), new Fork(3), new Fork(4)];
        this.philosophers = [
            new Philosopher(0, this.forks[0], this.forks[1]),
            new Philosopher(1, this.forks[1], this.forks[2]),
            new Philosopher(2, this.forks[2], this.forks[3]),
            new Philosopher(3, this.forks[3], this.forks[4]),
            new Philosopher(4, this.forks[4], this.forks[0])];
    }
}

module.exports = Table;