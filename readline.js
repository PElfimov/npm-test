const readline = require(`readline`);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: `OHAI>`,
});

rl.prompt();

rl.on(`line`, (line) => {
  line = line.trim();
});

switch
