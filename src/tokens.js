class Token {
  constructor(value, pos) {
    this.value = value;
    this.pos = pos;
  }
}

class NumberToken extends Token {
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
  static parseToken(str, pos) {
    let match = str.match(/^\+/);

    if (match) return new AdditionToken(match[0], pos);

    return null;
  }
}

class SubtractionToken extends Token {
  static parseToken(str, pos) {
    let match = str.match(/^-/);

    if (match) return new SubtractionToken(match[0], pos);

    return null;
  }
}

class MultiplicationToken extends Token {
  static parseToken(str, pos) {
    let match = str.match(/^\*/);

    if (match) return new MultiplicationToken(match[0], pos);

    return null;
  }
}

class DivisionToken extends Token {
  static parseToken(str, pos) {
    let match = str.match(/^(\/|\\)/);

    if (match) return new DivisionToken(match[0], pos);

    return null;
  }
}

class OpenBracketToken extends Token {
  static parseToken(str, pos) {
    let match = str.match(/^\(/);

    if (match) return new OpenBracketToken(match[0], pos);

    return null;
  }
}

class CloseBracketToken extends Token {
  static parseToken(str, pos) {
    let match = str.match(/^\)/);

    if (match) return new CloseBracketToken(match[0], pos);

    return null;
  }
}

SubtractionToken.PRIORITY = 0;
AdditionToken.PRIORITY = 1;
MultiplicationToken.PRIORITY = 2;
DivisionToken.PRIORITY = 3;
OpenBracketToken.PRIORITY = 4;
CloseBracketToken.PRIORITY = 4;
NumberToken.PRIORITY = 5;

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
