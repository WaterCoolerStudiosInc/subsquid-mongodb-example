import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_, BigIntColumn as BigIntColumn_, IntColumn as IntColumn_} from "@subsquid/typeorm-store"
import {Owner} from "./owner.model"

@Entity_()
export class Redemption {
    constructor(props?: Partial<Redemption>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @ManyToOne_(() => Owner, {nullable: true})
    staker!: Owner | undefined | null

    @BigIntColumn_({nullable: false})
    azero!: bigint

    @IntColumn_({nullable: true})
    batchid!: number | undefined | null

    @IntColumn_({nullable: true})
    unlockid!: number | undefined | null
}
