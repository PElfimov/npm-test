const fs = require(`fs`);

const stream = fs.createReadStream(__filename, { highWaterMark: 16 });

let part = 0;
stream
  .on(`data`, (data) => {
    console.log(`Part ${part++}, length: ${data.length}`);
    console.log(data.toString());
  })
  .on(`error`, (e) => {
    console.log(e.message);
  });
