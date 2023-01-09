window.onload = function () {
  const $section = $('.section');
  const home = document.querySelector('#home');
  const concept = document.querySelector('#concept');
  const place = document.querySelector('#location');
  const festival = document.querySelector('#event');
  const notice = document.querySelector('#notice');


  //scrollY value default
  setTimeout(function () {
    scrollTo(0, 0);
  }, 100);
  $('#nav li').eq(0).addClass('active');


  //nav changes by scroll
  const navChange = () => { 
    let scrollY = window.scrollY;

    //console.log(scrollY)

    $.each($section, function (inx) { 
      const targetInx = $section.eq(inx);
      const targetTop = targetInx.offset().top;

      //console.log(targetInx);

      if (scrollY >= targetTop - 20) { 
        $('#nav li').removeClass('active')
        $('#nav li').eq(inx).addClass('active');
      }
    })
  }


  // home txt, bg changes by scroll
  const homeScrollPrx = new IntersectionObserver((entries) => {
    const homeTxt = $('.home-txt')
    const homeH1 = $('.home-top h1');
    const homeP = $('.home-top p')

    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        homeTxt.css({ 'background-color': 'rgba(0,0,0,0.8)' });
        homeH1.css({ 'opacity': 0 });
        homeP.css({ 'opacity': 0 });
      }
      else {
        homeTxt.css({ 'background-color': 'rgba(0,0,0,0)' });
        homeH1.css({ 'opacity': 1 });
        homeP.css({ 'opacity': 1 });
      }
    });
  });
  const homeBtm = home.querySelector('.home-btm .desc');
  homeScrollPrx.observe(homeBtm);


  // concept imgs animation effect by scroll
  const conceptScrollPrx = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('img').forEach((ele, inx) => {
          inx += 1;

          ele.style.opacity = inx * 1;
          ele.style.animationDelay = inx * 0.4 + 's';
          ele.classList.add('active');
        })
      }
      else {
        entry.target.querySelectorAll('img').forEach((ele) => {
          ele.classList.remove('active');
        })
      }
    })
  })
  const conceptBg = concept.querySelectorAll('.imgs');
  conceptBg.forEach((ele) => {
    conceptScrollPrx.observe(ele);
  });


  //location lamp imgs move by scroll
  const lampScrollPrx = () => {
    const lamp = $('.lamp');
    const bg1Desc = $('.bg1 .desc');
    const bgHeight = place.querySelector('.bg1').clientHeight;
    const lampScrollY = Math.round(place.getBoundingClientRect().y);
    const total = bgHeight - (lampScrollY / 1.3)
    
    if (lampScrollY < bgHeight / 2) {
      lamp.css({
        'transform': 'translate(-50%, -' + total + 'px)'
      });
      bg1Desc.css({
        'opacity': 1 - (lampScrollY / 100)
      })
    }
  }


  // location umbrella imgs move by scroll
  const umbrellaPrx = () => {
    const bg3 = place.querySelector('.bg3');
    const bg3Height = bg3.clientHeight;
    const bg3Scroll = bg3.getBoundingClientRect().y;

    if (bg3Scroll < bg3Height - bg3Height / 4) {
      bg3.querySelectorAll('.umbrella').forEach((ele) => {
        ele.classList.add('active');
      })
    }
    else if (bg3Scroll > bg3Height) {
      bg3.querySelectorAll('.umbrella').forEach((ele) => {
        ele.classList.remove('active');
      })
    }
  }


  // Menu shows by scroll
  const menuPrx = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('view')
      }
      else {
        entry.target.classList.remove('view')
      }
    })
  });
  const menuList = document.querySelectorAll('.menu-wrap > li');
  menuList.forEach((ele) => menuPrx.observe(ele));
  

  //pictures swiper effect
  const swiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    loop: true,
    speed: 600,
    autoplay: {
      delay: 3000,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });


  // event mic moves by scroll
  const festivalPrx = () => {
    const festivalHeight = festival.clientHeight;
    const festivalScrollY = festival.getBoundingClientRect().y * 0.7;

    festival.querySelector('.event-mic-img').style.transform = 'translateX(-' + festivalScrollY + 'px)'

    if (festivalScrollY < festivalHeight / 2) {
      festival.querySelector('.title').style.textShadow = '-60px 6px 10px rgba(0,0,0,.6)'
      festival.querySelector('p').style.textShadow = '-60px 6px 10px rgba(0,0,0,.6)'
    }
    else { 
      festival.querySelector('.title').style.textShadow = '0 0 0 rgba(0,0,0,0)'
      festival.querySelector('p').style.textShadow = '0 0 0 rgba(0,0,0,0)'
    }
  }


  // notice imgs move by scroll  
  const noticePrx = () => {
    const noticeScroll = notice.getBoundingClientRect().y;
    const noticeHeight = notice.clientHeight;
    const imgs = notice.querySelectorAll('img');
    const totalY = noticeScroll / 2;

    if (noticeScroll <= noticeHeight) {
      imgs.forEach((ele, inx) => {
        ele.style.transform = 'translateY(' + totalY + 'px)'
        ele.style.transition = inx * 0.2 + 's'
      })
    }
  }
  

  //home mouse event
  $('#home').on('mousemove', function (e) {
    let mouseX = e.pageX;
    let mouseY = e.pageY;

    $('.home-behind').css({
      'transform': 'scale(1.3) translate(-' + mouseX / 50 + 'px , -' + mouseY / 50 + 'px)'
    });
    $('.home-lamp').css({
      'transform': 'scale(1.2) translate(-' + mouseX / 25 + 'px , -' + mouseY / 20 + 'px)'
    });
  });


  //scroll event
  $(window).on('scroll wheel touch', function () {
    navChange();

    conceptBg.forEach((ele) => {
      conceptScrollPrx.observe(ele);
    });

    lampScrollPrx();
    umbrellaPrx();
    festivalPrx();
    noticePrx();
  });
};