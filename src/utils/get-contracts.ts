export enum ContractIds {
  Vault = 'vault',
  Registry = 'registry',
  ShareToken = 'share_token',
}

export type KintsuContract = {
  name: string
  address: string
  blockNumber: number
  abi: string
}

export async function getContracts() {
  const contracts: Array<KintsuContract> = []

  for (const contractId of Object.values(ContractIds)) {
    const abi = await import(`@water-cooler-studios/kintsu-contracts/deployments/${contractId}/${contractId}.json`, {
      assert: { type: 'json' }
    })
    const { address, blockNumber } = await import(`@water-cooler-studios/kintsu-contracts/deployments/${contractId}/${process.env.NETWORK}.js`)

    contracts.push({
      name: contractId,
      address: address,
      blockNumber: blockNumber,
      abi: abi
    } as KintsuContract)
  }
  return contracts
}