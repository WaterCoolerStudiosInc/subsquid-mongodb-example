import mongoose from 'mongoose'

export async function connectToDatabase() {
  try {
    const localConnectionString = 'mongodb://root:root@localhost:27017/aleph-indexer?authSource=admin'
    await mongoose.connect(process.env.DB_URL || localConnectionString)

    console.log('Successfully connected to MongoDB')
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
  }
}