import mongoose from 'mongoose';

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/vss_svm';
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3000 // fail fast if local MongoDB not running so we fall back seamlessly
    });
    console.log(`[MongoDB] Connected successfully: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.log(`[Database Notice] MongoDB not accessible locally (${error.message}).`);
    console.log(`[Database Engine] Active: Integrated High-Performance File-Backed JSON Store (Data persisted in server/data/db.json).`);
    return false;
  }
};
