
import mongoose from 'mongoose'

const UnlockCancelsSchema = new mongoose.Schema({
  id: {type: String},
  staker: {type: String},
  shares: {type: String},
  batch_id: {type: Number},
  unlock_id: {type: String}
})

export const UnlockCancelsModel = mongoose.model('unlock_cancels', UnlockCancelsSchema)