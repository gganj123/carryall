document.addEventListener("DOMContentLoaded", function() {
    var footerElement = document.getElementById("footer");
    footerElement.innerHTML = `
        <div class="contBox" style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; padding: 30px 0">
          <div class="content_wrap" style="width: 95%; height: 100%;">
            <div class="content"><h1 class="logo" style="color:white; margin-top: 10px; margin-left: 30px;">CARRYALL</h1></div>
            <div class="content" style="color:white; margin-top: 10px; display: flex; justify-content: flex-end;">
              <button class="footmenu">이용약관</button>
              <button class="footmenu">개인정보처리방침</button>
              <button class="footmenu">이용안내</button>
              <button class="footmenu">입점 / 제휴안내</button>
            </div>
            <div class="content" style="color:white; font-weight:normal; margin-left: 20px;">
              대표자 : 6팀 &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; 서울 성동구 아차산로 17길 48 성수낙낙 2층 엘리스랩 성수점<br>
              사업자등록번호 : 123-45-67890 &emsp;&emsp; 통신판매업신고번호 : 제2017-대전유성-0009호 <br>  
              개인정보처리담당자 : 엘리스 &nbsp;&emsp;&emsp;&emsp;  대표번호 : 070-4633-2017       이메일 : kdp@elice.io
              <div style="color:white; position: absolute; bottom: 30px; font-size: 15px;">
                저작권.2024 엘리스랩. 판권 소유.
              </div>
            </div>
            <div class="content" style="color:white;">
              <div style="display: flex; flex-wrap: wrap; justify-content: flex-end; margin-left: 25px;">
                <div style="width:30%; color: white;">
                  엘리스랩 고객만족센터<br>
                  070-4633-2017<br>
                  평일 오전 9시~5시  /  토, 일, 공휴일 휴무
                </div>
                <div style="width:50%; color: white;">
                  입금계좌안내<br>
                  000-012345-12-123<br>
                  IBK 기업은행 예금주 : 엘리스랩 성수점
                </div>
              </div>
            </div>
          </div>
        </div>
    `;
});