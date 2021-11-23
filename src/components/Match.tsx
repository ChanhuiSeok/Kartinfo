import React, { FunctionComponent } from "react";
import styled from "styled-components";
import Slide from "react-reveal/Slide";
import gameType from "@/jsonData/gameType.json";
import track from "@/jsonData/track.json";
import kart from "@/jsonData/kart.json";
import character from "@/jsonData/character.json";
import dayjs from "dayjs";
import { MatchDetail } from "@/model";
import ChannelTag from "@/components/ChannelTag";
import RankInfo from "@/components/RankInfo";
import TimeInfo from "@/components/TimeInfo";
import MatchMember from "@/components/MatchMember";
import { findItems } from "./util";

const Card = styled.div`
  width: 1000px;
  border-radius: 7px 7px 0 0;
  margin-bottom: -5px;
  background-color: white;
  float: left;
  color: black;
  padding: 25px;
  box-shadow: 10px -10px 7px rgba(0, 0, 0, 0.15);
  z-index: 9999;

  @media (max-width: 1120px) {
    width: 95%;
    padding: 22px;
    margin-bottom: -3px;
  }

  @media (max-width: 700px) {
    width: 86%;
    padding: 25px 25px 15px 25px;
    margin-bottom: -2px;
  }
`;

const CardTitle = styled.div`
  width: 390px;
  border-radius: 5px;
  margin-bottom: -2px;
  background-color: #324b7c;
  float: left;
  color: white;
  padding: 8px;
  font-size: 15px;

  @media (max-width: 1120px) {
    width: 390px;
  }

  @media (max-width: 700px) {
    width: 330px;
    font-size: 12.5px;
    font-weight: 600;
  }
`;

const CharacterImg = styled.img`
  position: relative;
  width: 20%;
  z-index: 1;
  margin-left: -40px;
  @media (max-width: 700px) {
    margin-left: -30px;
  }
`;

const TrackImg = styled.img`
  margin-left:16px;
  width:22%;
  onerror='this.src="/unknownTrack.png"';
  @media (max-width: 700px) {
    margin-left: 3px;
  }
`;

const KartImg = styled.img`
  position: relative;
  width: 17%;
  z-index: 0;
  margin-left: -100px;
  @media (max-width: 1120px) {
    margin-left: -60px;
  }
  @media (max-width: 700px) {
    margin-left: -40px;
  }
`;

const MatchList = styled.div`
  position: relative;
  display: inline-block;
  margin-left: 15px;
  vertical-align: top;
  @media (max-width: 700px) {
    margin-top: -5px;
    margin-left: 9px;
  }
`;

const TypeTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 27px;
  font-weight: 700;
  margin: 8px 0 12px;
  @media (max-width: 1120px) {
    margin: 5px 0 5px;
    font-size: 23px;
  }
  @media (max-width: 700px) {
    margin: 0 0 2px;
    font-size: 14px;
  }
`;

const SubTitle = styled.div`
  line-height: 16px;
  letter-spacing: -0.5px;
  word-spacing: -1px;
  font-size: 18px;
  font-weight: 600;
  color: #1b4c7c;
  @media (max-width: 1120px) {
    font-size: 15px;
  }
  @media (max-width: 700px) {
    font-size: 12px;
  }
`;

const StyledSpinner = styled.svg`
  animation: rotate 2s linear infinite;
  margin: -25px 0 0 -25px;
  width: 80px;
  height: 80px;
  & .path {
    stroke: #ffffff;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }
  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;

interface Props {
  posts: MatchDetail[];
  loading: boolean;
  nickname: string;
}

const Match: FunctionComponent<Props> = (props) => {
  const { posts, loading, nickname } = props;

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          minHeight: "600px",
          alignItems: "center",
        }}
      >
        <StyledSpinner viewBox="0 0 50 50">
          <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="4" />{" "}
        </StyledSpinner>
        <p>불러오는 중...</p>
      </div>
    );
  }
  return (
    <>
      {posts.length === 0 && (
        <>
          <Slide left>
            <div style={{ textAlign: "center" }}>
              <img style={{ width: "85%" }} src={"image/unknownRecord.png"} alt=""></img>
            </div>
          </Slide>
        </>
      )}
      {posts.map((post) => (
        <div key={post.matchId}>
          <Slide left>
            <CardTitle>
              {`${dayjs(post.startTime).format("YYYY-MM-DD")} / `}
              <span style={{ color: "#FCD968" }}>{`${findItems(character, post.character, "알 수 없는 캐릭터")} `}</span>
              {`착용 / `}
              <span style={{ color: "#61E9B4" }}>{`${findItems(kart, post.player.kart, "알 수 없는 카트")} `}</span>
              탑승
            </CardTitle>
            <Card>
              <CharacterImg
                onError={(e: any) => {
                  e.target.src = "image/unknownChar.png";
                }}
                src={"image/character/" + post.character + ".png"}
              ></CharacterImg>
              <KartImg
                onError={(e: any) => {
                  e.target.src = "image/unknownKart.png";
                }}
                src={"image/kart/" + post.player.kart + ".png"}
              ></KartImg>
              <TrackImg
                onError={(e: any) => {
                  e.target.src = "image/blankTrack.png";
                }}
                src={"image/track/" + post.trackId + ".png"}
              ></TrackImg>
              <MatchList>
                <TypeTitle>
                  <span>{findItems(gameType, post.matchType, "알 수 없는 타입")}</span>
                  <ChannelTag channelName={post.channelName} />
                </TypeTitle>
                <SubTitle>{findItems(track, post.trackId, "알 수 없는 트랙")}</SubTitle>
                <TimeInfo matchTime={post.player.matchTime} />
              </MatchList>
              <RankInfo matchRank={post.player.matchRank} playerCount={post.playerCount} matchType={post.matchType} matchWin={post.player.matchWin}></RankInfo>
            </Card>
            <MatchMember matchType={post.matchType} matchId={post.matchId} nickname={nickname}></MatchMember>
          </Slide>
        </div>
      ))}
    </>
  );
};

export default Match;
