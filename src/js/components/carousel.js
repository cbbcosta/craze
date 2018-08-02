let slideIndex = 1;

const currentSlide = index => {
  showSlides(slideIndex = index);
  autoPlaySlides(false)

}

const showSlides = index => {
  var i;
  var slides = document.getElementsByClassName('js-carousel-item');
  var dots = document.getElementsByClassName('dot');
  if (index > slides.length) {
    slideIndex = 1
  }
  if (index < 1) {
    slideIndex = slides.length
  }
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(' active', '');
  }

  slides[slideIndex-1].style.display = 'block';
  dots[slideIndex-1].className += ' active';
}

const autoPlaySlides = play => {
    var i;
    var slides = document.getElementsByClassName('js-carousel-item');
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    console.log(slideIndex);
    if (slideIndex > slides.length) {
      slideIndex = 1
    }
    slides[slideIndex-1].style.display = "block";
    if(play) {
      setTimeout(autoPlaySlides(true), 4000);
    }
}

showSlides(slideIndex)
// autoPlaySlides(true)
