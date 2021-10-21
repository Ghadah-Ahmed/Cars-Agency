 var track = document.getElementsByClassName('carousel__track')[1];
 var trackOpesite = document.getElementsByClassName('carousel__track')[0];
 var dotsNav = document.querySelector('.carousel__nav'); 
 var slides; 
 var slidesOpesite; 
 var dots;
 var slideWidth; 
 var slideIndex = 0;
 var allData = [];
 var x = window.matchMedia("(max-width: 767px)");

 const trackContainer = document.querySelector('.carousel__track-container')
 const trackTitle = document.querySelector('.carousel__track-title')
 const nextButton = document.querySelector('.carousel__button--right') 
 const prevButton = document.querySelector('.carousel__button--left')
 const h1 = document.getElementsByTagName('h1')
 const h3 = document.getElementsByTagName('h3')
 const carStructure = document.getElementsByClassName('car__structure')[0]
 const carInfo = document.getElementsByClassName('car__info')[0]
 const carEngine = document.getElementsByClassName('car__engine')[0]
 const backSpan = document.getElementById('back')
 const readMore = document.querySelector('.read-more')

// API CRUD

const url = 'http://localhost:3000/cars';

fetch(url).then((resp) => resp.json()).then(function(data) {

    allData = [...data]

        for (let i = 0; i < data.length; i++) {

            let liTitles = createNode('li');
            let liImg = createNode('li');
            let button = createNode('button');
            liTitles.classList.add("carousel__slide");
            liImg.classList.add("carousel__slide");

            liTitles.innerHTML =`
            <div>
                  <h3>${data.at( -i+ data.length -1 ).car_name}</h3>
                  <h1 style="color: ${data.at( -i+ data.length -1 ).color};">${data.at( -i+ data.length -1 ).car_name}</h1>
            </div>`
            liImg.innerHTML =`<img class="carousel__image" src="${data[i].car_img_png}" alt="">`
            button.classList.add("carousel__indicator");
            button.innerHTML = `${i + 1}`;
            append(trackOpesite, liTitles);
            append(track, liImg);
            append(dotsNav, button);    
        }
  
        slides = Array.from(track.children); 
        slidesOpesite = Array.from(trackOpesite.children);
        dots = Array.from(dotsNav.children);
        slideWidth = slides[0].getBoundingClientRect().width; 
        slides.forEach(setSlidePosition);
        slidesOpesite.forEach(setSlidePosition);
        slides[0].classList.add("current-slide")
        dots[0].classList.add("current-slide")
        slidesOpesite.at(-1).classList.add("current-slide")
        trackTitle.innerHTML = data[0].phrase
        trackTitle.style.transform =  'translateX(' + trackTitle.getBoundingClientRect().width / 2 +'px)'
        moveToSlide(trackOpesite, trackOpesite.querySelector('.current-slide'), trackOpesite.querySelector('.current-slide'));

})
.catch((er)=>{console.log(er)})

function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}


  document.getElementById('delete').addEventListener('submit', function (e) {
    e.preventDefault();
    var id = this.querySelector('#carId').value;
    fetch( url + `/${id}`, {
        method: "DELETE",
        headers: {"Content-type": "application/json; charset=UTF-8"}
      })
      .then(response => response.json()) 
      .then(json => console.log(json))
      .catch(err => console.log(err)); 
})

  document.getElementById('add').addEventListener('submit', function (e) {
      e.preventDefault();
      const formData = new FormData(this);
      fetch( url, {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      })
      .then(response => response.json()) 
      .then(json => console.log(json))
      .catch(err => console.log(err));     
  })

  document.getElementById('update').addEventListener('submit', function (e) {
    e.preventDefault();
    let key = this.querySelector('select').value;
    let value = this.querySelector('#value').value;
    let id = this.querySelector('#carIdU').value;
    // console.log(value, key)
    var obj = {};
    obj[key] = value;

    fetch( url + `/${id}`, {
        method: "PATCH",
        body: JSON.stringify(obj),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      })
      .then(response => response.json()) 
      .then(json => console.log(json))
      .catch(err => console.log(err)); 
  })



// arrange the slides next to one another
 const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
 };


const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left +')'
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
}

function trackStyle(){
    track.style.transition = 'transform 900ms ease-in';
    trackOpesite.style.transition = 'transform 900ms ease-in';
}

const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
    trackContainer.style.backgroundColor = allData[targetIndex].background_color;
    trackTitle.innerHTML = allData[targetIndex].phrase;
    slideIndex = targetIndex;
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


    if (menu.style.padding !== "0px" ) {
        menu.style.padding = '0px'
        menu.style.height = '0px'
        for (let i = 0; i < li.length; i++) {
            li[i].style.display = 'none'
        }
        nav.style.top = '0px'
    } else {
        for (let i = 0; i < li.length; i++) {
            li[i].style.display = 'block'
        }
        nav.style.top = '40px'
        menu.style.height = '15px'
        menu.style.padding = '25px 0'
    }
  }

  
function showInfo() {
    var img = document.getElementsByClassName('carousel__image')[slideIndex]
    var displayNone = [dotsNav, prevButton, nextButton, trackTitle, readMore]
    var displayBlock = [ carInfo, backSpan, carStructure, carEngine]
    carEngine.src = `${allData[slideIndex].engine_img_src}`
    carInfo.innerHTML =`
    <h4>${allData[slideIndex].phrase}</h4>
    <p>${allData[slideIndex].description}</p>
    <div>
        <img src="images/automatic-transmission.png" width="25px" alt=""><span>${allData[slideIndex].gear}</span> 
        <img src="images/seat.png" width="25px" alt=""> <span>${allData[slideIndex].seats_num} Seats</span>
    </div>

    <h5>Wheels</h5>
    <button class="wheels" type="button" > <img src="images/wheel.png" width="30px" alt=""><span> 21* </span></button>
    <button class="wheels" type="button" > <img src="images/wheel.png" alt="" width="30px"><span>  56* </span></button> <br>
    <button class="rent-now" type="button" >BOOK YOUR TRAIL!</button>
    `

        if (x.matches) {
            // Display none 6 Items..
            for (let i = 0; i < displayNone.length; i++) {
                displayNone[i].style.display = 'none'
            }
            for (let i = 0; i < h1.length; i++) {
                h1[i].style.display = 'none'
                h3[i].style.transform = 'translateX(-95px)'   
            }
            // Transform 2 Items (h3 ^ + img)..
            img.style.transform = 'rotate(180deg) translateY(-230px) translateX(125px) scale(1.2,1.2)'
            // Display Block 5 Items..
            setTimeout(function(){ 
                for (let i = 0; i < displayBlock.length -1; i++) {
                    displayBlock[i].style.display = 'block'
                }
            }, 800);
        
        } else {
        // Display none 6 Items..
            for (let i = 0; i < displayNone.length; i++) {
                displayNone[i].style.display = 'none'
            }
            for (let i = 0; i < h1.length; i++) {
                h1[i].style.display = 'none'
                h3[i].style.transform = 'translateX(100px)'
            }

            // Transform 2 Items (h3 ^ + img)..
            img.style.transform = 'rotate(-90deg) translateY(-205px) translateX(205px) scale(1.2,1.2)'

                // Display Block 5 Items..
            setTimeout(function(){ 
                for (let i = 0; i < displayBlock.length; i++) {
                    displayBlock[i].style.display = 'block'
                }
            }, 800);
        }
}

// showInfo(document.getElementsByClassName('read-more')[0])

function back() {
    var img = document.getElementsByClassName('carousel__image')[slideIndex]
    var displayNone = [carStructure, carInfo, carEngine, backSpan]
    var displayBlock = [dotsNav, prevButton, nextButton, trackTitle]

        // Display none 6 Items..
        for (let i = 0; i < displayNone.length; i++) {
        displayNone[i].style.display = 'none'
        }
    
        // Transform 2 Items (h3 ^ + img)..
        img.style.transform = 'none'
        
        // Display Block 5 Items..
        for (let i = 0; i < displayBlock.length; i++) {
            displayBlock[i].style.display = 'block'
            readMore.style.display = 'flex'

            for (let i = 0; i < h1.length; i++) {
                h1[i].style.display = 'block'
                h3[i].style.transform = 'none'
            }

        }
}


function driveForward(div){
    var img = document.getElementsByClassName('carousel__image')[slideIndex]

    if (x.matches) {
        img.style.transform = 'rotate(180deg) translateY(-230px) translateX(-195px) scale(1.2,1.2)'
    }else{
        img.style.transform = 'rotate(-90deg) translateY(-205px) translateX(-215px) scale(1.2,1.2)'
    }
    div.style.border = '2px solid #292929'
    div.nextElementSibling.style.border = '1px solid white'
}

function driveBackward(div){
    var img = document.getElementsByClassName('carousel__image')[slideIndex]

    if (x.matches) {
        img.style.transform = 'rotate(180deg) translateY(-230px) translateX(125px) scale(1.2,1.2)'
    }else{
        img.style.transform = 'rotate(-90deg) translateY(-205px) translateX(205px) scale(1.2,1.2)'
    }

    div.style.border = '2px solid #292929'
    div.previousElementSibling.style.border = '1px solid white'
}

function toggleDash() {
    let dash = document.getElementById('dashboard');
    dash.style.backgroundColor = allData[slideIndex].background_color;

    if(dash.style.height == '0px'){
        dash.style.height = '100vh';
    }else{
        dash.style.height = '0px'
    }
}