import mongoose from 'mongoose'

export async function connectToDatabase() {
  try {
    const localConnectionString = 'mongodb+srv://dylan:0jxwH1S7tdOw2sK8@cluster0.zbnre8w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
    await mongoose.connect(process.env.DB_URL || localConnectionString)

    console.log('Successfully connected to MongoDB')
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
  }
}
