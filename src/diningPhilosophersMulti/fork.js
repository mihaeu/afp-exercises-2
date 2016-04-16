"use strict";

class Fork {
  constructor(id) {
    this.id = id;
    this._inUse = false;
  }

  inUse() {
    return this._inUse;
  }

  use() {
    this._inUse = true;
  }

  putDown() {
    this._inUse = false;
  }
}

module.exports = Fork;