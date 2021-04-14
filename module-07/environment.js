const environment = process.env;

for (const key of Object.keys(environment)) {
  console.log(`${key} = ${environment[key]}`);
}


