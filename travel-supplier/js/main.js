AOS.init();

// slider 

var swiper = new Swiper(".mySwiper", {
  loop: true,
  slidesPerView: 4,
  spaceBetween: 25,
  navigation: {
    nextEl: ".button-next",
    prevEl: ".button-prev",
  },
  speed: 1000,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
    },

    768: {
      slidesPerView: 2,
    },

    1024: {
      slidesPerView: 4,
    },
  },
});


// button hover 

var animateButton = function(e) {

  e.preventDefault;
  //reset animation
  e.target.classList.remove('animate');
  
  e.target.classList.add('animate');
  setTimeout(function(){
    e.target.classList.remove('animate');
  },700);
};

var bubblyButtons = document.getElementsByClassName("ThemeBtn");

for (var i = 0; i < bubblyButtons.length; i++) {
  bubblyButtons[i].addEventListener('click', animateButton, false);
}

// welcome popup

$(document).ready(function ($) {
  if (sessionStorage.getItem('advertOnce') !== 'true') {
     setTimeout(function () {
        $('#WelcomeModal').addClass('show').show();
     }, 1000);

  } else {
     $('#WelcomeModal').addClass('show').hide();
  };

  $('#btn-alpha').click(function () {
     sessionStorage.setItem('advertOnce', 'true');
     $('#WelcomeModal').removeClass('show').hide();
  });

  $('#btn-beta').click(function () {
     window.location.href = 'http://google.com/';
  });
});










