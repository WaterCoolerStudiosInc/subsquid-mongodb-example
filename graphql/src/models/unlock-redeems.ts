
import mongoose from 'mongoose'

const UnlockRedeemsSchema = new mongoose.Schema({
  id: {type: String},
  staker: {type: String},
  unlock_id: {type: String}
})

export const UnlockRedeemsModel = mongoose.model('unlock_redeems', UnlockRedeemsSchema)