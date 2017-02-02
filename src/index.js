const ParsingError = require('./parsing-error');
const Calculator = require('./calculator');

let input = process.argv.splice(2).join(' ');
try {
  let c = new Calculator();
  console.log(input + ' = ' + c.calculate(input));
} catch (err) {
  if (err instanceof ParsingError) {
    console.log('Parsing error:', err.message);
    console.log(input);
    console.log(err.formatPointerString());
  } else {
    console.error(err);
  }
}
