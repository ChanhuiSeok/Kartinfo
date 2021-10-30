const FAST_CH = ["speedIndiFast", "speedTeamFast"] as const;
const FASTEST_CH = ["speedIndiFastest", "speedTeamFastest"] as const;
const INF_CH = ["speedTeamInfinit", "speedIndiInfinit"] as const;
const ITEM_FASTEST_CH = [
  "itemNewItemTeamFastest2Enchant",
  "itemNewItemIndiFastest2Enchant",
] as const;
const ITEM_FAST_CH = [
  "itemNewItemTeamFast2Enchant",
  "itemNewItemIndiFast2Enchant",
] as const;
const COMBINE_CH = [
  "speedIndiCombine",
  "speedTeamCombine",
  "itemIndiCombine",
  "itemTeamCombine",
] as const;
const BATTLE_CH = ["battle"] as const;

export type ChannelType =
  | typeof FAST_CH[number]
  | typeof FASTEST_CH[number]
  | typeof INF_CH[number]
  | typeof ITEM_FASTEST_CH[number]
  | typeof ITEM_FAST_CH[number]
  | typeof COMBINE_CH[number]
  | typeof BATTLE_CH[number];

export {
  FAST_CH,
  FASTEST_CH,
  INF_CH,
  ITEM_FASTEST_CH,
  ITEM_FAST_CH,
  COMBINE_CH,
  BATTLE_CH,
};
