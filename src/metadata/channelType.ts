export const SpeedFastChannel = ["speedIndiFast", "speedTeamFast"] as const;
export const SpeedFastestChannel = ["speedIndiFastest", "speedTeamFastest"] as const;
export const InfChannel = [
  "speedTeamInfinit",
  "speedIndiInfinit",
  "itemTeamInfinit",
  "itemIndiInfinit",
] as const;
export const ItemFastChannel = [
  "itemNewItemTeamFast2Enchant",
  "itemNewItemIndiFast2Enchant",
  "itemTeamFast",
  "itemIndiFast",
] as const;
export const ItemFastestChannel = [
  "itemNewItemTeamFastest2Enchant",
  "itemNewItemIndiFastest2Enchant",
  "itemTeamFastest",
  "itemIndiFastest",
] as const;
export const CombineChannel = [
  "speedIndiCombine",
  "speedTeamCombine",
  "itemIndiCombine",
  "itemTeamCombine",
] as const;
export const BattleChannel = ["battle"] as const;
export const TierChannel = ["tierMatching_speedTeam", "tierMatching_itemNewItemTeam"] as const;

export type ChannelType =
  | typeof SpeedFastChannel[number]
  | typeof SpeedFastestChannel[number]
  | typeof InfChannel[number]
  | typeof ItemFastChannel[number]
  | typeof ItemFastestChannel[number]
  | typeof CombineChannel[number]
  | typeof BattleChannel[number]
  | typeof TierChannel[number];
