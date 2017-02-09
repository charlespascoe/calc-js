class Token {
  constructor(value, pos) {
    this.value = value;
    this.length = value.length;
    this.pos = pos;
    this.processed = false;
    this.next = null;
    this.prev = null;
  }
}

class NumberToken extends Token {
  get priority() { return NumberToken.PRIORITY; }

  constructor(value, pos) {
    super(value, pos);
    this.number = parseFloat(value);
    this.processed = true;
  }

  static parseToken(str, pos) {
    let match = str.match(/^-?\d+(\.\d+)?/);

    if (match) return new NumberToken(match[0], pos);

    return null;
  }
}

class BinaryOperationToken extends Token { }

class AdditionToken extends BinaryOperationToken {
  get priority() { return AdditionToken.PRIORITY; }

  static parseToken(str, pos) {
    let match = str.match(/^\+/);

    if (match) return new AdditionToken(match[0], pos);

    return null;
  }

  evaluate() {
    return this.prev.number + this.next.number;
  }
}

class SubtractionToken extends BinaryOperationToken {
  get priority() { return SubtractionToken.PRIORITY; }

  static parseToken(str, pos) {
    let match = str.match(/^-/);

    if (match) return new SubtractionToken(match[0], pos);

    return null;
  }

  evaluate() {
    return this.prev.number - this.next.number;
  }
}

class MultiplicationToken extends BinaryOperationToken {
  get priority() { return MultiplicationToken.PRIORITY; }

  static parseToken(str, pos) {
    let match = str.match(/^\*/);

    if (match) return new MultiplicationToken(match[0], pos);

    return null;
  }

  evaluate() {
    return this.prev.number * this.next.number;
  }
}

class DivisionToken extends BinaryOperationToken {
  get priority() { return DivisionToken.PRIORITY; }

  static parseToken(str, pos) {
    let match = str.match(/^(\/|\\)/);

    if (match) return new DivisionToken(match[0], pos);

    return null;
  }

  evaluate() {
    return this.prev.number / this.next.number;
  }
}

class ExponentiationToken extends BinaryOperationToken {
  get priority() { return ExponentiationToken.PRIORITY; }

  static parseToken(str, pos) {
    let match = str.match(/^\^/);

    if (match) return new ExponentiationToken(match[0], pos);

    return null;
  }

  evaluate() {
    return Math.pow(this.prev.number, this.next.number);
  }
}

class ModuloToken extends BinaryOperationToken {
  get priority() { return ModuloToken.PRIORITY; }

  static parseToken(str, pos) {
    let match = str.match(/^%/);

    if (match) return new ModuloToken(match[0], pos);

    return null;
  }

  evaluate() {
    return this.prev.number % this.next.number;
  }
}

class OpenBracketToken extends Token {
  get priority() { return OpenBracketToken.PRIORITY; }

  static parseToken(str, pos) {
    let match = str.match(/^\(/);

    if (match) return new OpenBracketToken(match[0], pos);

    return null;
  }
}

class CloseBracketToken extends Token {
  get priority() { return CloseBracketToken.PRIORITY; }

  static parseToken(str, pos) {
    let match = str.match(/^\)/);

    if (match) return new CloseBracketToken(match[0], pos);

    return null;
  }
}

let priority = 0;
SubtractionToken.PRIORITY = AdditionToken.PRIORITY = priority++;
MultiplicationToken.PRIORITY = priority++;
DivisionToken.PRIORITY = ModuloToken.PRIORITY = priority++;
ExponentiationToken.PRIORITY = priority++;
OpenBracketToken.PRIORITY = CloseBracketToken.PRIORITY = priority++;
NumberToken.PRIORITY = priority++;

module.exports = {
  SubtractionToken: SubtractionToken,
  AdditionToken: AdditionToken,
  MultiplicationToken: MultiplicationToken,
  DivisionToken: DivisionToken,
  ModuloToken: ModuloToken,
  OpenBracketToken: OpenBracketToken,
  CloseBracketToken: CloseBracketToken,
  NumberToken: NumberToken,
  BinaryOperationToken: BinaryOperationToken,
  ExponentiationToken: ExponentiationToken,
  prioritisedTokens: [
    SubtractionToken,
    AdditionToken,
    MultiplicationToken,
    DivisionToken,
    ModuloToken,
    ExponentiationToken,
    OpenBracketToken,
    CloseBracketToken,
    NumberToken
  ].sort((a, b) => b.PRIORITY - a.PRIORITY)
};
