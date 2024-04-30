import { UnlockCancelsModel } from "../models/unlock-cancels"

export const UnlockCancelsResolver = {
  Query: {
    getAllUnlockCancels: async () => await UnlockCancelsModel.find({})
  },
}