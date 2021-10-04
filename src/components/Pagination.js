import React from 'react';
import styled from 'styled-components';

const PageUl = styled.ul`
  float:left;
  list-style: none;
  text-align:center;
  border-radius:3px;
  color:white;
  padding:1px;
  border-top:3px solid #186EAD;
  border-bottom:3px solid #186EAD;
  background-color: rgba( 0, 0, 0, 0.2 );
`;

const PageLi = styled.li`
  display:inline-block;
  font-size:17px;
  font-weight:600;
  padding:5px;
  border-radius:5px;
  width:25px;
  &:hover{
    cursor:pointer;
    color:white;
    background-color:#263A6C;
  }
  &:focus::after{
    color:white;
    background-color:#263A6C;
  }
  @media(max-width:700px){
    padding:3px;
    margin-top:3px;
    margin-bottom:3px;
    font-size:13px;
  }
`;

const PageSpan = styled.span`
  &:hover::after,
  &:focus::after{
    border-radius:100%;
    color:white;
    background-color:#263A6C;
  }
`;

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <>
    {totalPosts !== 0 && 
    <div style={{ textAlign: 'center', marginBottom: '30px' }}>
      <nav style={{ display: 'inline-block' }}>
        <PageUl className="pagination">
          {pageNumbers.map(number => (
            <PageLi onClick={() => paginate(number)} key={number} className="page-item">
              <PageSpan onClick={() => paginate(number)} className="page-link">
                {number}
              </PageSpan>
            </PageLi>
          ))}
        </PageUl>
      </nav>
    </div>
  }
  </>
  );
};

export default Pagination;