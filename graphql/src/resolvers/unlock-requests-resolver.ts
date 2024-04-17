import { UnlockRequestModel } from "../models/unlock-requests"

export const UnlockRequestResolver = {
  Query: {
    getAllUnlockRequests: async () => await UnlockRequestModel.find({})
  },
}