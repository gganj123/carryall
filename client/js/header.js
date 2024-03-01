document.addEventListener("DOMContentLoaded", function() {
  // axios 라이브러리 추가
  var script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js';
  document.head.appendChild(script);

  var headerElement = document.getElementById("header");
  headerElement.innerHTML = `
    <div class="header"></div>
    <div class="header" style="background-color: #fafafa; display: flex; justify-content: center; align-items: center;">
        <button class="logoButton">
            <h1 class="logo slideDown" style="color:black"><a href="/">CARRYALL</a></h1>
        </button>
        <input class="headInput" type="text" placeholder="검색">
        <button class="headmenu"><a href="/cart">장바구니</a></button>
        <button class="headmenu login"><a href="/loginMember">로그인</a></button>
        <button class="headmenu logout"><a href="/logout">로그아웃</a></button>
        <button class="headmenu mypage"><a href="/mypage">마이페이지</a></button>
        <button class="headmenu admin" style="display: none;"><a href="/admin">관리자 페이지</a></button>
        <button class="headmenu"><a href="/join">회원가입</a></button>
    </div>`;


  // 로그아웃 버튼 클릭 시 처리
  document.querySelector('.headmenu.logout').addEventListener('click', function(event) {
    event.preventDefault();
    document.querySelector('.headmenu.mypage').classList.add('none');
    document.querySelector('.headmenu.logout').classList.add('none');
    axios.post('/api/logout')
      .then(response => {
        // 로그아웃 성공 시 로컬 스토리지 비우고 페이지 새로고침
        // localStorage.clear();
        console.log('로그아웃 성공:', response.data);
        window.location.reload();

      })
      .catch(error => {
        console.error('로그아웃 중 오류 발생:', error);
      });
  });

  // 로그인 여부에 따라 로그인 버튼 보이기/숨기기
  var cookies = document.cookie.split(';');
  var isLoggedIn = cookies.some(cookie => cookie.trim().startsWith('connect.sid'));
  if (isLoggedIn) {
    console.log('로그인 됐어요!');
  } else {
    console.log('로그아웃 상태임!');
  }
});