async function getRandomImage() {
  const response = await fetch(
    "https://api-display.wconcept.co.kr/display/api/v1/category/products/M33439436/004",
    {
      headers: {
        accept: "application/json, text/plain, */*",
        "accept-language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
        "content-type": "application/json; charset=UTF-8",
        cust_no: "",
        "display-api-key": "VWmkUPgs6g2fviPZ5JQFQ3pERP4tIXv/J2jppLqSRBk=",
        "sec-ch-ua":
          '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "wck-cust-birthdate": "",
      },
      referrer: "https://display.wconcept.co.kr/",
      referrerPolicy: "strict-origin-when-cross-origin",
      body: '{"custNo":"","gender":"Women","sort":"NEW","pageNo":null,"pageSize":60,"bcds":[],"colors":[],"benefits":[],"discounts":[],"status":["01"],"shopCds":[],"domainType":"m"}',
      method: "POST",
      mode: "cors",
      credentials: "omit",
    }
  );
  const data = await response.json();
  const list = [];
  data.data.productList.content.map((item) => {
    list.push(item.imageUrlMobile);
  });
  return list;
}
fetchData();
function fetchData() {
  axios
    .get("/api/products")
    .then(async (response) => {
      const productList = response.data;
      let htmlString = "";
      const res = await axios.get("/api/categories");
      const idArray = res.data.map((item) => item._id);
      productList.forEach((product, index) => {
        const parser = new DOMParser();
        const optionsDoc = parser.parseFromString(
          retrievedOptionList,
          "text/html"
        );
        const options = optionsDoc.body.children;
        options[idArray.indexOf(product.categoryId)].setAttribute(
          "selected",
          "selected"
        );
        const selectedOptionString = optionsDoc.body.innerHTML;

        htmlString += `
        <li>
        <div class="adminList" style="height:100px;height:450px">
          <div class="check">
            <input type="checkbox" name="checkbox1" id="${
              product._id
            }">&ensp;&nbsp;${index + 1}
          </div>
          <div class="sort" style="display:block;height:450px">
            <input type="text" class ="changeName cate font_17" value="${
              product.name
            }" placeholder="상품명 입력" required >
            <br />
            <select class="changeSelect">${selectedOptionString}</select>
            <br />
            <br />
            <input type="text" class ="changePrice cate font_17" placeholder="가격 입력" required value="${
              product.price
            }">
            <br />
        <img style="width:50%;"  src="${product.image}" alt="alt" />
        <br />
        <p class ="cate font_17">["black", "white", "brown"]</p>
        <br />
        <input type="text" class ="changeStock cate font_17" placeholder="재고 입력" required value="${
          product.stock
        }">
          </div>
          <div class="sortbutton">
            <button class="change col font_17">수정</button>
          </div>
          <div class="infoCont" style="width:100%; padding-top: 0;">
            <h3> </h3>
          </div>
        </div>
        </li>
        `;
      });

      document.getElementById("adminProList").innerHTML = htmlString;
      const changeButton = document.getElementsByClassName("change");
      for (let button of changeButton) {
        button.addEventListener("click", changeFunc);
        console.log("asd");
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

let htmlString2 = "";

async function fetchCategory() {
  try {
    const response = await axios.get("/api/categories");
    let optionList = "";
    response.data.forEach((category) => {
      optionList += `<option value='${category._id}' id='${category._id}'>${category.name}</option>`;
    });
    return optionList;
  } catch (error) {
    throw new Error("Error fetching data:", error);
  }
}

const categoryPromise = fetchCategory();
let retrievedOptionList;
categoryPromise
  .then((optionList) => {
    retrievedOptionList = optionList;
  })
  .catch((error) => {
    console.error("Error:", error);
  });

function addForm() {
  getRandomImage().then((img) => {
    const selectImg = img[Math.floor(Math.random() * img.length)];
    htmlString2 += `
    <div class="adminList" style="height:450px;">
      <div class="check">
        <input type="checkbox" name="checkbox1">&ensp;&nbsp;1
      </div>
      <div  style=" width:30%; height:450px;">
        <input type="text" class ="postName cate font_17" placeholder="상품명 입력" required >
        <br />
        <select>${retrievedOptionList}</select>
        <br /><br />
        <input type="text" class ="postPrice cate font_17" placeholder="가격 입력" required >
        <br />
        <img style="width:50%;"  src="${selectImg}" alt="alt" />
        <br />
        <p class ="cate font_17">["black", "white", "brown"]</p>
        <br />
        <input type="text" class ="postStock cate font_17" placeholder="재고 입력" required >
      </div>
      <div class="sortbutton">
        <button id="regiButton" class="col font_17">등록</button>
      </div>
      <div class="infoCont" style="width:100%; padding-top: 0;">
        <h3> </h3></div>
    </div>`;

    document.getElementById("adminProAdd").innerHTML = htmlString2;
    const regiButton = document.getElementById("regiButton");

    regiButton.addEventListener("click", function () {
      const name = document.querySelector(".postName").value;
      const categoryId = document.querySelector("select").value;
      const stock = document.querySelector(".postStock").value;
      const price = document.querySelector(".postPrice").value;
      const categoryName = document.getElementById(categoryId).textContent;
      axios
        .post("/api/products", {
          name,
          categoryId,
          price,
          image: selectImg,
          option: ["black", "white", "brown"],
          stock,
          categoryName,
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });

      setTimeout(function () {
        location.reload();
      }, 500);
    });
  });
}
const addButton = document.getElementById("addButton");
addButton.addEventListener("click", addForm);

const deleteButton = document.getElementById("deleteButton");
deleteButton.addEventListener("click", function () {
  // 'adminList' 클래스를 가진 요소들을 모두 가져옵니다.
  const adminListItems = document.querySelectorAll(".adminList");

  // 가져온 모든 'adminList' 요소를 순회하면서 체크된 제품를 삭제합니다.
  adminListItems.forEach(function (adminListItem) {
    // 각 'adminList' 요소에서 체크된 제품를 찾습니다.
    const checkbox = adminListItem.querySelector('input[type="checkbox"]');
    if (checkbox.checked) {
      // 체크된 제품의 ID를 가져옵니다.
      const productId = checkbox.id;
      axios
        .delete(`/api/products/${productId}`)
        .then((response) => {
          // 제품 삭제에 성공한 경우 화면에서 해당 제품를 제거
          adminListItem.parentNode.removeChild(adminListItem);
          setTimeout(function () {
            location.reload();
          }, 500);
        })
        .catch((error) => {
          console.error(`제품 ID ${productId} 삭제 요청 실패:`, error);
        });
    }
  });
});

function changeFunc(event) {
  getRandomImage().then((img) => {
    const selectImg = img[Math.floor(Math.random() * img.length)];
    // 클릭된 요소가 수정 버튼인지 확인
    if (event.target.classList.contains("change")) {
      // 수정 버튼이 클릭된 경우, 해당 수정 버튼의 부모 요소를 찾음
      const adminListItem = event.target.closest(".adminList");

      // 부모 요소 내에서 체크박스를 찾음
      const checkbox = adminListItem.querySelector('input[type="checkbox"]');
      const name = document.querySelector(".changeName").value;
      const categoryId = document.querySelector(".changeSelect").value;
      const stock = document.querySelector(".changeStock").value;
      const price = document.querySelector(".changePrice").value;
      const categoryName = document.getElementById(categoryId).textContent;

      // 체크박스가 있는지 확인 후 변수에 할당
      if (checkbox) {
        // 체크박스와 input 텍스트가 모두 있는 경우
        const checkboxId = checkbox.id; // 체크박스의 id 가져오기

        // 원하는 작업 수행
        console.log("체크박스 ID:", checkboxId);
        const putdata = {
          name,
          categoryId,
          price,
          image: selectImg,
          option: ["black", "white", "brown"],
          stock,
          categoryName,
        };
        // 제품를 수정하는 요청을 보냄
        axios
          .put(`/api/products/${checkboxId}`, putdata)
          .then((response) => {
            setTimeout(function () {
              location.reload();
            }, 500);
          })
          .catch((error) => {
            console.error(`제품 ID ${checkboxId} 수정 요청 실패:`, error);
          });
      } else {
        console.error("해당 수정 버튼의 부모 요소에 체크박스가 없습니다.");
      }
    }
  });
}
