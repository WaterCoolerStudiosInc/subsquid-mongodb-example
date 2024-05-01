
import mongoose from 'mongoose'

const UnlockRedeemsSchema = new mongoose.Schema({
  event_id: {type: String},
  staker: {type: String},
  unlock_id: {type: String},
  timestamp: {type: Number},
  block: {type: Number},
})

export const UnlockRedeemsModel = mongoose.model('unlock_redeems', UnlockRedeemsSchema)