const {MongoClient} = require(`mongodb`);

const url = `mongodb://localhost:27017`;

const connectAndRead = async () => {
  const client = await MongoClient.connect(url, {useUnifiedTopology: true});
  const db = client.db(`wizard-game`);

  const collection = db.collection(`wizard`);
  console.log(collection);

  client.close();
};

connectAndRead().catch((e) => {
  throw e;
});
