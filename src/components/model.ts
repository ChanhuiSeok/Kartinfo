import { ChannelType } from "../model";

interface Player {
  kart: string;
  license: string;
  pet: string;
  flyingPet: string;
  partsEngine: string;
  partsHandle: string;
  partsWheel: string;
  partsKit: string;
  matchRank: string;
  matchWin: string;
  matchTime: string;
  matchRetired: string;
  rankinggrade2: string;
}

export interface MatchDetail {
  accountNo: string;
  matchId: string;
  matchType: string;
  teamId: string;
  character: string;
  startTime: string;
  endTime: string;
  playTime: number;
  channelName: ChannelType;
  trackId: string;
  playerCount: number;
  player: Player;
}

interface DetailedPlayer {
  accountNo: string;
  characterName: string;
  character: string;
  kart: string;
  matchRank: string;
  matchTime: string;
}

interface Teams {
  teamId: string;
  players: DetailedPlayer[];
}

export interface MatchTeamMeber {
  matchTeamMember: Teams[];
}

export interface MatchIndiMember {
  matchIndiMember: DetailedPlayer[];
}

export interface Matches {
  matches: MatchInfo[];
}

export interface MatchInfo {
  matchType: string;
  matches: MatchDetail[];
}
