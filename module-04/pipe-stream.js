const fs = require(`fs`);

const readStream = fs.createReadStream(__filename);
const writeStream = fs.createWriteStream(`example.txt`, `utf-8`);

readStream.on(`error`, () => {
  readStream.close();
  writeStream.close();
});

writeStream.on(`error`, () => {
  readStream.close();
  writeStream.close();
});

readStream.pipe(writeStream);
