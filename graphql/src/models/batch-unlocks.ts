import mongoose from 'mongoose'

const BatchUnlocksSchema = new mongoose.Schema({
  event_id: {type: String},
  shares: {type: String},
  spot_value: {type: String},
  batch_id: {type: String},
  timestamp: {type: Number},
  block: {type: Number},
})

export const BatchUnlocksModel = mongoose.model('batch_unlocks', BatchUnlocksSchema)