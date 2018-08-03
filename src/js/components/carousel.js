const dots = document.getElementsByClassName('js-dot');
let timerId = 0;

const removeActiveClass = () => {
  for (i = 0; i < dots.length; i++) {
    dots[i].className = 'dot js-dot'
  }
}

const nextSlide = slideIndex => {
  let newIndex = slideIndex;

  if (slideIndex > 2) {
    newIndex = 0;
  }
  const slide = document.getElementsByClassName('js-carousel-item')[newIndex]
  const slidePosition = slide.offsetWidth * newIndex * -1
  const stage = document.getElementsByClassName('carousel__stage')[0]

  stage.style.left = slidePosition + 'px';
  timerId = setInterval(function() {nextSlide(newIndex + 1)}, 4000)
}


const stopInterval = () => {
  console.log(timerId)
  console.log('oi')
  clearInterval(timerId);
}

const slideOnClick = () => {
  for (i = 0; i < dots.length; i++) {
    const dot = dots[i]

    dot.addEventListener('click', () => {
      const index = parseInt(dot.dataset.index)
      const slide = document.getElementsByClassName('js-carousel-item')[index]
      const slidePosition = slide.offsetWidth * parseInt(slide.dataset.index) * -1
      const stage = document.getElementsByClassName('carousel__stage')[0]

      // Stops carousel autoplay
      stopInterval()
      removeActiveClass()
      dot.classList.add('active')
      stage.style.left = slidePosition + 'px';
    })
  }
}

slideOnClick()
nextSlide(0)
