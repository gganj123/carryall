function getBrandNameFromURL() {
    // 현재 URL을 가져옴
    var url = window.location.href;
    // URL에서 브랜드명을 추출
    var brand = (url.split('brand=')[1] || '').split('&')[0];
    return brand;
}

// 브랜드명에 따라 h2 텍스트를 업데이트하는 함수
function updateHeaderText() {
    // 브랜드명 가져오기
    var brand = getBrandNameFromURL();
    // h2 엘리먼트 찾기
    var h3Element = document.querySelector('h3');
    // 만약 h2 엘리먼트가 존재하고 브랜드가 'supreme', 'bare', 'stussy' 중 하나라면
    if (h3Element && (brand === 'supreme' || brand === 'bare' || brand === 'stussy')) {
        // h2 텍스트를 브랜드명으로 변경
        h3Element.innerText = brand;
    }
}

// 페이지가 로드되면 실행
window.onload = function() {
    updateHeaderText();
};