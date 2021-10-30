import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { makeElapsedMin, makeTimeMSec, makeTimeSec } from "./util";

interface Props {
  matchTime: string;
}

const TimeTitle = styled.div`
  vertical-align: bottom;
  font-weight: 300;
  font-size: 15px;
  margin-top: 4em;
  color: #636d78;
  @media (max-width: 1120px) {
    font-size: 14px;
    margin-top: 4em;
  }
  @media (max-width: 950px) {
    font-size: 13px;
    margin-top: 3em;
  }
  @media (max-width: 700px) {
    font-size: 12px;
    margin-top: 1.5em;
  }
  @media (max-width: 500px) {
    font-size: 12px;
    margin-top: 0.8em;
  }
`;

const TimeInfo: FunctionComponent<Props> = ({ matchTime }) => {
  const MINUTES = makeElapsedMin(matchTime);
  const SECONDS = makeTimeSec(matchTime, MINUTES);
  const MSECONDS = makeTimeMSec(matchTime, MINUTES);

  return (
    <TimeTitle>
      <span
        style={{ fontWeight: "bold", color: "#1B4C7C" }}
      >{`주행시간 | `}</span>
      {`${MINUTES}분 ${SECONDS}초 ${MSECONDS}`}
    </TimeTitle>
  );
};

export default TimeInfo;
