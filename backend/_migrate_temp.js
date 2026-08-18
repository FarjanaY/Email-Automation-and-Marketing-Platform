const { MongoClient } = require("mongodb");

const TARGET_URI =
  "mongodb://email-automation:email123@ac-wgbcznh-shard-00-00.iovppkt.mongodb.net:27017,ac-wgbcznh-shard-00-01.iovppkt.mongodb.net:27017,ac-wgbcznh-shard-00-02.iovppkt.mongodb.net:27017/email-automation-marketing-platform?ssl=true&authSource=admin&replicaSet=atlas-mj09yh-shard-0&retryWrites=true&w=majority&appName=Cluster0";

async function verify() {
  const client = new MongoClient(TARGET_URI);
  await client.connect();
  const db = client.db();
  const collections = await db.listCollections().toArray();
  for (const { name } of collections) {
    const count = await db.collection(name).countDocuments();
    console.log(`- ${name}: ${count} document(s)`);
  }
  await client.close();
}

verify().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
