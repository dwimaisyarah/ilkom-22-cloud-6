import { DBNAME } from '../constants.js';
import mongoose from 'mongoose';

export const connectToDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DBNAME}`);

    console.log(` Connected to MongoDB at host: ${connectionInstance.connection.host}`);
    console.log(` Database Name: ${connectionInstance.connection.name}`);
    console.log(` Connected at: ${new Date().toLocaleString()}`);

    return connectionInstance;

  } catch (error) {
    console.error("Failed to connect to MongoDB");
    console.error(error.message);
    process.exit(1);
  }
};
