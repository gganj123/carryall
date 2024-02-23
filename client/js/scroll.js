(() => {
    const $ul = document.getElementsByClassName('scroll1')[0];
    let $li = document.getElementsByClassName('scroll2')[0];
    let count = $ul.children.length;
  
    // 1. 인터섹션 옵저버 생성
    const io = new IntersectionObserver((entry, observer) => {
      // 3. 현재 보이는 target 출력
      const ioTarget = entry[0].target;
  
      // 4. viewport에 target이 보이면 하는 일
      if (entry[0].isIntersecting) {
        console.log('현재 보이는 타켓', ioTarget)
        // 5. 현재 보이는 target 감시 취소해줘
        io.unobserve($li);
  
        // 6. 새로운 li 추가해
        $li = $ul.appendChild(document.createElement('li'));
        $li.classList.add('scroll2');
        $li.textContent = ++count;
        // 7. 새로 추가된 li 감시해!
        io.observe($li);
      }
    }, {
      // 8. 타겟이 50% 이상 보이면 해줘!
      threshold: 0.5
    });
  
    // 2. li감시해!
    io.observe($li);
  
  })();