import { config } from "@/lib/config";
import { MongoClient } from "mongodb";

const MONGO_URI = config.MONGODB_URI;

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(MONGO_URI);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(MONGO_URI);
  clientPromise = client.connect();
}

export default clientPromise;
