const Queue = require("./queue");

require("./queue");

module.exports = class UserQueue extends Queue {
  constructor() {
    super();
  }
  getFirstUser() {
    return this.arr[0];
  }
};
