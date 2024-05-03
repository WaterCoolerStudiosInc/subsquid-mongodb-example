import mongoose from 'mongoose'

const TransfersSchema = new mongoose.Schema({
  event_id: {type: String},
  from: {type: String},
  to: {type: String},
  amount: {type: String},
  timestamp: {type: String},
  block: {type: Number},
  extrinsicHash: {type: String}
})

export const TransfersModel = mongoose.model('transfers', TransfersSchema)