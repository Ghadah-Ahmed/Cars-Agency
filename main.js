 const track = document.getElementsByClassName('carousel__track')[1];
 const trackOpesite = document.getElementsByClassName('carousel__track')[0];
 const trackContainer = document.querySelector('.carousel__track-container')
 const trackTitle = document.querySelector('.carousel__track-title')
 const slides = Array.from(track.children); 
 const slidesOpesite = Array.from(trackOpesite.children); 
 const nextButton = document.querySelector('.carousel__button--right') 
 const prevButton = document.querySelector('.carousel__button--left')
 const dotsNav = document.querySelector('.carousel__nav'); 
 const dots = Array.from(dotsNav.children);
 const slideWidth = slides[0].getBoundingClientRect().width; 
 const backgroudColors = ['#D8CFC4', '#0376B9', '#EFBA1D', '#EB6435' ]
 const backgroudTitles = ['HII IAM GHADAH', 'HOW ARE YOU', 'ARE YOU FINE?', 'CAN YOU HEAR ME?']

 // arrange the slides next to one another
 const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
 };
 slides.forEach(setSlidePosition);
 slidesOpesite.forEach(setSlidePosition);


const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left +')'
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
}
moveToSlide(trackOpesite, trackOpesite.querySelector('.current-slide'), trackOpesite.querySelector('.current-slide'));
trackTitle.style.transform =  'translateX(' + trackTitle.getBoundingClientRect().width / 2 +'px)'

function trackStyle(){
    track.style.transition = 'transform 900ms ease-in';
    trackOpesite.style.transition = 'transform 900ms ease-in';
}

const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
    trackContainer.style.backgroundColor = backgroudColors[targetIndex]
    trackTitle.innerHTML = backgroudTitles[targetIndex]
    trackTitle.style.transform =  'translateX(' + trackTitle.getBoundingClientRect().width / 2 +'px)'
    trackTitle.classList.toggle('fade')
    setTimeout(function(){ trackTitle.classList.remove('fade') }, 250);


    if (targetIndex === 0) {
    prevButton.classList.add('is-hidden');
    nextButton.classList.remove('is-hidden');
    } else if (targetIndex === slides.length - 1) {
    prevButton.classList.remove('is-hidden');
    nextButton.classList.add('is-hidden');
    } else {
    prevButton.classList.remove('is-hidden');
    nextButton.classList.remove('is-hidden');
    }
    }

const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
    }

    // when I click left, move slides to the left
prevButton.addEventListener('click', e => {
    trackStyle()
    const currentSlide = track.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;
    const currentSlideOpesite = trackOpesite.querySelector('.current-slide');
    const nextSlideOpesite = currentSlideOpesite.nextElementSibling;

    const currentDot = dotsNav.querySelector('.current-slide');
    const prevDot = currentDot.previousElementSibling;
    const prevIndex = slides.findIndex( slide => slide === prevSlide)

    moveToSlide(track, currentSlide, prevSlide);
    moveToSlide(trackOpesite, currentSlideOpesite, nextSlideOpesite);

    updateDots(currentDot, prevDot)
    hideShowArrows (slides, prevButton, nextButton, prevIndex) 
});         

 // when I click right, move slides to the right
nextButton.addEventListener('click', e => {
    trackStyle()
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
    const currentSlideOpesite = trackOpesite.querySelector('.current-slide');
    const prevSlideOpesite = currentSlideOpesite.previousElementSibling;



    const currentDot = dotsNav.querySelector('.current-slide');
    const nextDot = currentDot.nextElementSibling;
    const nextIndex = slides.findIndex( slide => slide === nextSlide)

    moveToSlide(track, currentSlide, nextSlide);
    moveToSlide(trackOpesite, currentSlideOpesite, prevSlideOpesite);

    updateDots(currentDot, nextDot)
    hideShowArrows (slides, prevButton, nextButton, nextIndex) 
})

// when I click the nav indicators, move to that slide
// dotsNav.addEventListener('click', e => {
//     trackStyle()

    // what indicator was clicked on?
    // const targetDot = e.target.closest('button');
    // if (!targetDot) return;

    // const currentSlide = track.querySelector('.current-slide');
    // const currentSlideOpesite = trackOpesite.querySelector('.current-slide');
    // const targetSlideOpesite = slidesOpesite[-targetIndex];

    // const currentDot = dotsNav.querySelector('.current-slide');
    // const targetIndex = dots.findIndex(dot => dot === targetDot)
    // const targetSlide = slides[targetIndex];


    // moveToSlide(track, currentSlide, targetSlide);
    // moveToSlide(trackOpesite, currentSlideOpesite, targetSlideOpesite);
//     updateDots(currentDot, targetDot);
//     hideShowArrows (slides, prevButton, nextButton, targetIndex) 
// })

function myMenu() {
    var menu = document.querySelector(".menu");
    var li = document.getElementsByClassName("menu-li");
    var nav = document.querySelector("nav");
    var x = window.matchMedia("(max-width: 767px)");


    if (menu.style.padding !== "0px" ) {
        menu.style.padding = '0px'
        for (let i = 0; i < li.length; i++) {
            li[i].style.display = 'none'
        }
        nav.style.top = '0px'
    } else {
        for (let i = 0; i < li.length; i++) {
            li[i].style.display = 'block'
        }
        nav.style.top = '40px'
        position(x);
        function position(x) {
            if (x.matches) {
                menu.style.padding = '30px 0'
          
            } else {
                menu.style.padding = '30px'
            }
          }
    }
  }
