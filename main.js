const primaryHeader = document.querySelector('.primary-header');
const navToggle = document.querySelector(".mobile-nav-toggle");
const primaryNav = document.querySelector(".primary-navigation");

navToggle.addEventListener("click", () => {
    primaryNav.hasAttribute('data-visible') 
    ? navToggle.setAttribute('aria-expanded', false)
    : navToggle.setAttribute('aria-expanded', true);
    primaryNav.toggleAttribute('data-visible');
    primaryHeader.toggleAttribute('data-overlay');
});

// const slider = new A11YSlider(document.querySelector('.slider'), {
//     adaptiveHeight: true,
//     dots: false
//   });

  // carousel //

const carousel = document.querySelector(".carousel"),
firstImg = carousel.querySelectorAll("img")[0];
const arrowIcons = document.querySelectorAll(".wrapper i");
  
let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;
  
const showHideIcons = () => {
  let scrollWidth = carousel.scrollWidth - carousel.clientWidth;
  arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "flex";
  arrowIcons[1].style.display = carousel.scrollLeft >= scrollWidth ? "none" : "flex";
  
}
  
arrowIcons.forEach(icon => {
  icon.addEventListener("click", () => {
    let firstImgWidth = firstImg.clientWidth + 16;
    carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
    setTimeout(() => showHideIcons(), 60);
  });
});
  
const autoSlide = () => {
  if(carousel.scrollLeft == (carousel.scrollWidth - carousel.clientWidth)) return;
  
  
  positionDiff = Math.abs(positionDiff);
  let firstImgWidth = firstImg.clientWidth + 16;
  let valDifference = firstImgWidth - positionDiff;
  
  if(carousel.scrollLeft > prevScrollLeft) {
    return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
  }
  carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
}
  
const dragStart = (e) => {
  isDragStart = true;
  prevPageX = e.pageX || e.touches[0].pageX;
  prevScrollLeft = carousel.scrollLeft;
}
  
const dragging = (e) => {
  if(!isDragStart) return;
  e.preventDefault();
  isDragging = true;
  carousel.classList.add("dragging");
  positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
  carousel.scrollLeft = prevScrollLeft - positionDiff;
  showHideIcons();
}
  
const dragStop = () => {
  isDragStart = false;
  carousel.classList.remove("dragging");
  
  if(!isDragging) return;
  isDragging = false;
  autoSlide();
}
  
  
carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);
  
carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);
  
  
carousel.addEventListener("mouseup", dragStop);
carousel.addEventListener("mouseleave", dragStop);
carousel.addEventListener("touchend", dragStop);


// header scroll effect
window.addEventListener('scroll', function() {
  var header = document.getElementById('header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});
