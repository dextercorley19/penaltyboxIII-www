
document.addEventListener('DOMContentLoaded', function() {
    const accordionItemHeaders = document.querySelectorAll(".accordion-item-header");
  
    accordionItemHeaders.forEach(accordionItemHeader => {
      accordionItemHeader.addEventListener("click", event => {
        accordionItemHeader.classList.toggle("active");
        const accordianItemBody = accordionItemHeader.nextElementSibling;
        if(accordionItemHeader.classList.contains("active")) {
            accordianItemBody.style.maxHeight = accordianItemBody.scrollHeight + "px";
        }
        else {
            accordianItemBody.style.maxHeight = 0;
        }
      });
    });
  });

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


// header scroll effect
window.addEventListener('scroll', function() {
    var header = document.getElementById('header');
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });