function ready() {

  const home = document.querySelector('#home');
  const concept = document.querySelector('#concept');


  //초기값



  //mouse event 
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

  
  

 
  





  // Function //
  // home txt, bg changes by scroll
  const homeScrollPrx = new IntersectionObserver((entries) => {
    const homeTxt = $('.home-txt')
    const homeH1 = $('.home-top h1');
    const homeP = $('.home-top p')

    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        homeTxt.css({ 'background-color': 'rgba(0,0,0,0.8)' });
        homeH1.css({ 'opacity': 0});
        homeP.css({ 'opacity': 0});
      }
      else {
        homeTxt.css({ 'background-color': 'rgba(0,0,0,0)' });
        homeH1.css({ 'opacity': 1});
        homeP.css({ 'opacity': 1});
      }
    });
  });
  const homeBtm = home.querySelector('.home-btm .desc')
  homeScrollPrx.observe(homeBtm);


  // concept imgs animation effect by scroll
  const conceptScrollPrx = new IntersectionObserver((entries) => { 
    
    entries.forEach((entry) => { 
      console.log(entry.target, entry.intersectionRatio);

      if (entry.isIntersecting) {
        entry.target.querySelectorAll('img').forEach((ele, inx) => {
          inx += 1;

         ele.style.opacity = inx * 1;
          ele.style.animationDelay = inx * 0.4 + 's';
          ele.style.animationIterationCount = 'inherit';
          ele.classList.add('active');
        })

      }
      else { 
         entry.target.querySelectorAll('img').forEach((ele, inx) => {
          ele.classList.remove('active');
        })
      }
    })
  })
  const conceptBg = concept.querySelectorAll('.bg-wrap');
  conceptBg.forEach((ele) => {
    conceptScrollPrx.observe(ele);
  });
  
  
  




  $(document).on('scroll, mousewheel touch', function () {
    conceptBg.forEach((ele) => {
      conceptScrollPrx.observe(ele);
    });

  })



}



document.addEventListener('DOMContentLoaded', ready)