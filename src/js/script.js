$(document).ready(function () {
  $('header').css('paddingTop', $('.header__wrapper-top').height());
  $('.header__wrapper-top').addClass('header__wrapper-top--fixed');
});

$(window).scroll(function () {
  if ($(this).scrollTop() >= $('.header__wrapper-top').height()) {
    $('.header__wrapper-top').addClass('header__wrapper-top--colored');
  } else {
    $('.header__wrapper-top').removeClass('header__wrapper-top--colored');
  }
});

$('.gallery').mouseenter(function () {
  $(this).find('.slick-prev').fadeIn(200);
  $(this).find('.slick-next').fadeIn(200);
});

$('.gallery').mouseleave(function () {
  $(this).find('.slick-prev').fadeOut(200);
  $(this).find('.slick-next').fadeOut(200);
});

$('.gallery__slider').slick({
  slidesToShow: 1,
  fade: true,
  responsive: [{
    breakpoint: 1200,
    settings: {
      slidesToScroll: 1,
      centerMode: true,
      variableWidth: true,
      adaptiveHeight: true,
      arrows: false,
      infinite: true,
      fade: false
    }
  }]
});

if (window.matchMedia("screen and (max-width: 768px)").matches) {
  $('.partners__list').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    variableWidth: true,
    adaptiveHeight: true,
    arrows: false,
    responsive: [{
      breakpoint: 576,
      settings: {
        centerMode: true,
        slidesToShow: 1
      }
    }]
  });
}

$('.mobile-toggle__checkbox').change(function () {
  $('.header__wrapper-top').toggleClass('header__wrapper-top--active');
  $('.header__nav').slideToggle(200);
});

