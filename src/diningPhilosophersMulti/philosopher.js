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

		this.tryToEat();
		this.ciclesSinceHungry = 0;

		process.on('message', (message) => {

			if (message.target !== this.id) return;
			// console.log('Philosopher ' + this.id + ' received',
			// 	message,
			// 	"\nleft neighbor",
			// 	this.leftNeighbor,
			// 	"\nright neighbor",
			// 	this.rightNeighbor,
			// 	"\nleft neighbor waits",
			// 	this.requests.leftNeighbor,
			// 	"\nright neighbor waits",
			// 	this.requests.rightNeighbor,
			// 	"\nmy left fork",
			// 	this.leftFork,
			// 	"\nmy right fork",
			// 	this.rightFork,
			// 	"\n"
			// );

			if (message.status === Philosopher.GIVE_FORK) {
				if (message.id === this.leftNeighbor) this.leftFork = message.fork;
				if (message.id === this.rightNeighbor) this.rightFork = message.fork;
				if (this.wantsToEat) this.tryToEat();
			}

			if (message.status === Philosopher.REQUEST_FORKS) {
				if (message.id === this.leftNeighbor && this.leftFork.clean === false) {
					this.leftFork.clean = true;
					process.send({
						id: this.id,
						target: this.leftNeighbor,
						message: Philosopher.GIVE_FORK,
						fork: leftFork
					});
					this.leftFork = null;
				}
				if (message.id === this.rightNeighbor && this.rightFork.clean === false) {
					this.rightFork.clean = true;
					process.send({
						id: this.id,
						target: this.rightNeighbor,
						message: Philosopher.GIVE_FORK,
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

		// take your time (100ms)
		require('sleep').usleep(100000);

		this.nextAction();
	}

	tryToEat() {

		// console.log('TRY TO EAT - Philosopher ' + this.id,
		// 	'------------',
		// 	this.hasBothForks()
		// 	&& this.isLeftNeighborNotWaiting()
		// 	&& this.isRightNeighborNotWaiting(),
		// 	this.requests,
		// 	"\nleft neighbor",
		// 	this.leftNeighbor,
		// 	"\nright neighbor",
		// 	this.rightNeighbor,
		// 	"\nleft neighbor waits",
		// 	this.requests.leftNeighbor,
		// 	"\nright neighbor waits",
		// 	this.requests.rightNeighbor,
		// 	"\nmy left fork",
		// 	this.leftFork,
		// 	"\nmy right fork",
		// 	this.rightFork,
		// 	"\n"
		// );

		if (this.hasBothForks()
			&& this.isLeftNeighborNotWaiting()
			&& this.isRightNeighborNotWaiting()) {

			this.eat();
		} else{
			this.wantsToEat = true;
			if (this.leftFork === null) {
				process.send({
					id: this.id,
					target: this.leftNeighbor,
					message: Philosopher.REQUEST_FORKS,
				});
			}
			if (this.right === null) {
				process.send({
					id: this.id,
					target: this.rightNeighbor,
					message: Philosopher.REQUEST_FORKS
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

		// take your time (100ms)
		require('sleep').usleep(100000);

		this.leftFork.clean = false;
		this.rightFork.clean = false;

		// give forks to waiting philosophers
		if (this.requests.rightNeighbor === true) {
			this.rightFork.clean = true;
			process.send({
				id: this.id,
				target: this.rightNeighbor,
				message: Philosopher.GIVE_FORK,
				fork: this.rightFork
			});
			this.rightFork = null;
		}
		if (this.requests.leftNeighbor === true) {
			this.leftFork.clean = true;
			process.send({
				id: this.id,
				target: this.leftNeighbor,
				message: Philosopher.GIVE_FORK,
				fork: this.leftFork
			});
			this.leftFork = null;
		}



		this.nextAction();
	}

	hasBothForks() {
		return this.leftFork !== null
			&& this.rightFork !== null;
	}

	isRightNeighborNotWaiting() {
		return this.requests.rightNeighbor === false;
	}

	isLeftNeighborNotWaiting() {
		return this.requests.leftNeighbor === false;
	}
}

Philosopher.START_EATING = 'start eating';
Philosopher.GIVE_FORK = 'done eating';
Philosopher.REQUEST_FORKS = 'wants to eat';
Philosopher.THINKING = 'thinking';

module.exports = Philosopher;