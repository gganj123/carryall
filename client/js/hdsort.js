const supremeButton = document.getElementById('supreme-but');
const stussyButton = document.getElementById('stussy-but');
const bareButton = document.getElementById('bare-but');

supremeButton.addEventListener('click', () => changeCategory('Supreme'));
stussyButton.addEventListener('click', () => changeCategory('Stussy'));
bareButton.addEventListener('click', () => changeCategory('Bare'));

function changeCategory(category) {
  const titles = {
    Supreme: {
      h2: "Supreme Listings",
      h3: "슈프림 상품"
    },
    Stussy: {
      h2: "Stussy Listings",
      h3: "스투시 상품"
    },
    Bare: {
      h2: "Bare Listings",
      h3: "베어 상품"
    }
  };

  const h2Title = titles[category].h2;
  const h3Title = titles[category].h3;

  document.querySelector('.hdsort h2').textContent = h2Title;
  document.querySelector('.hdsort h3').textContent = h3Title;
}