const NumberPrinter = require(`./number-printer.js`);

const printer = NumberPrinter.create();

printer.onNumber = (value) => console.log(value);

setImmediate(() => {
  printer.print(1);
  printer.print(2);
  printer.print(3);
});
