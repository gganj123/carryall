  const stussyButton = document.getElementById('stussy');
  const supremeButton = document.getElementById('supreme');
  const bareButton = document.getElementById('bare');

  // Stussy 버튼 클릭 시 product 페이지로 이동
  stussyButton.addEventListener('click', function() {
    window.location.href = '/product?brand=stussy';
  });

  // Supreme 버튼 클릭 시 product 페이지로 이동
  supremeButton.addEventListener('click', function() {
    window.location.href = '/product?brand=supreme';
  });

  // Bare 버튼 클릭 시 product 페이지로 이동
  bareButton.addEventListener('click', function() {
    window.location.href = '/product?brand=bare';
  });