import {
  SpeedFastChannel,
  SpeedFastestChannel,
  InfChannel,
  ItemFastChannel,
  ItemFastestChannel,
  CombineChannel,
  BattleChannel,
  TierChannel,
  ChannelType,
} from "../metadata/channelType";

function contains<T extends string>(list: ReadonlyArray<T>, value: string): value is T {
  return list.some((item) => item === value);
}

export function findItems(items: Array<any>, target: string, unknownMsg?: string) {
  for (let i in items) {
    if (items[i].id === target) return items[i].name;
  }
  return unknownMsg;
}

export function findTeamOrIndi(items: Array<any>, target: string) {
  for (let i in items) {
    if (items[i].id === target && items[i].name.includes("팀")) {
      return "Team";
    }
    if (items[i].id === target && items[i].name.includes("개인")) {
      return "Indi";
    }
  }
}

export function makeElapsedMin(time: string): number {
  if (time === "") return 0;
  const elapsedSec = parseInt(time) / 1000;
  const elapsedMin = elapsedSec / 60;
  return Math.floor(elapsedMin);
}
export function makeTimeSec(time: string, elapsedMin: number): number {
  if (time === "") return 0;
  const result = parseInt(time) / 1000 - elapsedMin * 60;
  return Math.floor(result);
}
export function makeTimeMSec(time: string, elapsedMin: number): number {
  if (time === "") return 0;
  const result = (parseInt(time) - elapsedMin * 60 * 1000) % 1000;
  return Math.floor(result);
}

export function getChannelName(channelName: ChannelType) {
  // 빠름
  if (contains(SpeedFastChannel, channelName)) {
    return {
      name: "빠름",
      color: "#1789d3",
    };
  }
  // 빠름(아이템)
  if (contains(ItemFastChannel, channelName)) {
    return {
      name: "빠름",
      color: "#3EB5E8",
    };
  }
  // 매우 빠름
  if (contains(SpeedFastestChannel, channelName)) {
    return {
      name: "매우빠름",
      color: "#E15F93",
    };
  }
  // 가장 빠름(아이템)
  if (contains(ItemFastestChannel, channelName)) {
    return {
      name: "가장빠름",
      color: "#C83158",
    };
  }
  // 무한
  if (contains(InfChannel, channelName)) {
    return {
      name: "무한",
      color: "#9644C6",
    };
  }
  // 통합
  if (contains(CombineChannel, channelName)) {
    return {
      name: "통합",
      color: "#8859CC",
    };
  }
  // 아이템 배틀
  if (contains(BattleChannel, channelName)) {
    return {
      name: "배틀",
      color: "#39A199",
    };
  }
  // 등급전
  if (contains(TierChannel, channelName)) {
    return {
      name: "등급전",
      color: "#C949A2",
    };
  }

  return {
    name: "",
    color: "",
  };
}

export function getPageNums(totalPosts: number, postsPerPage: number) {
  const pageNumbers: number[] = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return pageNumbers;
}
