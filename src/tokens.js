class Token {
  constructor(value, pos) {
    this.value = value;
    this.pos = pos;
  }
}

class NumberToken extends Token {
  get priority() { return NumberToken.PRIORITY; }

  constructor(value, pos) {
    super(value, pos);
    this.number = parseFloat(value);
  }

  static parseToken(str, pos) {
    let match = str.match(/^-?\d+(\.\d+)?/);

    if (match) return new NumberToken(match[0], pos);

    return null;
  }
}

class AdditionToken extends Token {
  get priority() { return AdditionToken.PRIORITY; }

  static parseToken(str, pos) {
    let match = str.match(/^\+/);

    if (match) return new AdditionToken(match[0], pos);

    return null;
  }
}

class SubtractionToken extends Token {
  get priority() { return SubtractionToken.PRIORITY; }

  static parseToken(str, pos) {
    let match = str.match(/^-/);

    if (match) return new SubtractionToken(match[0], pos);

    return null;
  }
}

class MultiplicationToken extends Token {
  get priority() { return MultiplicationToken.PRIORITY; }

  static parseToken(str, pos) {
    let match = str.match(/^\*/);

    if (match) return new MultiplicationToken(match[0], pos);

    return null;
  }
}

class DivisionToken extends Token {
  get priority() { return DivisionToken.PRIORITY; }

  static parseToken(str, pos) {
    let match = str.match(/^(\/|\\)/);

    if (match) return new DivisionToken(match[0], pos);

    return null;
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

SubtractionToken.PRIORITY = 0;
AdditionToken.PRIORITY = 0;
MultiplicationToken.PRIORITY = 1;
DivisionToken.PRIORITY = 2;
OpenBracketToken.PRIORITY = 3;
CloseBracketToken.PRIORITY = 3;
NumberToken.PRIORITY = 4;

module.exports = {
  SubtractionToken: SubtractionToken,
  AdditionToken: AdditionToken,
  MultiplicationToken: MultiplicationToken,
  DivisionToken: DivisionToken,
  OpenBracketToken: OpenBracketToken,
  CloseBracketToken: CloseBracketToken,
  NumberToken: NumberToken,
  prioritisedTokens: [
    SubtractionToken,
    AdditionToken,
    MultiplicationToken,
    DivisionToken,
    OpenBracketToken,
    CloseBracketToken,
    NumberToken
  ].sort((a, b) => b.PRIORITY - a.PRIORITY)
};
