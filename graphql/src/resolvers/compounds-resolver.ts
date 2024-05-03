import { CompoundModel } from '../models/compounds'

export const CompoundsResolver = {
  Query: {
    getAllCompounds: async () => await CompoundModel.find({})
  },
}