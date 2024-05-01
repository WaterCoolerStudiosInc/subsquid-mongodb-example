import mongoose from 'mongoose'

const AnalyticsSchema = new mongoose.Schema({
  total_shares: {type: String},
  minted_shares: {type: String},
  virtual_shares: {type: String},
  total_pooled: {type: String},
  timestamp: {type: Number},
  block: {type: Number},
})

export const AnalyticsModel = mongoose.model('analytics', AnalyticsSchema)