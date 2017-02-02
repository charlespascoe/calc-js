class ParsingError {
  constructor(start, length, message) {
    this.stack = new Error().stack.split('\n').splice(2).join('\n');
    this.start = start;
    this.length = length;
    this.message = message;
  }

  formatPointerString() {
    return ' '.repeat(this.start) + '^'.repeat(this.length);
  }
}

module.exports = ParsingError;
