import { config } from "@/lib/config";
import { MongoClient } from "mongodb";

const MONGO_URI = config.MONGO_URI;

// export const CONNECT_DB = async () => {
//   try {
//     await mongoose.connect(MONGO_URI);
//     console.log("BD_CONNECTED_SUCCESSFULLY");
//   } catch (err) {
//     console.log("DB_CONNECTED_FAILED");
//   }
// };

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(MONGO_URI);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;
