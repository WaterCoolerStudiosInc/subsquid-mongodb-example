import { TransfersModel } from "../models/transfers"

export const TransfersResolver = {
  Query: {
    getAllTransfers: async () => await TransfersModel.find({})
  },
}