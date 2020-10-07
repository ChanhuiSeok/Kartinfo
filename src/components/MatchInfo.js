import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import Match from "../components/Match";
import Pagination from "../components/Pagination";
import { useState, useEffect } from 'react';
import ToggleButton from '../components/ToggleButton'

/* 받아온 usrId 값을 가지고 matches 뮤테이션을 실행하여 결과를 그리는 컴포넌트 */

const Container = styled.div`
  position:relative;
  margin-top:240px;
  margin-left:5%;
  margin-right:5%;
  @media (max-width: 700px) {
    margin-left:3%;
    margin-right:2%;
    margin-top:150px;
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

const GET_MATCHES = gql`
  query getMatchInfo($usrId: String!) {
    matches(usrId: $usrId) {
      matchType
     matches{
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
      player{
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
let usrId = "";


export default ({ id }) => {
  usrId = id;
  const { loading, data, error } = useQuery(GET_MATCHES, {
    variables: { usrId }
  });

  const [posts, setPosts] = useState([]);
  const [loads, setLoads] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [checked, setChecked] = useState(0);
  const handleClick = () => {
    if (checked === 0) {
      setChecked(1);
    }
    else if (checked === 1) {
      setChecked(0);
    }
  }

  useEffect(() => {
    setLoads(true);
    setPosts(data);
    setLoads(false);
  }, [data]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  function currentPosts(num){
    let currentPosts = 0;
    if (typeof data !== "undefined") {
      currentPosts = data.matches[num].matches.slice(indexOfFirstPost, indexOfLastPost);
    }
    return currentPosts;
  }
  

  return (
    <>
      {loading &&
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center', minHeight: '600px', alignItems: 'center'
        }}>
          <StyledSpinner viewBox="0 0 50 50">
            <circle
              className="path"
              cx="25"
              cy="25"
              r="20"
              fill="none"
              strokeWidth="4"
            />{" "}
          </StyledSpinner>
          <p>불러오는 중...</p>
        </div>}
      <Container>
        {data && posts &&
          <>
            <div style={{ position: 'absolute', left: '50' }}>
              <div className="button b2" id="button-16">
                <input type="checkbox" className="checkbox" onChange={handleClick} checked={checked} />
                <div className="knobs">
                  <span></span>
                </div>
                <div className="layer"></div>
              </div>
            </div>
            {checked === 0 && <>
              <Pagination postsPerPage={postsPerPage} totalPosts={data.matches[0]?.matches.length} paginate={paginate} />
              <Match key={data.matches[0]?.matches.matchId} posts={currentPosts(0)} loading={loads} />
              <Match key={data.matches[1]?.matches.matchId} posts={currentPosts(1)} loading={loads} />
            </>
            }
            {checked === 1 && <>
              <Pagination postsPerPage={postsPerPage} totalPosts={data.matches[2]?.matches.length} paginate={paginate} />
              <Match key={data.matches[2]?.matches.matchId} posts={currentPosts(2)} loading={loads} />
              <Match key={data.matches[3]?.matches.matchId} posts={currentPosts(3)} loading={loads} />
            </>
            }
          </>
        }
        {error && <h1>기록을 불러올 수 없습니다.</h1>}
      </Container>
    </>
  );
};
