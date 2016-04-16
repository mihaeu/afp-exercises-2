"use strict";

class Philosopher {
    constructor(name, leftNeighbor, rightNeighbor) {
        this.name = name;
        this.leftNeighbor = leftNeighbor;
        this.rightNeighbor = rightNeighbor;
        this.nextAction();
        this.ciclesSinceHungry = 0;
    }

    nextAction() {
        Math.random() > 0.5 ? this.think() : this.eat();
    }


    think() {
        console.log("Philosoph " + this.name + " denkt nach.");
    }

    eat() {

    }
}

module.exports = Philosopher;