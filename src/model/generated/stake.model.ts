import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_, BigIntColumn as BigIntColumn_} from "@subsquid/typeorm-store"
import {Owner} from "./owner.model"

@Entity_()
export class Stake {
    constructor(props?: Partial<Stake>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @ManyToOne_(() => Owner, {nullable: true})
    staker!: Owner | undefined | null

    @BigIntColumn_({nullable: false})
    shares!: bigint

    @BigIntColumn_({nullable: false})
    newShares!: bigint
}
