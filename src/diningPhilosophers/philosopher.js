"use strict";

class Philosopher {
    constructor(name, leftFork, rightFork) {
        this.name = name;
        this.leftFork = leftFork;
        this.rightFork = rightFork;
        this.nextAction();
        this.ciclesSinceHungry = 0;
    }

    nextAction() {
        Math.random() > 0.5 ? this.think() : this.eat();
    }


    think() {
        console.log("Philosoph " + this.name + " denkt nach.");
        setTimeout(() => this.nextAction(), 10);
    }

    eat() {
        console.log("Philsoph " + this.name + " ist hungrig.");
        if (!this.leftFork.inUse() && !this.rightFork.inUse()) {
            this.leftFork.use();
            this.rightFork.use();
            console.log("Philsoph " + this.name + " isst.");
            setTimeout(()=>{
                console.log("Philsoph " + this.name + " ist fertig mit essen.");
                this.leftFork.putDown();
                this.rightFork.putDown();
                this.ciclesSinceHungry = 0;
                this.nextAction()
            }, 20);
        } else {
            if (this.ciclesSinceHungry > 50){
                throw new Error("Philsoph " + this.name + " ist verhungert!");
            }
            console.log("Philsoph " + this.name + " bleibt hungrig.");
            this.ciclesSinceHungry++;
            setTimeout(()=>this.eat(), 5);
        }
    }
}

module.exports = Philosopher;