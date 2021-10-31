import { gql } from "apollo-boost";
export const GET_MATCHES = gql`
  query getMatchInfo($usrId: String!) {
    matches(usrId: $usrId) {
      matchType
      matches {
        accountNo
        matchId
        matchType
        channelName
        teamId
        character
        startTime
        endTime
        trackId
        playerCount
        player {
          kart
          matchRank
          matchWin
          matchTime
          rankinggrade2
        }
      }
    }
  }
`;

export const GET_MATCH_TEAM_MEMBER = gql`
  query getMatchTeamMember($matchId: String!) {
    matchTeamMember(matchId: $matchId) {
      teamId
      players {
        accountNo
        character
        characterName
        kart
        matchRank
        matchTime
      }
    }
  }
`;

export const GET_MATCH_INDI_MEMBER = gql`
  query getMatchIndiMember($matchId: String!) {
    matchIndiMember(matchId: $matchId) {
      accountNo
      character
      characterName
      kart
      matchRank
      matchTime
    }
  }
`;
