const stussyButton = document.querySelector('.stussy');
const supremeButton = document.querySelector('.supreme');
const bareButton = document.querySelector('.bare');

// 메인 페이지에서 제품 페이지로 이동하는 버튼 클릭 시
stussyButton.addEventListener('click', function() {
    window.location.href = '/product?brand=stussy';
});

supremeButton.addEventListener('click', function() {
    window.location.href = '/product?brand=supreme';
});

bareButton.addEventListener('click', function() {
    window.location.href = '/product?brand=bare';
});

