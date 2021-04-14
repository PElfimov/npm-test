require(`dotenv`).config();

console.log(`Db host name ${process.env.DB_HOST}`);
console.log(`Db user name ${process.env.DB_USER}`);
console.log(`Db password ${process.env.DB_PASSWORD}`);
