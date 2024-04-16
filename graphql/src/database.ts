import mongoose from 'mongoose';

export async function connectToDatabase() {
  try {
    await mongoose.connect('mongodb://root:root@localhost:27017/aleph-indexer?authSource=admin');

    console.log('Successfully connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}