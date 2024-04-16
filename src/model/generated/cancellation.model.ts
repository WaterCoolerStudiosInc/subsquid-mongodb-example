import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_, BigIntColumn as BigIntColumn_, IntColumn as IntColumn_} from "@subsquid/typeorm-store"
import {Owner} from "./owner.model"

@Entity_()
export class Cancellation {
    constructor(props?: Partial<Cancellation>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @ManyToOne_(() => Owner, {nullable: true})
    staker!: Owner | undefined | null

    @BigIntColumn_({nullable: false})
    shares!: bigint

    @IntColumn_({nullable: false})
    batchid!: number

    @IntColumn_({nullable: false})
    unlockid!: number
}
