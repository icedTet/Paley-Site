import { MongoClient } from "mongodb";

export const withMongo = async () => {
  const client = new MongoClient(process.env.MONGO_URL, {});
  await client.connect();
  return client;
};
