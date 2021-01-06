import mongoose, { mongo } from "mongoose";
import { Db } from "mongodb";
import config from "../config";

export default async () => {
  const connection = await mongoose.connect(config.MONGO_URL, {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
  });
  return connection.connection.db;
};
