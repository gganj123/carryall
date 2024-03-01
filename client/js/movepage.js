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

<<<<<<< HEAD
bareButton.addEventListener('click', function() {
    window.location.href = '/product?brand=bare';
});

=======
  // Supreme 버튼 클릭 시 product 페이지로 이동
  supremeButton.addEventListener('click', function() {
    window.location.href = '/product?categoryName=supreme';
  });

  // Bare 버튼 클릭 시 product 페이지로 이동
  bareButton.addEventListener('click', function() {
    window.location.href = '/product?categoryName=bare';;
  });

  todButton.addEventListener('click', function() {
    window.location.href = '/product?categoryId=65df755367457938cc02e40b';
  });

  // Supreme 버튼 클릭 시 product 페이지로 이동
  corssButton.addEventListener('click', function() {
    window.location.href = '/product?categoryId=65df752e67457938cc02e405';
  });

  // Bare 버튼 클릭 시 product 페이지로 이동
  backButton.addEventListener('click', function() {
    window.location.href = '/product?categoryId=65df753a67457938cc02e408';
  });
>>>>>>> 07b7479805c9a1fea711ac3cf530286a19d5a1bf
