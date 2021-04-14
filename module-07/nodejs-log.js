const util = require(`util`);
const debug = util.debuglog(`nodejs-log`);

console.log(`${Date.now()} Привет, лог!`);
console.error(`${Date.now()} Привет, лог!`, {context: `hello`});

debug(`это собщение появится только в режиме дебага`);

