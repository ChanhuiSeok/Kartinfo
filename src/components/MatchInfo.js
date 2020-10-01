import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";

/* 받아온 usrId 값을 가지고 matches 뮤테이션을 실행하여 결과를 그리는 컴포넌트 */

export default ({ id }) => {
  return (
    <>
      <p>{id} 입니다</p>
    </>
  );
};