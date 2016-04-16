"use strict";

class Philosopher {
    constructor(name, leftNeighbor, rightNeighbor) {
        this.name = name;


        this.leftNeighbor = leftNeighbor;
        this.rightNeighbor = rightNeighbor;

        // waiting list
        this.requests = [leftNeighbor = false, rightNeighbor = false];

        this.nextAction();
        this.ciclesSinceHungry = 0;

        process.on('message', (message) => {
          this.requests[message.id] = true;
        });
    }

    nextAction() {
        Math.random() > 0.5 ? this.think() : this.eat();
    }


    think() {
        process.send({
          message: "Philosoph " + this.name + " denkt nach."
        });

    }

    eat() {
      if (!this.leftFork.inUse() && !this.rightFork.inUse()
          && this.isLeftNeighbourNotWaiting()
          && this.isRightNeighbourNotWaiting()) {

        process.send({
          message: "Philosoph " + this.name + " isst."
        });
      } else {
        process.send({
          message: "Philosoph " + this.name + " bleibt hungrig."
        });
      }
    }

  isRightNeighbourNotWaiting() {
    return this.requests[this.rightNeighbor] !== false;
  }

  isLeftNeighbourNotWaiting() {
    return this.requests[this.leftNeighbor] !== false;
  }
}

module.exports = Philosopher;