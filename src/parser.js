const {
  prioritisedTokens
} = require('./tokens');
const PriorityQueue = require('./priority-queue');
const ParsingError = require('./parsing-error');

class Parser {
  tokenise(input) {
    let queue = new PriorityQueue();

    let str = input,
        pos = 0;

    let foundToken;

    while (str.length > 0) {
      foundToken = false;

      for (let tokenType of prioritisedTokens) {
        let token = tokenType.parseToken(str, pos);

        if (token) {
          queue.add(tokenType.PRIORITY, token);

          str = str.substr(token.value.length);

          pos += token.value.length;

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
}

module.exports = Parser;
