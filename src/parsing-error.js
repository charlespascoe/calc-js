class ParsingError {
  constructor(start, length, message) {
    this.start = start;
    this.length = length;
    this.message = message;
  }

  formatPointerString() {
    return ' '.repeat(this.start) + '^'.repeat(this.length);
  }
}

module.exports = ParsingError;
