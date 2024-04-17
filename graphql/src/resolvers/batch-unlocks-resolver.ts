import { BatchUnlocksModel } from "../models/batch-unlocks"

export const BatchUnlocksResolver = {
  Query: {
    getAllBatchUnlocks: async () => await BatchUnlocksModel.find({})
  },
}