import { BatchUnlocksResolver } from "./batch-unlocks-resolver"
import { StakeResolver } from "./stakes-resolver"
import { TransfersResolver } from "./transfers-resolver"
import { UnlockCancelsResolver } from "./unlock-cancels-resolver"
import { UnlockRedeemsResolver } from "./unlock-redeems-resolver"
import { UnlockRequestResolver } from "./unlock-requests-resolver"

export const RESOLVERS = [
  BatchUnlocksResolver,
  StakeResolver,
  TransfersResolver,
  UnlockCancelsResolver,
  UnlockRedeemsResolver,
  UnlockRequestResolver
]