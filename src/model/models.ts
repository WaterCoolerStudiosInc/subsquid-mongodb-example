
interface StakeRecord{
    id: string
    staker:string,
    azero:bigint,
    newShares:bigint
}
interface UnlockRecord{
    id: string
    staker:string,
    shares:bigint,
    batch_id:bigint
}
interface CancellationRecord{
    id: string
    staker:string,
    shares:bigint,
    batch_id:bigint,
    unlock_id:bigint
}
interface BatchUnlockRecord{
    id: string
    staker:string,
    shares:bigint,
    spot_value:bigint,
    batch_id:bigint
}
interface RedemptionRecord{
    id: string
    staker:string,
    
    unlock_id:bigint
}
interface TransferRecord {
    id: string
    from?: string
    to?: string
    amount: bigint
    block: number
    timestamp: Date
    extrinsicHash: string
}