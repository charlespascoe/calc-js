class PriorityQueue {
  constructor() {
    this.queue = [];
  }

  add(priority, item) {
    let elms = this.queue[priority];

    if (!elms) {
      elms = [];
      this.queue[priority] = elms;
    }

    elms.push(item);
  }

  pop() {
    for (let i = this.queue.length; i >= 0; i--) {
      let elms = this.queue[i];

      if (elms && elms.length > 0) return elms.splice(0, 1)[0];
    }

    return null;
  }
}

module.exports = PriorityQueue;
