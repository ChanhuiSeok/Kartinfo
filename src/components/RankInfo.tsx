import React, { FunctionComponent } from "react";
import styled from "styled-components";

interface Props {
  matchRank: string;
  playerCount: number;
}

const Rank = styled.div`
  position: relative;
  height: 130px;
  float: right;
  margin-right: -5px;
  border-radius: 7px;
  width: 95px;
  text-align: center;
  background-color: #2752a2;
  padding: 7px;
  color: white;
  line-height: 110px;

  @media (max-width: 1120px) {
    width: 90px;
    height: 100px;
    line-height: 80px;
  }

  @media (max-width: 700px) {
    width: 53px;
    height: 45px;
    line-height: 40px;
    margin-right: -13px;
    font-size: 10px;
  }
`;

const RankInfo: FunctionComponent<Props> = ({ matchRank, playerCount }) => {
  let styles: React.CSSProperties = {
    fontStyle: "italic",
    fontWeight: "normal",
  };

  if (matchRank === "1") {
    styles = {
      fontSize: "35px",
      fontWeight: "bold",
      color: "#FFE73C",
    };
  }
  if (matchRank !== "99" && matchRank !== "" && matchRank !== "1") {
    styles = {
      fontSize: "35px",
      fontWeight: "bold",
    };
  }

  return (
    <>
      {(matchRank === "99" || matchRank === "") && (
        <Rank style={{ backgroundColor: "#C4CAD4" }}>
          <span style={styles}>리타이어</span>
        </Rank>
      )}
      {matchRank !== "99" && matchRank !== "" && (
        <Rank>
          <span style={styles}>{matchRank}</span>/
          <span style={{ fontSize: "20px" }}>{playerCount}</span>
        </Rank>
      )}
    </>
  );
};

export default RankInfo;
