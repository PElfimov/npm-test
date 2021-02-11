class NumberPrinter {
  onNumber(value) {
    return value;
  }

  print(value) {
    this.onNumber(value);
  }

  static create(defaultValue = 0) {
    const emitter = new NumberPrinter();
    setImmediate(() => {
      emitter.print(defaultValue);
    });

    return emitter;
  }
}

module.exports = NumberPrinter;
