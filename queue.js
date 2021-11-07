module.exports = class Queue {
  constructor() {
    this.arr = [];
  }

  enqueue(item) {
    this.arr.push(item);
  }

  dequeue() {
    this.arr.shift();
  }
};
