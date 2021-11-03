import React, { FunctionComponent } from "react";
import { useRef } from "react";
import { useQuery } from "@apollo/react-hooks";
import domtoimage from "dom-to-image";
import Zoom from "react-reveal/Zoom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrophy,
  faMedal,
  faTachometerAlt,
  faGift,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import Match from "../components/Match";
import Pagination from "../components/Pagination";
import ToggleButton from "../components/ToggleButton";
import { Matches } from "./model";
import { usePagination } from "../hooks";
import * as styled from "../styles/styled";
import { GET_MATCHES } from "../const/graphql";
import { saveAs } from "file-saver";

/* 받아온 usrId 값을 가지고 matches 뮤테이션을 실행하여 결과를 그리는 컴포넌트 */
interface Props {
  id: string;
  nickname: string;
}

const MatchInfo: FunctionComponent<Props> = ({ id, nickname }) => {
  const { loading, data, error } = useQuery<Matches>(GET_MATCHES, {
    variables: { usrId: id },
  });

  const postsPerPage = 10;
  const {
    posts,
    loads,
    checked,
    handleClick,
    topRanks,
    getCurrentPosts,
    changePage,
    speedArr,
    itemArr,
  } = usePagination(data, postsPerPage);

  console.log(posts);

  const personInfo = useRef(null);

  // 유저 카드 저장
  const onClick = function () {
    domtoimage.toPng(personInfo.current).then(function (blob) {
      saveAs(blob, "user-card.png");
    });
  };

  return (
    <>
      {loading && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minHeight: "600px",
            alignItems: "center",
          }}
        >
          <styled.StyledSpinner viewBox="0 0 50 50">
            <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="4" />{" "}
          </styled.StyledSpinner>
          <p>캐릭터 정보를 불러오는 중...</p>
        </div>
      )}
      <styled.Container>
        {posts && posts.matches.length !== 0 && (
          <>
            <Zoom left>
              <styled.DownloadDiv>
                <styled.DownloadBtn onClick={onClick}>
                  <FontAwesomeIcon icon={faDownload}></FontAwesomeIcon>
                  <span> 카드 저장</span>
                </styled.DownloadBtn>
              </styled.DownloadDiv>
              <styled.PersonInfoWrapper ref={personInfo}>
                <styled.PersonInfo>
                  <styled.ImgDiv>
                    <styled.CharacterImg
                      onError={(e) => {
                        e.currentTarget.src = "image/unknownChar.png";
                      }}
                      src={"image/character/" + posts.matches[0].matches[0].character + ".png"}
                    ></styled.CharacterImg>
                    <styled.NickNameDiv>
                      <styled.Nickname>{nickname}</styled.Nickname>
                    </styled.NickNameDiv>
                  </styled.ImgDiv>
                  <styled.InfoDiv>
                    <styled.RankInfoRank1>
                      <styled.InfoTitle style={{ color: "#FFEC00" }}>
                        <FontAwesomeIcon icon={faTrophy}></FontAwesomeIcon> 1위 달성
                      </styled.InfoTitle>
                      <styled.InfoValue>{topRanks.rank1}회</styled.InfoValue>
                    </styled.RankInfoRank1>
                    <styled.RankInfo>
                      <styled.InfoTitle style={{ color: "#53E567" }}>
                        <FontAwesomeIcon icon={faMedal}></FontAwesomeIcon> 2위 달성
                      </styled.InfoTitle>
                      <styled.InfoValue>{topRanks.rank2}회</styled.InfoValue>
                    </styled.RankInfo>
                    <styled.RankInfo>
                      <styled.InfoTitle style={{ color: "#5FDFF3 " }}>
                        <FontAwesomeIcon icon={faMedal}></FontAwesomeIcon> 3위 달성
                      </styled.InfoTitle>
                      <styled.InfoValue>{topRanks.rank3}회</styled.InfoValue>
                    </styled.RankInfo>
                    <styled.TypeInfo>
                      <styled.TypeTitle style={{ color: "#FA75E6" }}>
                        <FontAwesomeIcon icon={faTachometerAlt}></FontAwesomeIcon>
                      </styled.TypeTitle>{" "}
                      <styled.TypeTitleTwo>{"\u00A0"}스피드전 </styled.TypeTitleTwo>
                      <styled.TypeValue>
                        <span style={{ color: "#FA75E6" }}>{speedArr.length}</span>회
                      </styled.TypeValue>
                    </styled.TypeInfo>
                    <styled.TypeInfo style={{ float: "right" }}>
                      <styled.TypeTitle style={{ color: "#AA88FF" }}>
                        <FontAwesomeIcon icon={faGift}></FontAwesomeIcon>{" "}
                      </styled.TypeTitle>{" "}
                      <styled.TypeTitleTwo>{"\u00A0"}아이템전 </styled.TypeTitleTwo>
                      <styled.TypeValue>
                        <span style={{ color: "#AA88FF" }}>{itemArr.length}</span>회
                      </styled.TypeValue>
                    </styled.TypeInfo>
                  </styled.InfoDiv>
                </styled.PersonInfo>
              </styled.PersonInfoWrapper>
            </Zoom>
            <ToggleButton onChange={handleClick} checked={checked}></ToggleButton>
            {checked === 0 && (
              <>
                <Pagination
                  postsPerPage={postsPerPage}
                  totalPosts={speedArr.length}
                  paginate={changePage}
                />
                <Match posts={getCurrentPosts(speedArr)} loading={loads} nickname={nickname} />
              </>
            )}
            {checked === 1 && (
              <>
                <Pagination
                  postsPerPage={postsPerPage}
                  totalPosts={itemArr.length}
                  paginate={changePage}
                />
                <Match posts={getCurrentPosts(itemArr)} loading={loads} nickname={nickname} />
              </>
            )}
          </>
        )}
        {posts?.matches.length === 0 && <h1>기록이 존재하지 않습니다.</h1>}
        {error && <h1>기록을 불러올 수 없습니다.</h1>}
      </styled.Container>
    </>
  );
};

export default MatchInfo;
