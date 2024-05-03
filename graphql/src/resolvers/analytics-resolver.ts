import { AnalyticsModel } from "../models/analytics"

export const AnalyticsResolver = {
  Query: {
    getAllAnalytics: async () => await AnalyticsModel.find({})
  },
}