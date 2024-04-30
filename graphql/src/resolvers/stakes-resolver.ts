import { StakeModel } from '../models/stakes'

export const StakeResolver = {
  Query: {
    getAllStakes: async () => await StakeModel.find({})
  },
}