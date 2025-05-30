# Node.js 게시판 웹 애플리케이션

## 프로젝트 개요

Express.js, React, MongoDB를 기반으로 한 게시판 웹 애플리케이션입니다.

## 기술 스택
| 영역        | 기술 |
|-------------|------|
| **Frontend** | React |
| **Backend**  | Node.js, Express.js |
| **Database** | MongoDB |
| **Auth**     | JWT, OAuth2 (Google, Kakao) |
| **환경**     | Docker, GitHub |

---

## 주요 기능

### 사용자 기능
- 회원가입 / 로그인 / 로그아웃
- Google, Kakao, Github 소셜 로그인 (OAuth2)

---

### 게시판 기능
- 게시글 목록 / 검색 / 상세보기
- 게시글 작성 / 수정 / 삭제
- 첨부파일 업로드 및 다운로드

---

### 댓글 기능
- 댓글 작성 / 수정 / 삭제

---

## .env 
### 도커 환경 구동 전에 프로젝트 루트(/board)에 .env 파일 생성
- GOOGLE_CLIENT_ID=개인 구글 클라이언트 ID
- GOOGLE_CLIENT_SECRET=구글 비밀키
- KAKAO_CLIENT_ID=카카오 클라이언트 ID
- GITHUB_CLIENT_ID=깃허브 클라이언트 ID
- GITHUB_CLIENT_SECRET=깃허브 비밀키
- JWT_SECRET=JWT 비밀키
- MONGO_URL=mongodb://mongo:27017/board

---

## 실행 방법
- git clone https://github.com/SimHH/board-project.git
- cd board
- docker-compose up --build
