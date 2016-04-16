"use strict";

class Philosopher {
	static DONE_EATING = 'done eating';
	static NOT_EATING = 'not eating';
	static WANTS_TO_EAT = 'wants to tryToEat';
	static THINKING = 'thinking';

	constructor(id, leftNeighbor, rightNeighbor, hasLeftFork, hasRightFork) {

		this.id = id;

		this.leftNeighbor = leftNeighbor;
		this.rightNeighbor = rightNeighbor;

		// am I holding the fork (=true) or is it with a neighbor (=false)
		this.forks = [
			leftNeighbor = hasLeftFork || false,
			rightNeighbor = hasRightFork || false
		];

		// waiting list
		this.requests = [
			leftNeighbor = false,
			rightNeighbor = false
		];

		this.nextAction();
		this.ciclesSinceHungry = 0;

		process.on('message', (message) => {
			// if someone is done eating, he's not waiting for us anymore
			if (message.status === Philosopher.DONE_EATING) {
				this.requests[message.id] = false;
				this.tryToEat();
			}

			// if someone is not eating, we can try again
			if (message.status === Philosopher.NOT_EATING) this.tryToEat();

			// if someone wants to eat he has a higher priority
			if (message.status === Philosopher.WANTS_TO_EAT) this.requests[message.id] = true;
		});
	}

	nextAction() {
		Math.random() > 0.5 ? this.think() : this.tryToEat();
	}


	think() {
		// take your time (10ms)
		require('sleep').usleep(10000);

		process.send({
			id: this.id,
			message: Philosopher.THINKING
		});

	}

	tryToEat() {
		if (this.hasBothForks()
			&& this.isLeftNeighborNotWaiting()
			&& this.isRightNeighborNotWaiting()) {

			this.eat();
		} else {
			this.forks
				.filter((id, hasFork) => hasFork === false) // forks that I don't have
				.forEach((id, hasFork) => {
					process.send({
						id: this.id,
						message: Philosopher.WANTS_TO_EAT
					});
				});
		}
	}

	eat() {
		// take your time (10ms)
		require('sleep').usleep(10000);

		process.send({
			id: this.id,
			message: Philosopher.DONE_EATING
		});
	}

	hasBothForks() {
		return this.forks[this.leftNeighbor] === true
			&& this.forks[this.rightNeighbor] == true;
	}

	isRightNeighborNotWaiting() {
		return this.requests[this.rightNeighbor] !== false;
	}

	isLeftNeighborNotWaiting() {
		return this.requests[this.leftNeighbor] !== false;
	}
}

module.exports = Philosopher;