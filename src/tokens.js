class Token {
  constructor(value, pos) {
    this.value = value;
    this.pos = pos;
  }
}

class AdditionToken extends Token {
  static parseToken(str, pos) {
    let match = str.match(/^\+/);

    if (match) return new AdditionToken(match, pos);

    return null;
  }
}

class SubtractionToken extends Token {
  static parseToken(str, pos) {
    let match = str.match(/^-/);

    if (match) return new SubtractionToken(match, pos);

    return null;
  }
}

class MultiplicationToken extends Token {
  static parseToken(str, pos) {
    let match = str.match(/^\*/);

    if (match) return new MultiplicationToken(match, pos);

    return null;
  }
}

class DivisionToken extends Token {
  static parseToken(str, pos) {
    let match = str.match(/^(\/|\\)/);

    if (match) return new DivisionToken(match, pos);

    return null;
  }
}

class OpenBracketToken extends Token {
  static parseToken(str, pos) {
    let match = str.match(/^\(/);

    if (match) return new OpenBracketToken(match, pos);

    return null;
  }
}

class CloseBracketToken extends Token {
  static parseToken(str, pos) {
    let match = str.match(/^\)/);

    if (match) return new CloseBracketToken(match, pos);

    return null;
  }
}

SubtractionToken.PRIORITY = 0;
AdditionToken.PRIORITY = 1;
MultiplicationToken.PRIORITY = 2;
DivisionToken.PRIORITY = 3;
OpenBracketToken.PRIORITY = 4;
CloseBracketToken.PRIORITY = 4;

module.exports = {
  SubtractionToken: SubtractionToken,
  AdditionToken: AdditionToken,
  MultiplicationToken: MultiplicationToken,
  DivisionToken: DivisionToken,
  OpenBracketToken: OpenBracketToken,
  CloseBracketToken: CloseBracketToken,
  prioritisedTokens: [
    SubtractionToken,
    AdditionToken,
    MultiplicationToken,
    DivisionToken,
    OpenBracketToken,
    CloseBracketToken
  ].sort((a, b) => b.PRIORITY - a.PRIORITY)
};
