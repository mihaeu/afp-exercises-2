"use strict";

class Philosopher {
	constructor(id, leftNeighbor, rightNeighbor, leftFork, rightFork) {

		this.id = id;
		this.wantsToEat = false;

		this.leftNeighbor = leftNeighbor;
		this.rightNeighbor = rightNeighbor;

		this.leftFork = leftFork || null;
		this.rightFork = rightFork || null;

		// waiting list
		this.requests = {
			leftNeighbor: false,
			rightNeighbor: false
		};

		this.nextAction();
		this.ciclesSinceHungry = 0;

		process.on('message', (message) => {
			if (message.target !== this.id) return;
			console.log('Philosopher ' + this.id + ' received', message);

			// if someone is done eating, he's not waiting for us anymore
			if (message.status === Philosopher.DONE_EATING) {
				if (this.wantsToEat) this.tryToEat();
				if (message.id === this.leftNeighbor) this.leftFork = message.fork;
				if (message.id === this.rightNeighbor) this.rightFork = message.fork;
			}

			// if someone is not eating, we can try again
			if (message.status === Philosopher.NOT_EATING){
				if (this.wantsToEat) this.tryToEat();
			}

			// if someone wants to eat he has a higher priority
			if (message.status === Philosopher.WANTS_TO_EAT) {
				if (message.id === this.leftNeighbor && this.leftFork.clean === false) {
					this.leftFork.clean = true;
					process.send({
						id: this.id,
						target: this.leftNeighbor,
						message: Philosopher.NOT_EATING,
						fork: leftFork
					});
					this.leftFork = null;
				}
				if (message.id === this.rightNeighbor && this.rightFork.clean === false) {
					this.rightFork.clean = true;
					process.send({
						id: this.id,
						target: this.rightNeighbor,
						message: Philosopher.NOT_EATING,
						fork: rightFork
					});
					this.rightFork = null;
				}

				this.requests[message.id] = true;
			}
		});
	}

	nextAction() {
		Math.random() > 0.5 ? this.think() : this.tryToEat();
	}


	think() {
		process.send({
			id: this.id,
			message: Philosopher.THINKING
		});

		// take your time (10ms)
		require('sleep').usleep(10000);

		this.nextAction();
	}

	tryToEat() {
		console.log(this.id, this.leftFork, this.rightFork, this.isLeftNeighborNotWaiting(), this.isRightNeighborNotWaiting());
		if (this.hasBothForks()
			&& this.isLeftNeighborNotWaiting()
			&& this.isRightNeighborNotWaiting()) {

			this.eat();
		} else {
			this.wantsToEat = true;
			if (this.leftFork === null) {
				process.send({
					id: this.id,
					target: this.leftNeighbor,
					message: Philosopher.WANTS_TO_EAT,
				});
			}
			if (this.right === null) {
				process.send({
					id: this.id,
					target: this.rightNeighbor,
					message: Philosopher.WANTS_TO_EAT
				});
			}
		}
	}

	eat() {
		process.send({
			id: this.id,
			message: Philosopher.START_EATING
		});
		this.wantsToEat = false;

		// take your time (10ms)
		require('sleep').usleep(10000);

		this.leftFork.clean = false;
		this.rightFork.clean = false;

		// give forks to waiting philosophers
		if (this.requests.rightNeighbor === true) {
			this.rightFork.clean = true;
			process.send({
				id: this.id,
				target: this.rightNeighbor,
				message: Philosopher.DONE_EATING,
				fork: this.rightFork
			});
			this.rightFork = null;
		}
		if (this.requests.leftNeighbor === true) {
			this.leftFork.clean = true;
			process.send({
				id: this.id,
				target: this.leftNeighbor,
				message: Philosopher.DONE_EATING,
				fork: this.leftFork
			});
			this.leftFork = null;
		}



		this.nextAction();
	}

	hasBothForks() {
		return this.leftFork !== null && this.rightFork !== null;
	}

	isRightNeighborNotWaiting() {
		return this.requests.rightNeighbor !== false;
	}

	isLeftNeighborNotWaiting() {
		return this.requests.leftNeighbor !== false;
	}
}

Philosopher.START_EATING = 'start eating';
Philosopher.DONE_EATING = 'done eating';
Philosopher.NOT_EATING = 'not eating';
Philosopher.WANTS_TO_EAT = 'wants to eat';
Philosopher.THINKING = 'thinking';

module.exports = Philosopher;