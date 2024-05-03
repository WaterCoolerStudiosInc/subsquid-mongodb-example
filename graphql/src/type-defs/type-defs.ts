import { STAKE_TYPE_DEFS } from './stakes.gql'
import { UNLOCK_REQ_TYPE_DEFS } from './unlock-requests.gql'
import { BATCH_UNLOCK_TYPE_DEFS } from './batch-unlocks.gql'
import { TRANSFERS_TYPE_DEFS } from './transfers.gql'
import { UNLOCK_CANCELS_TYPE_DEFS } from './unlock-cancels.gql'
import { UNLOCK_REDEEMS_TYPE_DEFS } from './unlock-redeems.gql'
import { ANALYTICS_TYPE_DEFS } from './analytics.gql'
import { COMPOUND_TYPE_DEFS } from './compounds.gql'

//TODO would be nice to autogenerate these eventually
export const TYPE_DEFS = [
  STAKE_TYPE_DEFS,
  UNLOCK_REQ_TYPE_DEFS,
  BATCH_UNLOCK_TYPE_DEFS,
  TRANSFERS_TYPE_DEFS,
  UNLOCK_CANCELS_TYPE_DEFS,
  UNLOCK_REDEEMS_TYPE_DEFS,
  ANALYTICS_TYPE_DEFS,
  COMPOUND_TYPE_DEFS
]