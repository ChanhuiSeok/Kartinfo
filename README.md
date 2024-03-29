# KartInfo

<img src="./public/title.png" >

* 🔑 GraphQL로 래핑한 카트라이더 오픈API를 활용하여 유저 정보 조회 웹페이지 제작
* 🔗 **웹페이지 링크** : https://kartinfoweb.herokuapp.com/

### 💻 일반 화면
<img src = "https://i.imgur.com/svTm3pQ.png">
<img src = "https://i.imgur.com/kDBPIGe.png">

### 📱 모바일 화면
<img src = "https://i.imgur.com/voucOVR.png">

### ⭐ 사용한 API
* 카트라이더 오픈 API : https://developers.nexon.com/kart
* 카트라이더 오픈 API with GraphQL : https://github.com/ChanhuiSeok/kartAPI-Graphql

### 🚀 기술스택
* React, GraphQL, Apollo, webpack 사용
* heroku deploy
* 자세한 구현법은 추후 포스팅할 예정입니다

### 🎯 TODO
* 다양한 게임 모드를 구분해서 보여 주기(스피드/아이템) **(완료)**
* 데이터를 최대로 불러오고 react hook(useState, useEffect)으로 페이지네이션 구현하기 **(완료)**
* 게임 데이터에서 등수를 취합해서 분석 데이터 보여주기 **(완료)**

### 🎯 코드 리팩토링(필수)
* 전체적으로 수정이 필요함
* 타입스크립트로 전환하기 (완료)
* 목적에 맞게 파일 분리하기
* 함수 및 선언부 다시 리팩토링 (완료)
* 컴포넌트 리팩토링
