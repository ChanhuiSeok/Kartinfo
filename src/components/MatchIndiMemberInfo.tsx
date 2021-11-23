import { ApolloError } from "@apollo/client";
import React, { FunctionComponent } from "react";
import styled from "styled-components";
import character from "@/jsonData/character.json";
import kart from "@/jsonData/kart.json";
import { MatchIndiMember } from "@/model";
import { validRank, validSrc, isMine } from "./util";

const Card = styled.div`
  display: flex;
  flex-direction: row;
  width: 1000px;
  border-radius: 0 0 7px 7px;
  margin-bottom: 40px;
  background-color: #ffffff;
  padding: 25px;
  color: black;
  z-index: 99;
  justify-content: center;
  @media (max-width: 1120px) {
    width: 95%;
    padding: 22px;
    flex-wrap: nowrap;
    margin-bottom: 28px;
  }
  @media (max-width: 700px) {
    width: 86%;
    margin-bottom: 28px;
    overflow-x: scroll;
    flex-wrap: nowrap;
    padding: 0 25px 15px 25px;
    justify-content: left;
    overflow-y: hidden;
  }
`;

const MemberCard = styled.div`
  display: flex;
  margin-right: 5px;
  padding: 5px 0 0;
  border-radius: 5px;
  background-color: #efefef;
  max-width: 100px;
  @media (max-width: 1120px) {
    max-width: 90px;
    flex: 0 0 auto;
  }
  @media (max-width: 700px) {
    max-width: 80px;
    flex: 0 0 auto;
  }
`;

const CharacterImg = styled.img`
  position: relative;
  width: 70%;
  z-index: 1;
  margin-left: -3px;
  @media (max-width: 1120px) {
    margin-left: -3px;
  }
  @media (max-width: 700px) {
    margin-left: -2px;
  }
`;

const KartImg = styled.img`
  position: relative;
  width: 55%;
  z-index: 0;
  margin-left: -30px;
  @media (max-width: 1120px) {
    margin-left: -29px;
  }
  @media (max-width: 700px) {
    margin-left: -28px;
  }
`;

const Nickname = styled.p`
  font-size: 13px;
  text-align: center;
  font-weight: 400;
  padding: 5px;
  letter-spacing: -1.5px;
  @media (max-width: 700px) {
    word-break: break-word;
    font-size: 11px;
  }
`;

const RankInfo = styled.p`
  font-size: 14px;
  text-align: center;
  padding: 6px;
  font-weight: 700;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border-radius: 0 0 5px 5px;
  @media (max-width: 700px) {
    font-size: 11px;
  }
`;

interface Props {
  data: MatchIndiMember;
  nickname: string;
  loading: boolean;
  error: ApolloError | undefined;
}

const MatchIndiMemberInfo: FunctionComponent<Props> = (props) => {
  const { data, nickname, loading, error } = props;
  return (
    <>
      {!loading && data.matchIndiMember && (
        <Card>
          {data.matchIndiMember.map((item) => (
            <MemberCard key={item.accountNo} style={isMine(item.characterName, "Indi", nickname)}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "3px",
                }}
              >
                <div style={{ flexDirection: "row" }}>
                  <CharacterImg src={validSrc(character, "character", item.character)}></CharacterImg>
                  <KartImg src={validSrc(kart, "kart", item.kart)}></KartImg>
                </div>
                <Nickname>{item.characterName}</Nickname>
                <RankInfo>{validRank(item.matchRank)}</RankInfo>
              </div>
            </MemberCard>
          ))}
        </Card>
      )}
      {!loading && data.matchIndiMember === null && <Card style={{ color: "gray", fontSize: "12px" }}>{`상세 데이터가 없습니다`}</Card>}
      {error && <h1>데이터를 불러올 수 없습니다.</h1>}
    </>
  );
};

export default MatchIndiMemberInfo;
