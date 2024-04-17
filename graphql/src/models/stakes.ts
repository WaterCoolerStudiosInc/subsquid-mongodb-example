import mongoose from 'mongoose'

const StakeSchema = new mongoose.Schema({
  id: {type: String},
  staker: {type: String},
  azero: {type: String},
  newShares: {type: String} 
})

export const StakeModel = mongoose.model('stakes', StakeSchema)