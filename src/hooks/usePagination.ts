import { useState, useEffect } from "react";
import { MatchDetail, Matches } from "@/model";
import { speed, item } from "@/metadata/trackType";

export function usePagination(data: Matches | undefined, postsPerPage: number) {
  const [posts, setPosts] = useState<Matches>();
  const [loads, setLoads] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [checked, setChecked] = useState(0);

  useEffect(() => {
    setLoads(true);
    setPosts(data);
    setLoads(false);
  }, [data]);

  const handleClick = () => {
    if (checked === 0) {
      setCurrentPage(1);
      setChecked(1);
    } else if (checked === 1) {
      setCurrentPage(1);
      setChecked(0);
    }
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  // Change page
  const changePage = (pageNumber: number) => setCurrentPage(pageNumber);

  // 스피드전 저장
  let speedArr: MatchDetail[] = [];
  // 아이템전 저장
  let itemArr: MatchDetail[] = [];
  let topRanks = {
    rank1: 0,
    rank2: 0,
    rank3: 0,
  };

  function getCurrentPosts(tmp: MatchDetail[]) {
    let currentPosts: MatchDetail[];
    currentPosts = tmp.slice(indexOfFirstPost, indexOfLastPost);
    return currentPosts;
  }

  // 1등 횟수 저장
  if (typeof data !== "undefined") {
    for (var l in data.matches) {
      for (var m in data.matches[l].matches) {
        if (data.matches[l].matches[m].player.matchRank === "1") {
          topRanks.rank1 += 1;
        } else if (data.matches[l].matches[m].player.matchRank === "2") {
          topRanks.rank2 += 1;
        } else if (data.matches[l].matches[m].player.matchRank === "3") {
          topRanks.rank3 += 1;
        }
      }
    }
  }

  if (typeof data !== "undefined") {
    for (var i in data.matches) {
      for (var j in data.matches[i].matches) {
        for (var prop in speed) {
          if (speed[prop] === data.matches[i].matches[j].matchType) {
            speedArr.push(data.matches[i].matches[j]);
            break;
          }
        }
        for (var prop2 in item) {
          if (item[prop2] === data.matches[i].matches[j].matchType) {
            itemArr.push(data.matches[i].matches[j]);
            break;
          }
        }
      }
    }
  }
  // 정렬
  speedArr.sort((a, b) => (Date.parse(a.startTime) < Date.parse(b.startTime) ? 1 : -1));
  itemArr.sort((a, b) => (Date.parse(a.startTime) < Date.parse(b.startTime) ? 1 : -1));

  return {
    posts,
    loads,
    checked,
    handleClick,
    topRanks,
    changePage,
    getCurrentPosts,
    speedArr,
    itemArr,
  };
}
