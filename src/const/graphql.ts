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
          pet
          flyingPet
          matchRank
          matchWin
          matchTime
          matchRetired
          rankinggrade2
        }
      }
    }
  }
`;
