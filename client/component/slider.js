// 4) Click Image Slider
document.querySelector('.right-arrow').onclick = function () {
    var currentSlide = document.querySelector('#photo .slide.active');
    var nextSlide = currentSlide.nextElementSibling;
    if (nextSlide === null) {
      nextSlide = currentSlide.parentElement.firstElementChild;
    }
    currentSlide.animate(
      {
        opacity: [1, 0],
      },
      {
        duration: 500,
        easing: 'ease',
        iterations: 1,
        fill: 'both',
      },
    );
    currentSlide.classList.remove('active');
    nextSlide.animate(
      {
        opacity: [0, 1],
      },
      {
        duration: 500,
        easing: 'ease',
        iterations: 1,
        fill: 'both',
      },
    );
    nextSlide.classList.add('active');
  };
  
  //왼쪽 이미지 슬라이드 기능 구현
  
  document.querySelector('.left-arrow').onclick = function () {
    var currentSlide = document.querySelector('#photo .slide.active');
    var previousSlide = currentSlide.previousElementSibling;
    if (previousSlide === null) {
      previousSlide = currentSlide.parentElement.lastElementChild;
    }
    currentSlide.animate(
      {
        opacity: [1, 0],
      },
      {
        duration: 500,
        easing: 'ease',
        iterations: 1,
        fill: 'both',
      },
    );
    currentSlide.classList.remove('active');
    previousSlide.animate(
      {
        opacity: [0, 1],
      },
      {
        duration: 500,
        easing: 'ease',
        iterations: 1,
        fill: 'both',
      },
    );
    previousSlide.classList.add('active');
  };
  
  