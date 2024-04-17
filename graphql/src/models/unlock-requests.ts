import mongoose from 'mongoose'

const UnlockRequestSchema = new mongoose.Schema({
  id: {type: String},
  staker: {type: String},
  shares: {type: String},
  batch_id:{type: Number},
})

export const UnlockRequestModel = mongoose.model('unlock_requests', UnlockRequestSchema)