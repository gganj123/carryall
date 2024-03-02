# 👜 Carryall

가방 구매 서비스를 보다 편리하고 접근하기 쉽게 만들어보자!

<br/>

## 💻 프로젝트 기간

24.02.19(월요일) ~ 24.03.01(금요일)

<br/>

## 👩‍💻👨‍💻 프로젝트 팀원

### ✨ FE
#### 김은지(총괄 팀장)<br/>
#### 김도현<br/>
#### 라수빈<br/>
#### 한새환<br/>

### 💻 BE
#### 주현정(백엔드 팀장)<br/>
#### 박유신<br/>
#### 한지은<br/>

<br/>

## 🪄 기술 스택 및 도구

### 💻프론트엔드
#### HTML
#### CSS
#### JavaScript

### ⚙️백엔드
#### EXPRESS
#### MongoDB
#### MONGOOSE
#### SESSION

### 📑기획 및 배포
#### FIGMA
#### gitlab
#### Notion

<br/>

## 🗃️와이어프레임🗃️
 [FIGMA](https://www.figma.com/file/RzbABzzZr18FYZvlkJMub6/Team_06_Wireframe?type=design&node-id=0-1&mode=design&t=FGcT0APlpeZWhsc6-0)<br/>
 
 <br/>

## 📌주요 화면 구성📌

- 공통
  - HEADER, SIDEBAR, FOOTER
- 메인 페이지
- 상품 페이지
  - 상품 리스트
  - 상품 상세
- 로그인, 로그아웃, 회원가입
- 유저 페이지
  - 회원정보 수정
  - 비밀번호 변경
  - 주문, 배송 조회
  - 장바구니, 주문, 결제
  - 회원 탈퇴
- 관리자 페이지 
  - 상품 목록 조회, 등록, 수정
  - 카테고리 등록, 수정
  - 주문, 배송 수정

<br/>

## ✔️기능 구현 사항✔️

- 사용자 관련 기능
  - ✅ 회원가입 - 회원가입 폼의 입력 값이 조건에 안 맞을 시 (이메일 형식, 비밀번호와 비밀번호확인의 일치 여부 등) 이를 사용자에게 알려준다.</br>
  - ✅ 회원가입 - 조건에 맞게 입력 후 제출 버튼을 누를 시, 백엔드 서버와 연결되어 회원가입 정보가 db에 저장된다.
  - [ ] 로그인 - 로그인 폼의 입력 값이 조건에 안 맞을 시 (이메일 형식이 안 맞거나, 비밀번호가 틀리거나 등) 이를 사용자에게 알려준다.
  - [ ] 로그인 - db에 저장된 정보로 로그인 성공 시, JWT 토큰이 프론트 단(sessionStorage, localStorage 등)에 저장되고, 다른 페이지(랜딩페이지, 상품페이지 등)로 이동한다.
  - [ ] 로그아웃 - 로그아웃 시, 프론트 단에 저장되어 있던 JWT토큰이 제거된다.
  - [ ] 사용자 정보 조회 - 사용자는 개인 페이지에서 자신의 회원 정보를 조회할 수 있다.
  - [ ] 사용자 정보 수정 - 사용자는 개인 페이지에서 자신의 회원 정보를 수정할 수 있다.
  - [ ] 사용자 정보 삭제 - 사용자는 개인 페이지에서 자신의 회원 정보를 삭제(탈퇴)할 수 있다.
  - [ ] 관리자 기능 - 관리자 계정이 존재하며, 일반 사용자 계정과 구분된다.
  - [ ] 사용자 정보 - db에 사용자의 이메일, 이름, 비밀번호(해쉬화된 문자열), 주소를 저장할 수 있다.
- 상품(제품) 관련 기능
  - [ ] 카테고리 조회 - 사용자가 카테고리 목록을 화면에서 확인할 수 있다.
  - [ ] 카테고리 추가 - 관리자는 관리자 페이지에서, 상품이 속할 카테고리를 추가할 수 있다.
  - [ ] 카테고리 수정 - 관리자는 관리자 페이지에서, 상품이 속할 카테고리 관련 데이터 (카테고리 이름 등)를 수정할 수 있다.
  - [ ] 카테고리 삭제 - 관리자는 관리자 페이지에서, 상품이 속할 카테고리 관련 데이터를 삭제할 수 있다.
  - [ ] 상품 추가 - 관리자는 관리자 페이지에서 상품을 추가할 수 있다.
  - [ ] 상품 수정 - 관리자는 관리자 페이지에서 상품 관련 데이터를 수정할 수 있다.
  - [ ] 상품 삭제 - 관리자는 관리자 페이지에서 상품 관련 데이터를 삭제할 수 있다.
  - [ ] 상품 정보 - 상품은 특정 카테고리에 속해 있다.
  - [ ] 상품 목록 - 사용자가 특정 카테고리를 선택할 시, 해당 카테고리에 속한 상품 목록이 화면에 나타난다.
  - [ ] 상품 상세 - 사용자가 특정 상품을 선택할 시, 해당 상품의 상세 정보가 화면에 나타난다.
  - [ ] 상품 정보 - db에 상품의 이름, 가격, 설명, 제조사를 저장할 수 있다.
- 장바구니 관련 기능
  - [ ] 장바구니 관련 데이터는 백엔드 데이터베이스가 아닌, 프론트단(localStorage, sessionStorage, indexedDB 등)에서 관리된다.
  - [ ] 프론트 단에, 장바구니에 속한 상품 관련 데이터가 저장되어서, 페이지를 새로고침해도 장바구니에 상품들이 그대로 남아 있다.
  - [ ] 장바구니 추가 - 사용자는 상품을 장바구니에 추가할 수 있다.
  - [ ] 장바구니 수정 - 사용자는 장바구니에 속한 상품의 수량을 수정할 수 있다.
  - [ ] 장바구니 전체 삭제 - 사용자는 장바구니에서, 버튼 1번의 클릭으로, 장바구니 상의 전체 상품을 제거할 수 있다.
  - [ ] 장바구니 부분 삭제 - 사용자는 장바구니에서, 일부 상품을 골라서 제거할 수 있다.
  - [ ] 장바구니 조회 - 사용자는 장바구니에 담긴 상품 목록을 확인할 수 있다.
  - [ ] 장바구니 가격 조회 - 사용자는 장바구니에 담긴 상품들의 총 가격을 확인할 수 있다.
- 주문 관련 기능
  - [ ] 주문 추가 - 사용자는 장바구니에 속한 상품의 수량을 변경할 수 있다.
  - [ ] 주문 수정 - 관리자는 사용자의 주문 내역에서 배송 상태를 수정할 수 있다.
  - [ ] 주문 수정 - 사용자는 주문 완료 후 배송이 시작되기 전까지 주문 정보를 수정할 수 있다.
  - [ ] 주문 완료 - 주문 완료 시, 주문 완료 페이지로 이동한다.
  - [ ] 주문 조회 - 사용자는 개인 페이지에서 자신의 주문 내역을 조회할 수 있다.
  - [ ] 주문 조회 - 관리자는 관리 페이지에서 사용자들의 주문 내역을 조회할 수 있다.
  - [ ] 주문 취소 - 사용자는 개인 페이지에서 자신의 주문 내역을 취소할 수 있다.
  - [ ] 주문 삭제 - 관리자는 관리 페이지에서 사용자들의 주문 내역을 삭제할 수 있다.
  - [ ] 주문 정보 - db에 배송 상태가 저장된다.
  - [ ] 주문 정보 - db에 배송지 정보, 주문 총액, 수령자 이름 및 연락처가 저장된다.
<br/>

## ❓사용법❓

### ➕로컬에서 사용하기

1. 리포지토리 클론
```bash
git clone https://kdt-gitlab.elice.io/sw_track/class_07/web_project/team06/daladala.git
```

2. 패키지 설치
```bash
npm i
```

3. 환경변수 설정
  - 생성된 .env파일에 배포할 포트 번호와 Mongo DB URL을 입력
``` bash
cp .env.sample .env
```

4. 실행
``` bash
npm run dev
```

### ➕배포 서버에서 사용하기
```bash
// 사이트 주소
http://kdt-sw-7-team06.elicecoding.com/
http://kdt-sw-7-team06.elicecoding.com/api-docs -> API 문서

// 관리자 계정
ID: admin1@admin1.com
PW: adminAdmin1!

// 일반 계정
ID: user1@user1.com
PW: user1User1!
```


