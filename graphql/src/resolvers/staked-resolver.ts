import { StakedModel } from "../models/staked";

export const StakedResolver = {
  Query: {
    getAllStakes: async () => await StakedModel.find({})
  },
}