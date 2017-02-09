const {
  SubtractionToken,
  AdditionToken,
  MultiplicationToken,
  DivisionToken,
  OpenBracketToken,
  CloseBracketToken,
  NumberToken,
  BinaryOperationToken,
  prioritisedTokens
} = require('./tokens');
const PriorityQueue = require('./priority-queue');
const ParsingError = require('./parsing-error');

class Result {
  constructor(number) {
    this.number = number;
    this.next = null;
    this.prev = null;
    this.processed = true;
  }
}

const TOKEN_COMPARATOR = (token1, token2) => {
  if (token1.priority != token2.priority) return token1.priority - token2.priority;
  // If same priority, order by position left to right
  return token2.pos - token1.pos;
}

class Calculator {
  tokenise(input) {
    let queue = new PriorityQueue(TOKEN_COMPARATOR);

    let str = input,
        pos = 0,
        foundToken,
        prevToken = null;

    while (str.length > 0) {
      foundToken = false;

      for (let tokenType of prioritisedTokens) {
        let token = tokenType.parseToken(str, pos);

        if (token) {
          queue.add(token);

          str = str.substr(token.length);

          pos += token.length;

          if (prevToken != null) {
            prevToken.next = token;
            token.prev = prevToken;
          }

          prevToken = token;

          foundToken = true;
          break;
        }
      }

      if (!foundToken) {
        throw new ParsingError(pos, str.length, 'Unknown expression');
      }

      let spaces = str.match(/^\s+/);

      if (spaces) {
        str = str.substr(spaces[0].length);
        pos += spaces[0].length;
      }
    }

    return queue;
  }

  calculate(input) {
    let queue = this.tokenise(input);
    return this.evaluate(queue).number;
  }

  evaluate(queue) {
    let result;

    while (true) {
      let token = queue.pop();

      if (token == null) break;

      if (token instanceof NumberToken) {
        result = token;
        continue;
      }

      // If this token has already been processed, skip it
      if (token.processed) continue;

      if (token instanceof OpenBracketToken) {
        this.parseBrackets(token);
        continue;
      }

      if (token instanceof BinaryOperationToken) {
        if (token.prev == null) throw new ParsingError(token.pos, token.length, 'Expected an expression before the operator');
        if (token.next == null) throw new ParsingError(token.pos, token.length, 'Expected an expression after the operator');
        if (!(token.prev instanceof NumberToken || token.prev instanceof Result)) throw new ParsingError(token.prev.pos, token.prev.length, 'Unexpected expression before operator');
        if (!(token.next instanceof NumberToken || token.next instanceof Result)) throw new ParsingError(token.next.pos, token.next.length, 'Unexpected expression after operator');

        result = new Result(token.evaluate());
        result.pos = token.prev.pos;
        result.length = token.next.pos + token.next.length - token.prev.pos;

        token.processed = true;

        if (token.prev.prev) token.prev.prev.next = result;
        result.prev = token.prev.prev;
        token.prev.prev = null;

        if (token.next.next) token.next.next.prev = result;
        result.next = token.next.next;
        token.next.next = null;
        continue;
      }

      throw new ParsingError(token.pos, token.length, `Unhandled token type: ${token.constructor.name}`);
    }

    if (!result) return 0;

    if (!(result instanceof Result || result instanceof NumberToken)) throw new ParsingError(result.pos, result.length, `Unexpected result type: ${result.constructor.name}`);
    if (result.prev) throw new ParsingError(result.prev.pos, result.prev.length, 'Unexpected expression ' + result.prev.constructor.name);
    if (result.next) throw new ParsingError(result.next.pos, result.next.length, 'Unexpected expression ' + result.next.constructor.name);

    return result;
  }

  parseBrackets(openBracketToken) {
    let token = openBracketToken.next,
        queue = new PriorityQueue(TOKEN_COMPARATOR),
        length = 0,
        bracketDepth = 0;

    while (token != null) {
      if (token instanceof OpenBracketToken) bracketDepth++;
      if (token instanceof CloseBracketToken) {
        if (bracketDepth == 0) {
          if (token.prev === openBracketToken) throw new ParsingError(openBracketToken.pos, token.pos + token.length - openBracketToken.pos, 'Empty brackets not permitted');

          // First and last elements of the subsequence between the brackets
          let first = openBracketToken.next,
              last = token.prev;

          // Remove references to convert it into an independent sequence
          first.prev = null;
          last.next = null;

          // Disassociate references from brackets
          openBracketToken.processed = true;
          token.processed = true;

          let result = this.evaluate(queue);

          result.pos = openBracketToken.pos;
          result.length = length + token.length;

          if (openBracketToken.prev) openBracketToken.prev.next = result;
          result.prev = openBracketToken.prev;
          openBracketToken.prev = null;
          openBracketToken.next = null;

          if (token.next) token.next.prev = result;
          result.next = token.next;
          token.next = null;
          token.prev = null;

          return;
        } else {
          bracketDepth--;
        }
      }

      length += token.length;

      queue.add(token);

      token = token.next;
    }

    throw new ParsingError(openBracketToken.pos, openBracketToken.length, 'Cannot find closing bracket');
  }
}

module.exports = Calculator;
