import mongoose from 'mongoose'

export async function connectToDatabase() {
  try {
    const localConnectionString = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@localhost:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`
    await mongoose.connect(process.env.DB_URL || localConnectionString)

    console.log('Successfully connected to MongoDB')
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
  }
}