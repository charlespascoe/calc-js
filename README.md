JavaScript Calculator
====================

A simple Node.js calculator.

Usage
-----

`$ node src/index.js '3 + (2 * 10) / 5'`
`3 + (2 * 10) / 5 = 7`

Notes
-----

If there is no space between a `-` and a number, then it will assume that it is a negative number. Therefore, `9 - 8` is valid, but `9 -8` is not, as it is interpreted as two adjacent numbers.

Also, it needs to be tested properly.
