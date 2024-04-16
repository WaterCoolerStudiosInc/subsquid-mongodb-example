import mongoose from 'mongoose';

const StakedSchema = new mongoose.Schema({
  id: {type: String},
  staker: {type: String},
  azero: {type: String},
  newShares: {type: String} 
});

export const StakedModel = mongoose.model('Staked', StakedSchema);