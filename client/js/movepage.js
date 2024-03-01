  const stussyButton = document.getElementById('stussy');
  const supremeButton = document.getElementById('supreme');
  const bareButton = document.getElementById('bare');
  const todButton = document.getElementById('tod');
  const corssButton = document.getElementById('cross');
  const backButton = document.getElementById('back');


  // Stussy 버튼 클릭 시 product 페이지로 이동
  stussyButton.addEventListener('click', function() {
    window.location.href = '/product?categoryName=stussy';
  });

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