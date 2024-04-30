export type Analytics = {
  totalShares: string
  mintedShares: string
  virtualShares: string
  totalPooled: string
  timestamp: number
  block: number
}


export type AnalyticsChange = {
  changeInMintedShares: string
  virtualShares: string
  changeInTotalPooled: string
  timestamp: number
  block: number,
  arithmeticType: ArithmeticType
}

export const enum ArithmeticType {
  Add = "ADD",
  Sub = "SUB"
}