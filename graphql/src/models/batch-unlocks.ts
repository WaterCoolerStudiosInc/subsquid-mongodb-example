import mongoose from 'mongoose'

const BatchUnlocksSchema = new mongoose.Schema({
  id: {type: String},
  shares: {type: String},
  spot_value: {type: String},
  batch_id: {type: String}
})

export const BatchUnlocksModel = mongoose.model('batch_unlocks', BatchUnlocksSchema)