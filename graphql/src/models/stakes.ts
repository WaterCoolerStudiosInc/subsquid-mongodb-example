import mongoose from 'mongoose'

const StakeSchema = new mongoose.Schema({
  event_id: {type: String},
  staker: {type: String},
  azero: {type: String},
  newShares: {type: String},
  timestamp: {type: Number},
  block: {type: Number},
})

export const StakeModel = mongoose.model('stakes', StakeSchema)