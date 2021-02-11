const EventEmitter = require(`events`);

class StartupEmitter extends EventEmitter {
  constructor() {
    super();
    setImmediate(() => {
      this.emit(`startup`, `hello`);
    });
  }
}

const startupEmitter = new StartupEmitter();
startupEmitter.on(`startup`, (data) => console.log(data));
