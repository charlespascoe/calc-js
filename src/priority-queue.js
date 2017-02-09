class PriorityQueue {
  constructor(comparator) {
    this.comparator = comparator;
    this.heap = [];
    this.heapSize = 0;
  }

  leftIndex(index) {
    return 2 * (index + 1) - 1;
  }

  rightIndex(index) {
    return 2 * (index + 1);
  }

  parentIndex(index) {
    return (0 | (index + 1) / 2) - 1;
  }

  fixMapHeap(index) {
    let left = this.leftIndex(index),
        right = this.rightIndex(index),
        largest = index;

    if (left < this.heapSize && this.comparator(this.heap[left], this.heap[largest]) > 0) {
      largest = left;
    }

    if (right < this.heapSize && this.comparator(this.heap[right], this.heap[largest]) > 0) {
      largest = right;
    }

    if (largest !== index) {
      this.swap(largest, index);
      this.fixMapHeap(largest);
    }
  }

  swap(index1, index2) {
    let item = this.heap[index1];
    this.heap[index1] = this.heap[index2];
    this.heap[index2] = item;
  }

  add(item) {
    let index = this.heapSize;
    this.heap[index] = item;
    this.heapSize++;

    while (index > 0 && this.comparator(this.heap[index], this.heap[this.parentIndex(index)]) > 0) {
      this.swap(index, this.parentIndex(index));
      index = this.parentIndex(index);
    }
  }

  pop() {
    if (this.heapSize == 0) return null;

    let item = this.heap[0];
    this.heap[0] = null;

    this.swap(0, this.heapSize - 1);

    this.heapSize--;

    this.fixMapHeap(0);

    return item;
  }
}

module.exports = PriorityQueue;
