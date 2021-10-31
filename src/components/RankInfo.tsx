import React, { FunctionComponent } from "react";
import styled from "styled-components";
import gameType from "../jsonData/gameType.json";
import { findTeamOrIndi } from "./util";
import { RETIRE, TEAM_WIN, TEAM_LOSE } from "../const/game";

interface Props {
  matchRank: string;
  playerCount: number;
  matchType: string;
  matchWin: string;
}

const Rank = styled.div`
  display: flex;
  position: relative;
  height: 130px;
  align-items: center;
  flex-direction: column;
  float: right;
  margin-right: -5px;
  border-radius: 7px;
  width: 95px;
  background-color: #2752a2;
  justify-content: center;
  padding: 7px;
  color: white;

  @media (max-width: 1120px) {
    width: 90px;
    height: 100px;
  }

  @media (max-width: 700px) {
    width: 53px;
    height: 53px;
    margin-right: -13px;
    font-size: 10px;
  }
`;

const WinLoseInfo = styled.p`
  font-size: 15px;
  margin-top: 3px;
  @media (max-width: 700px) {
    margin-top: 1px;
    font-size: 8px;
  }
`;

const RankInfo: FunctionComponent<Props> = ({ matchRank, playerCount, matchType, matchWin }) => {
  let styles: React.CSSProperties = {
    fontStyle: "italic",
    fontWeight: "normal",
  };

  if (matchRank === "1") {
    styles = {
      fontSize: "33px",
      fontWeight: "bold",
      color: "#FFE73C",
    };
  }
  if (matchRank !== "99" && matchRank !== "" && matchRank !== "1") {
    styles = {
      fontSize: "33px",
      fontWeight: "bold",
    };
  }

  const isTeamType = findTeamOrIndi(gameType, matchType) === "Team";
  const teamWinOrLose = matchWin === "1" ? TEAM_WIN : TEAM_LOSE;
  const winOrLoseStyle = matchWin === "1" ? { color: "#FFE73C" } : {};

  return (
    <>
      {(matchRank === "99" || matchRank === "") && (
        <Rank style={{ backgroundColor: "#9A9DA3" }}>
          <span style={styles}>{RETIRE}</span>
          {isTeamType && <WinLoseInfo style={winOrLoseStyle}>{`(${teamWinOrLose})`}</WinLoseInfo>}
        </Rank>
      )}
      {matchRank !== "99" && matchRank !== "" && (
        <Rank>
          <div style={{ flexDirection: "row" }}>
            <span style={styles}>{matchRank}</span> /
            <span style={{ fontSize: "18px" }}>{playerCount}</span>
          </div>
          {isTeamType && <WinLoseInfo style={winOrLoseStyle}>{`(${teamWinOrLose})`}</WinLoseInfo>}
        </Rank>
      )}
    </>
  );
};

export default RankInfo;
