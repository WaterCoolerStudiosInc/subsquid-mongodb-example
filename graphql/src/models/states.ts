import mongoose from 'mongoose'

const StateSchema = new mongoose.Schema({
  height: {type: String},
  hash: {type: Number}
})

export const StateModel = mongoose.model('states', StateSchema)