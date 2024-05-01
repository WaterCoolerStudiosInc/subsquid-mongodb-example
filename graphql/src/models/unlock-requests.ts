import mongoose from 'mongoose'

const UnlockRequestSchema = new mongoose.Schema({
  event_id: {type: String},
  staker: {type: String},
  shares: {type: String},
  batch_id:{type: Number},
  timestamp: {type: Number},
  block: {type: Number}
})

export const UnlockRequestModel = mongoose.model('unlock_requests', UnlockRequestSchema)