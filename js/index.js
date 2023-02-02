document.addEventListener("DOMContentLoaded", function(){
  const $section = $('.section');
  const home = document.querySelector('#home');
  const concept = document.querySelector('#concept');
  const place = document.querySelector('#location');
  const team = document.querySelector('#team');
  const festival = document.querySelector('#event');
  const notice = document.querySelector('#notice');
  const footer = document.querySelector('footer');

  //scrollY value default
  setTimeout(function () {
    scrollTo(0, 0);
  }, 100);
  $('#nav li').eq(0).addClass('active');

  //nav changes by scroll
  const navChange = () => { 
    let scrollY = window.scrollY;

    $.each($section, function (inx) { 
      const targetInx = $section.eq(inx);
      const targetTop = targetInx.offset().top;

      if (scrollY >= targetTop - 20) { 
        $('#nav li').removeClass('active')
        $('#nav li').eq(inx).addClass('active');
      }
    })
  }

  //home mouse event
  $('#home').on('mousemove', function (e) {
    let mouseX = e.pageX;
    let mouseY = e.pageY;

    $('.home-behind').css({
      'transform': 'scale(1.3) translate(' + mouseX * -0.005 + 'px , ' + mouseY * -0.005 + 'px)'
    });
    $('.home-lamp').css({
      'transform': 'scale(1.2) translate(' + mouseX * 0.01 + 'px , ' + mouseY * 0.01 + 'px)'
    });
  });

  // home txt, bg changes by scroll
  const homeMainScrollPrx = () => {
    const homeBottom = home.querySelector('.home-btm').getBoundingClientRect().y;
    const homeBottomY = Math.floor(homeBottom) * 0.001;
    const homeTxt = $('.home-txt')
    const homeH1 = $('.home-top h1');
    const homeP = $('.home-top p');
    const homeDesc = $('.home-btm p');

    let valueY = 1 - homeBottomY;

    if (homeBottomY > 0.6 ) {
      homeTxt.css({ 'background-color': 'rgba(0,0,0,0)'});
      homeDesc.css({ 'opacity': 0 });
      homeH1.css({ 'opacity': 1 });
      homeP.css({ 'opacity': 1 });
    } 
    else if (homeBottomY <= 0.6){
      if (homeBottomY <= 0.2){
        valueY = 0.7;
      }
      homeTxt.css({ 'background-color': 'rgba(0,0,0, ' + valueY + ')' });
      homeDesc.css({ 'opacity': valueY + 0.2});
      homeH1.css({ 'opacity': homeBottomY });
      homeP.css({ 'opacity':  homeBottomY });
    }
  }

  // concept imgs animation effect by scroll
  const swiper1 = new Swiper('#concept .swiper-container', {
    slidesPerView: 1,
    speed: 2000,
    parallax: true,
    grabCursor: true,
    keyboard: {
      enabled: true,
    },
    // autoplay: {
    //   delay: 1000,
    //   disableOnInteraction: false,
    // },
  });

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


  const lampScrollPrx = () => {
    const lamp = $('.lamp');
    const bg1Desc = $('.bg1 .desc');
    const bgHeight = place.querySelector('.bg1').clientHeight;
    const lampScrollY = Math.round(place.getBoundingClientRect().y);
    let total;

    if (lampScrollY < bgHeight / 2) {
      total = Math.abs(lampScrollY * 0.01);
      bg1Desc.css({ 'opacity': 0 });

      if ( lampScrollY <= 0 ){
        total = Math.abs(lampScrollY * 0.12);
        bg1Desc.css({ 'opacity': 1 });
      }
      lamp.css({ 'transform': 'translate(-50%, -' + total + '%)'});
    }
  }

  // location umbrella imgs move by scroll
  let locationOptions = {
    threshold: 0.4
  }
  const livingRoomView = (entries) => {
    entries.forEach(entry => {
      if(entry.intersectionRatio >= 0.4) {
        entry.target.classList.add('view')
      }
      else {
        entry.target.classList.remove('view')
      }
    })
  }
  const livingRoomObserver = new IntersectionObserver(livingRoomView, locationOptions);
  const livingRoom = place.querySelector('.bg2');
  livingRoomObserver.observe(livingRoom);

  const umbrellaPrx = (entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        place.querySelector('.bg3').querySelectorAll('.umbrella').forEach((ele) => {
          ele.classList.add('active');
        })
        entry.target.classList.add('view');
      }
      else {
        place.querySelector('.bg3').querySelectorAll('.umbrella').forEach((ele) => {
          ele.classList.remove('active');
        })
        entry.target.classList.remove('view');
      }
    })
  } 
  const unbrellaObserver = new IntersectionObserver(umbrellaPrx);
  const unbrella = place.querySelector('.bg3');
  unbrellaObserver.observe(unbrella);

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


  //line banner animation by scroll
  let linaBannerOption = {
    threshold: 0.5
  }
  const lineBannerPrx = (entries) => {
    entries.forEach(entry => {
      if(entry.intersectionRatio >= 0.5) {
        entry.target.classList.add('view')
      }
      else {
        entry.target.classList.remove('view')
      }
    })
  }
  const lineBannerObserver = new IntersectionObserver(lineBannerPrx, linaBannerOption);
  const lineBanner = document.querySelector('#line-banner');
  lineBannerObserver.observe(lineBanner);
  

  //pictures swiper effect
  const swiper2 = new Swiper('#pictures .swiper-container', {
    slidesPerView: 1,
    loop: false,
    speed: 600,
    loop: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    grabCursor: true,
    keyboard: {
      enabled: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  // team moves by scroll
  const teamPrx = () => {
    const teamImg = team.querySelectorAll('img');
    let teamScrollY = Math.round(team.getBoundingClientRect().y);

    if( teamScrollY <= 0 ) {
      teamScrollY = 0;
      teamImg.forEach((ele, inx) => {
        ele.style.transform = 'translateY(0)';
        ele.style.transitionDuration = 0.2 * inx + 's'; 
      })
    }
    teamImg.forEach((ele, inx) => {
      ele.style.transform = 'translateY(' + teamScrollY + 'px)';
    })
  }


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
      imgs.forEach((ele) => {
        ele.style.transform = 'translateY(' + totalY + 'px)'
      })
    }
  }
  
  //scroll event
  $(window).on('scroll wheel touch', function () {
    navChange();

    conceptBg.forEach((ele) => {
      conceptScrollPrx.observe(ele);
    });

    homeMainScrollPrx();
    lampScrollPrx();
    teamPrx();
    festivalPrx();
    noticePrx();
  });

  
  //footer input control
  const footerInput = footer.querySelector('input');
  const footerButton = footer.querySelector('button');

  let inputValue;
  const inputChange = (e) => {
    let value = e.target.value;

    if (value != undefined){
      inputValue = value;
      return inputValue;
    }
    else return;
  }

  const btnClick = (e) => {
    e.preventDefault();
    let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    let testEmail = [inputValue];

    testEmail.forEach((address) => {
      let result = regex.test(address);

      if (!result){
        alert("이메일 주소를 다시 확인해주세요.")
      }
      else {
        if(confirm("다음의 이메일 주소로 이벤트, 행사 정보를 받아보시겠습니까?" + `\n` + inputValue)) {
          if(true) {
            alert("신청해주셔서 감사합니다.")
            footerInput.value = "";
          }
          else return;
        }
      }
    });
  }
  footerInput.addEventListener('input', inputChange);
  footerButton.addEventListener('click', btnClick);
});