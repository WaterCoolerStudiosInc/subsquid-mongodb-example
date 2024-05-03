import mongoose from 'mongoose'

const CompoundSchema = new mongoose.Schema({
  event_id: {type: String},
  azero: {type: String},
  incentive: {type: String},
  timestamp: {type: Number},
  block: {type: Number},
})

export const CompoundModel = mongoose.model('compounds', CompoundSchema)