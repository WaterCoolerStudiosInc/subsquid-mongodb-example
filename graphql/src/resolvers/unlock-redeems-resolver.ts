import { UnlockRedeemsModel } from "../models/unlock-redeems"

export const UnlockRedeemsResolver = {
  Query: {
    getAllUnlockRedeems: async () => await UnlockRedeemsModel.find({})
  },
}