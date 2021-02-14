const fs = require(`fs`);

fs.readFile(__filename, `utf8`, (err, data) => {
  if (err) {
    return console.error(err.message);
  }

  return console.log(data);
});
