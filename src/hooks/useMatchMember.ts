import { useQuery } from "@apollo/react-hooks";
import { GET_MATCH_INDI_MEMBER, GET_MATCH_TEAM_MEMBER } from "@/const/graphql";
import { MatchTeamMember, MatchIndiMember } from "@/model";

export function useMatchMember(isTeam: boolean, matchId: string) {
  // 팀전
  if (isTeam) {
    const { loading, data, error } = useQuery<MatchTeamMember>(GET_MATCH_TEAM_MEMBER, {
      variables: { matchId: matchId },
    });

    return {
      loading,
      data,
      error,
    };
  }

  // 개인전
  const { loading, data, error } = useQuery<MatchIndiMember>(GET_MATCH_INDI_MEMBER, {
    variables: { matchId: matchId },
  });

  return {
    loading,
    data,
    error,
  };
}
