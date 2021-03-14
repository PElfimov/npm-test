const fs = require(`fs`);
const { promisify } = require(`util`);

const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);
const unlink = promisify(fs.unlink);
const mkdir = promisify(fs.mkdir);
const rmdir = promisify(fs.rmdir);

const readWrite = (dir) => {
  const path = `${dir}/newfile.txt`;

  let exist = false;
  mkdir(dir)
    .catch((e) => {
      if (e.code === `EEXIST`) {
        exist = true;
        return Promise.resolve();
      }
      return Promise.reject(e);
    })
    .then(() => writeFile(path, `Hello, world!`))
    .then(() => readFile(path))
    .then((data) => console.log(data.toString()))
    .then(() => unlink(path))
    .then(() => (exist ? Promise.resolve() : rmdir(dir)))
    .catch((e) => console.error(e));
};

readWrite(`${__dirname}/test`);
