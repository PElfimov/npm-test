const {MongoClient} = require(`mongodb`);

const url = `mongodb://localhost:27017`;

const connectAndRead = async () => {
  const client = await MongoClient.connect(url);
  const db = client.db(`my-fancy-game`);

  const collection = db.collection(`wizard`);
  console.log(collection);

  client.close();
};

connectAndRead().catch((e) => {
  throw e;
});
