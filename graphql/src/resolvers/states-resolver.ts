import { StateModel } from '../models/states'

export const StateResolver = {
  Query: {
    getIndexerState: async () => await StateModel.find({})
  },
}