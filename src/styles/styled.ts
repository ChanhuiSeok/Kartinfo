import styled, { keyframes } from "styled-components";

const Container = styled.div`
  position: relative;
  margin-top: 240px;
  margin-left: 5%;
  margin-right: 5%;
  @media (max-width: 700px) {
    margin-left: 3%;
    margin-right: 2%;
    margin-top: 150px;
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

const PersonInfo = styled.div`
  margin: 0 auto;
  background-color: #284c7d;
  width: 805px;
  padding: 20px;
  height: 100%;
  border-radius: 10px;
  margin-bottom: 50px;
  overflow: auto;
  border: 3px solid #1f3d73;
  @media (max-width: 700px) {
    padding: 13px;
    margin-bottom: 25px;
    width: 90%;
  }
  @media (max-width: 400px) {
    padding: 13px;
    margin-bottom: 25px;
    width: 320px;
  }
  @media (max-width: 350px) {
    padding: 13px;
    margin-bottom: 25px;
    width: 300px;
  }
`;

const ImgDiv = styled.div`
  background-image: url("image/light.png");
  background-size: cover;
  float: left;
  margin: 0 auto;
  width: 30%;
  height: 100%;
  line-height: 100%;
  text-align: center;
  border-radius: 10px;
  margin-right: 35px;
  @media (max-width: 700px) {
    margin-right: 15px;
  }
`;

const CharacterImg = styled.img`
  padding: 10px;
  position: relative;
  display: block;
  margin-top: 8px;
  margin-left: -10px;
  width: 100%;
  object-fit: contain;
  z-index: 1;
  @media (max-width: 700px) {
    width: 95%;
  }
`;

const MoveGradient = keyframes`
0% {
  background-position: 0% 50%;
}
50% {
  background-position: 100% 50%;
}
100% {
  background-position: 0% 50%;
}
`;

const NickNameDiv = styled.div`
  display: block;
  margin: 0 auto;
  text-align: center;
  padding: 1px;
  background: linear-gradient(45deg, #fc4bed, #2deefb, #2ddf6b, #fef273);
  background-size: 150% 150%;
  border-radius: 10px;
  animation: ${MoveGradient} 2s infinite;
`;

const Nickname = styled.p`
  font-size: 23px;
  font-weight: 600;
  color: white;
  background-color: #102158;
  border-radius: 7px;
  padding: 9px;
  margin: 2px;
  @media (max-width: 700px) {
    padding: 9px;
    font-size: 14px;
  }
`;

const InfoDiv = styled.div`
  width: 65%;
  float: right;
`;

const RankInfo = styled.div`
  display: block;
  margin-bottom: 14px;
  padding: 15px;
  height: 100%;
  border-radius: 10px;
  background-color: #1f345c;
  border-radius: 10px;
  @media (max-width: 700px) {
    padding: 9px;
    margin-bottom: 6px;
  }
`;

const Gradient = keyframes`
0% {
  background-position: 0% 50%;
}
50% {
  background-position: 100% 50%;
}
100% {
  background-position: 0% 50%;
}
`;

const RankInfoRank1 = styled.div`
  display: block;
  margin-bottom: 14px;
  padding: 15px;
  height: 100%;
  border: 1px solid #28a7cf;
  border-radius: 10px;
  background: linear-gradient(45deg, #fe5cbc, #723aff, #3ac3ff, #2ddf6b);
  background-size: 150% 150%;
  border-radius: 10px;
  @media (max-width: 700px) {
    padding: 9px;
    margin-bottom: 6px;
  }
  animation: ${Gradient} 3s ease infinite;
`;

const InfoTitle = styled.span`
  font-size: 22px;
  font-weight: 500;
  @media (max-width: 700px) {
    font-size: 14px;
  }
`;

const InfoValue = styled.span`
  float: right;
  font-size: 22px;
  font-weight: 500;
  color: white;
  @media (max-width: 700px) {
    font-size: 14px;
  }
`;

const TypeInfo = styled.div`
  display: block;
  float: left;
  width: 43%;
  padding: 15px;
  height: 100%;
  border-radius: 10px;
  background-color: #1f345c;
  border-radius: 10px;
  @media (max-width: 700px) {
    width: 39%;
    float: left;
    padding: 9px;
  }
`;

const TypeTitle = styled.span`
  float: left;
  font-size: 22px;
  font-weight: 500;
  @media (max-width: 700px) {
    font-size: 14px;
  }
`;
const TypeTitleTwo = styled.span`
  float: left;
  font-size: 22px;
  font-weight: 500;
  @media (max-width: 700px) {
    display: none;
  }
`;

const TypeValue = styled.span`
  float: right;
  font-size: 22px;
  font-weight: 500;
  color: white;
  @media (max-width: 700px) {
    font-size: 14px;
  }
`;

const DownloadDiv = styled.div`
  text-align: center;
  margin-bottom: 10px;
`;
const DownloadBtn = styled.button`
  color: white;
  background-color: #102158;
  border: 0;
  outline: 0;
  cursor: pointer;
  padding: 6px;
  font-size: 14px;
  font-weight: 700;
  border-radius: 5px;
  @media (max-width: 700px) {
    font-size: 11px;
  }
  &:hover {
    cursor: pointer;
    color: white;
    background-color: #2b559e;
  }
`;

const PersonInfoWrapper = styled.div`
  height: 100%;
`;

export {
  Container,
  StyledSpinner,
  PersonInfo,
  ImgDiv,
  CharacterImg,
  MoveGradient,
  NickNameDiv,
  Nickname,
  InfoDiv,
  RankInfo,
  RankInfoRank1,
  InfoTitle,
  InfoValue,
  TypeInfo,
  TypeTitle,
  TypeTitleTwo,
  TypeValue,
  DownloadBtn,
  DownloadDiv,
  PersonInfoWrapper,
};
