import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri as string);
export const database = client.db('kyokara_shop')