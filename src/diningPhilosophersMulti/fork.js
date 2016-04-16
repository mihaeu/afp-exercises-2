"use strict";

class Fork {
  constructor(id, clean) {
    this.id = id;
    this.clean = clean || false;
  }
}

module.exports = Fork;