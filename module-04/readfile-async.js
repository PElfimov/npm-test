const fs = require(`fs`);
const {promisify} = require(`util`);

const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);
const unlink = promisify(fs.unlink);
const mkdir = promisify(fs.mkdir);
const rmdir = promisify(fs.rmdir);

const readWrite = async (dir) => {
  const path = `${dir}/newfile.txt`;

  let created = false;

  try {
    await mkdir(dir);
    created = true;
  } catch (e) {
    if (e.code !== `EEXIST`) {
      throw e;
    }
  }

  await writeFile(path, `Hello, world!`);
  const data = await readFile(path);
  console.log(data.toString());
  await unlink(path);

  if (created) {
    await rmdir(dir);
  }
};

readWrite(`${__dirname}/test`);
