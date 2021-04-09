const {MongoClient} = require(`mongodb`);
const assert = require(`assert`);

const url = `mongodb://localhost:27017`;

const wizards = [
  {name: `Пендальф`},
  {name: `Радогаст`},
  {name: `Гарри Поттер`}
];

const connectAndRead = async ()=> {
  const client = await MongoClient.connect(url, {useUnifiedTopology: true});
  const db = client.db(`wizards`);

  const collection = db.collection(`find`);
  // Insert a multi documents
  const result = await collection.insertMany(wizards);
  assert.equal(3, result.insertedCount);
  console.log(result);

  const itemCursor = collection.find({name: `Радогаст`});
  const items = await itemCursor.limit(5).toArray();
  // Get first two documents that match the query
  console.log(`items!!!!`, items);
  assert.equal(2, items.length);
  client.close();
};

connectAndRead().catch((e)=>{
  throw e;
});
